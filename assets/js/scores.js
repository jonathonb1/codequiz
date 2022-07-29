function printHighscores() {
    // get scores from local storage or array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sort scores decending
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // Li for ceach high score saved
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // display high score
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
    // clearing highscores
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  printHighscores();