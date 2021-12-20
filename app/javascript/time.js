//ストップウォッチ機能
document.addEventListener("DOMContentLoaded", function(){
$(function(){
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