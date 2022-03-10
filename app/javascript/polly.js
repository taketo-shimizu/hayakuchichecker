document.addEventListener("DOMContentLoaded", function(){
  var input = document.getElementById('input');
  text = document.getElementById('text');
  player = document.getElementById('player');
  submit = document.getElementById('submit');

  input.addEventListener('submit', function (event) {
    player.src = '/games/read?text=' + encodeURIComponent(text.value);
    player.playbackRate = 5/7;
    player.play();
    event.preventDefault();
  });
}, false);