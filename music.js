
function yes() {
  document.getElementById("mydialog").hidden = true;
  const audio = new Audio('files/music.mp3');
  audio.autoplay = true;
  audio.loop = true;
  document.body.appendChild(audio);
  audioInitialized = true;
}

function no() {
  if (document.getElementById("clickno").innerHTML == 'Click "Yes" Please') {
    document.getElementById("clickno").innerHTML = "Please🥺"
  } else if (document.getElementById("clickno").innerHTML == 'Please🥺') {
    document.getElementById("noButton").hidden = true;
    document.getElementById("clickno").innerHTML = "Now you can't click no😎"
  };
}
