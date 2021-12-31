document.addEventListener("DOMContentLoaded", function(){
$(function(){
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var speech = new webkitSpeechRecognition();
    speech.continuous = true;
    speech.interimResults = true;
    speech.lang = 'ja-JP';
    const content = document.getElementById('content');

    var mediaRecorder;
    var localStream;
    
    $("#start_btn").on("click", function(){
      //音声認識を開始
      speech.start();
      s_time = new Date();
      
      $("#status").text("計測中・・・");
      setInterval (function() {
        $("#status").fadeOut(1000).fadeIn(1000);
      },2000);
      navigator.mediaDevices.getUserMedia({audio: true })
        .then(function (stream) {
            localStream = stream;
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            console.log("Status: " + mediaRecorder.state);
        }).catch(function (err) {
            console.log(err);
        });
    });
        
    $("#stop_btn").on("click", function(){
      //音声認識を完了
    
      $("#status").text("結果画面へ移ります・・・");
      var e_time = new Date();
      var diff = e_time.getTime() - s_time.getTime();
      var talking_time = diff / 1000;
      console.log("経過時間(秒):", talking_time);
      //音声認識の結果を返す
      speech.onresult= function(e){
        speech.stop();
        if(e.results[0].isFinal){
          var autotext = e.results[0][0].transcript
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
            mediaRecorder.stop()
            console.log("Status: " + mediaRecorder.state);
            mediaRecorder.ondataavailable = function (event) {
                //document.getElementById("audio").src =
                //let blob = new Blob([event.data], { type: event.data.type });
                var audio = document.createElement('audio');
                audio.controls = true;
                var chunks = [];
                chunks.push(event.data);
                var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                console.log(blob);
                var fd = new FormData;
                fd.append("audio", blob);
                fd.append("fast_talking_score", fast_talking_score);
                fd.append("word_count",word_count);
                fd.append("talking_time", talking_time);
                //var data = { 'fast_talking_score': fast_talking_score,'word_count': word_count, 'talking_time': talking_time};
                  $.ajax({
                    type: 'POST', // リクエストのタイプ
                    url: '/games', // リクエストを送信するURL
                    data: fd,
                    // サーバーに送信するデータ
                  // サーバーから返却される型
                    processData: false,
                    contentType: false
                  }).done(function(result){
                    //console.log(json);
                    //console.log(json.redirect);
                    //console.log(json.data.redirect);
                    
                      if (result.redirect) {
                        window.location.href = result.redirect;
                      }
                   
                  })
                //
                
                //const audioElement = document.querySelector("audio");
               //audioElement.playbackRate = 1.5;
                //var voice= event.data;
            
            
            }
            localStream.getTracks().forEach(track => track.stop());
          })
        }
      }
      speech.onerror = function () {
        $("#status").text("計測できませんでした。。");
      }
    });
    reset_timer();
  
    var timer;
    var timerID;
    var timerFlag = 0;	// 0:停止 1:動作
  
    
    $(document).on("click", "#start_btn", function(){
      start_count();
    });

    $("#stop_btn").on("click", function(){
      stop_count();
    });
 
    function reset_timer() {
      if(timerFlag === 1){
        stop_count();
      }
      timer = 0; 
      $("#counter").val("00:00:00:00");
    }
  

    function start_count() { 					
      $("#start_btn").val("stop");
      timerFlag = 1;
      timerID = setInterval(count_up, 10); 
    }
  

    function stop_count() { 					
      $("#stop_btn").val("start");
      timerFlag = 0;
      clearInterval(timerID);
    }
  

    function count_up() {
      ++timer;
      var formatTimer = counter_format(timer);
      $("#counter").val(formatTimer);
    }
  
    function counter_format(num) {
      var numZan = num;	// 残りの時間(10ミリ秒単位)
      var hh = Math.floor(numZan / (100 * 60 * 60));
      numZan = numZan - (hh * 100 * 60 * 60);
      var mm = Math.floor(numZan / (100 * 60));
      numZan = numZan -(mm * 100 * 60);
      var ss = Math.floor(numZan / 100);
      numZan = numZan - (ss * 100);
      var ms = numZan;
      
      if(hh < 10){hh = "0" + hh;}
      if(mm < 10){mm = "0" + mm;}
      if(ss < 10){ss = "0" + ss;}
      if(ms < 10){ms = "0" + ms;}
      return hh + ":" + mm + ":" + ss + ":" + ms;
    }
  });
}, false);