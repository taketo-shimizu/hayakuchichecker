document.addEventListener("DOMContentLoaded", function(){
  $(function(){
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const speech = new webkitSpeechRecognition();
    speech.continuous = true;
    speech.interimResults = true;
    speech.lang = 'ja-JP';
    const mike_check = document.getElementById("mike_check")
    const start_btn = document.getElementById("start_btn")
    const stop_btn = document.getElementById("stop_btn")

    var mediaRecorder;
    var localStream;
    
    //マイクチェック
    $("#mike_check").on("click", function(){
      // getUserMedia
      navigator.mediaDevices.getUserMedia({audio: true })
      .then(function (stream) {
          localStream = stream;
          $('#mike_check').css('display', 'none');
          $('#start_btn').css('display', 'inline-block');
          $('#stop_btn').css('display', 'inline-block');
          return localStream
      }).catch(function (err) {
          console.log(err);
          return;
      })
    });
    
    //スタートボタンを押して文字起こしAPIと録音APIを作動
    $("#start_btn").on("click", function(){
      speech.start();
      s_time = new Date();
      
      $("#status").text("声を読み取っています・・・");
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
        })
    });
    //ストップボタンを押して音声認識を終了
    $("#stop_btn").on("click", function(){
      var e_time = new Date();
      var diff = e_time.getTime() - s_time.getTime();
      var talking_time = diff / 1000;
      console.log("経過時間(秒):", talking_time);
      speech.onerror = function () {
        $("#status").text("計測できませんでした。。");
        setTimeout(function(){
        location.reload();
        }, 3*1000);
      }
      //音声認識の結果を返す
      speech.onresult= function(e){
        speech.stop();
        if(e.results[0].isFinal){
          var autotext = e.results[0][0].transcript
          console.log("発した文字", autotext)
          
          //ひらがな化APIに結果を通す
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
          //ひらがな化の結果を返す
          .done(function(data) {
            console.log("発した文字(ひらがな):", data.converted);
            $("#status").text(data.converted);
            var hiragana = data.converted;
            var word_count = data.converted.replace(/\s+/g,'').length;
            console.log("発した文字数:", word_count);
            var fast_talking_score = word_count/talking_time;
            console.log("1秒あたりの文字数", fast_talking_score);
            mediaRecorder.stop()
            mediaRecorder.ondataavailable = function (event) {
              /*let blob = new Blob([event.data], { type: "audio/wav" });
              var audio = document.createElement('audio');
              audio.controls = false;
              const audioURL = window.URL.createObjectURL(blob);
              audio.src = audioURL;
              //console.log("recorder stopped");
              const reader = new FileReader();
              reader.onload = (event) => {
                sessionStorage.setItem("file", event.target.result);
              }
              reader.readAsDataURL(blob);
              
              let bin = atob(sessionStorage.getItem("file").replace(/^.*,/, ''));
              let buffer = new Uint8Array(bin.length);
              for (let i = 0; i < bin.length; i++) {
              buffer[i] = bin.charCodeAt(i);
              }
              let voicefile = new File([buffer.buffer], bin, {type: "audio/wav"});*/
              
              //フォームデータでajax送信をする
              var fd = new FormData;
                fd.append('voice_data', event.data);
                fd.append("fast_talking_score", fast_talking_score);
                fd.append("word_count",word_count);
                fd.append("talking_time", talking_time);
                  $.ajax({
                    type: 'POST', 
                    url: '/games', 
                    data: fd,
                    processData: false,
                    contentType: false
                  }).done(function(result){
                    if (result.url) {
                      setTimeout(function(){
                      window.location.href = result.url;
                      }, 3*1000);
                    }
                  })
          
                
              /*var audio = document.createElement('audio');
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
                  
                })*/
              
              
              //const audioElement = document.querySelector("audio");
              //audioElement.playbackRate = 1.5;
              //var voice= event.data;
            }
            localStream.getTracks().forEach(track => track.stop());
          })
        }
      }
    });

    //ストップウォッチ機能
    var timer;
    var timerID;
    var timerFlag = 0;	// 0:停止 1:動作

    if(timerFlag === 1){
			stop_count();
		}
		timer = 0; 
  
    $("#start_btn").on("click", function(){
      start_count();
    });

    $("#stop_btn").on("click", function(){
      stop_count();
    });
 
    function start_count() { 					
      timerFlag = 1;
      timerID = setInterval(count_up, 10); 
    }
  

    function stop_count() { 					
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