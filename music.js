window.addEventListener('click', () => {
  const audio = new Audio('files/music.mp3');
  audio.autoplay = true;
  audio.loop = true;
  document.body.appendChild(audio);
});
