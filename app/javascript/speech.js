$(function(){
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var speech = new webkitSpeechRecognition();
    speech.continuous = true;
    speech.interimResults = true;
    speech.lang = 'ja-JP';
    
    $("#start_btn").on("click", function(){
      //音声認識を開始
      speech.start();
      s_time = new Date();
      
      $("#status").text("計測中・・・");
      setInterval (function() {
        $("#status").fadeOut(1000).fadeIn(1000);
      },2000);
    });
        
    $("#stop_btn").on("click", function(){
      //音声認識を完了
   
      $("#status").text("結果画面へ移ります・・・");
      var e_time = new Date();
      var diff = e_time.getTime() - s_time.getTime();
      var talking_time = diff / 1000;
      console.log("経過時間(秒):", talking_time);
      //音声認識の結果を返す
      speech.onresult = function(event){
        var results = event.results;
        for (var i = event.resultIndex; i<results.length; i++){
          if(results[i].isFinal) {
          var autotext = results[i][0].transcript;
          console.log("発した文字", autotext)
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
            var word_count = data.converted.replace(/\s+/g,'').length;
            console.log("発した文字数:", word_count);
            var fast_talking_score = word_count/talking_time;
            console.log("1秒あたりの文字数", fast_talking_score);
         
            
            location.href = '/games/result?' + fast_talking_score + "," + word_count + "," + talking_time;
          })
        }
      }
      }
      speech.onerror = function () {
        $("#status").text("計測できませんでした。。");
       
      }
    });
  });