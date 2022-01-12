document.addEventListener("DOMContentLoaded", function(){
$(function(){
  
  var youichi_video=document.getElementById('youichi_video');
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var speech = new webkitSpeechRecognition();
    speech.continuous = true;
    speech.interimResults = true;
    speech.lang = 'ja-JP';

    youichi_video.addEventListener('play', function(){
      $("#training_status").text("計測中・・・");
      setInterval (function() {
        $("#training_status").fadeOut(1000).fadeIn(1000);
      },2000);
      speech.start();
    }, true);
   
    youichi_video.addEventListener('ended', function(){
      $("#training_status").text("結果画面へ移ります・・・");
      speech.onerror = function () {
        $("#training_status").text("計測できませんでした。。");
        setTimeout(function(){
        location.reload();
        }, 3*1000);
      }
      speech.onresult= function(e){
        speech.stop();
        if(e.results[0].isFinal){
          var autotext = e.results[0][0].transcript
          console.log("発した文字", autotext);
          var data = {
            //gooラボ ひらがな化API
            app_id: 'a5e4e8dd5686de7743b620c720e89beca5e5a5dca31ed4a74b7b6efddf5cebc1',
            sentence: autotext,
            output_type: "hiragana",
            
            //yahoo ルビ振りAPI
            /*id: "1234-2",
            jsonrpc: "2.0",
            method: "jlp.furiganaservice.furigana",
            params: {
              q: "漢字",
              grade: 1
            }*/
          };
          jsonEncoded = JSON.stringify(data);
          console.log(jsonEncoded);
          
          $.ajax ( {
            type: "POST",
            url: "https://labs.goo.ne.jp/api/hiragana",
            contentType: "application/json",
            data: jsonEncoded,
          } )
          .done(function(data) {
            console.log("発した文字(ひらがな):", data.converted);
            var training_word = data.converted;
            console.log("発した文字(ひらがな):", training_word);
            var text = /[やりたいことやってみようぼくがみんなにつたえたいことはねやりたいことがあったらやってみようということやってみるとたのしいんだよやりたいことがあればやってみよういきたいところがあればいってみよう]/g;
            var found = training_word.match(text);
            console.log(found);
            var speaking_smoothry_score= found.length/96*100;
            console.log("最終点数", speaking_smoothry_score);
            var data = { 'speaking_smoothry_score': speaking_smoothry_score };
            $.ajax({
                type: 'POST', // リクエストのタイプ
                url: '/trainings', // リクエストを送信するURL
                data: data, // サーバーに送信するデータ
                dataType: 'json' // サーバーから返却される型
            }).done(function(result){
                //console.log(json);
                //console.log(json.redirect);
                //console.log(json.data.redirect);
              if (result.redirect) {
                window.location.href = result.redirect;
              }
            })
                //.done(function(result){
                //console.log(json);
                //console.log(json.redirect);
                //console.log(json.data.redirect);
                //if (result.redirect) {
                  //window.location.href = result.redirect;
                //}
              //})
          })
        }
      }
    }, true);
 
  });
}, false);