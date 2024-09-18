document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const play_pause_button = document.getElementById('play-pause');
    const timeline = document.getElementById('timeline');
    const currentTimeText = document.getElementById('current-time');
    const durationText = document.getElementById('duration');
    const play_next_button = document.getElementById('play-next-button');
    const play_prev_button = document.getElementById('play-prev-button');
    const tracks = [
        "assets/music/Travis_Scott-My_eyes.mp3",
        "assets/music/Gunna-One_Of_Wun.mp3",
    ];
    let playNum = 0;

    let isPlay = false;
    audio.src = tracks[playNum];

    play_pause_button.addEventListener('click', function playAudio() {

        if (!isPlay) {
            audio.play();
            play_pause_button.innerHTML = '<img src="assets/icons/pause.png" alt="pause" id="pause-icon" class="play-pause-img">';
            isPlay = true;
        } else {
            audio.pause();
            play_pause_button.innerHTML = '<img src="assets/icons/play.png" alt="play" id="play-icon"  class="play-pause-img">';
            isPlay = false;
        }
    });


    play_next_button.addEventListener("click", () => {
        if (playNum < tracks.length - 1) {
            playNum++;
            audio.src = tracks[playNum];
            play_pause_button.innerHTML = '<img src="assets/icons/pause.png" alt="pause" id="pause-icon" class="play-pause-img">';
            isPlay = true;
            timeline.value = 0;
            audio.play();
        } else {
            playNum = 0;
            audio.src = tracks[playNum];
            play_pause_button.innerHTML = '<img src="assets/icons/pause.png" alt="pause" id="pause-icon" class="play-pause-img">';
            isPlay= true;
            timeline.value = 0;
            audio.play();
        }
    });

    play_prev_button.addEventListener("click", () => {
        if (playNum > 0) {
            playNum--;
            audio.src = tracks[playNum];
            play_pause_button.innerHTML = '<img src="assets/icons/pause.png" alt="pause" id="pause-icon" class="play-pause-img">';
            isPlay = true;
            audio.play();
        } else {
            playNum = tracks.length -1;
            audio.src = tracks[playNum];
            play_pause_button.innerHTML = '<img src="assets/icons/pause.png" alt="pause" id="pause-icon" class="play-pause-img">';
            isPlay = true;
            audio.play();
        }
    });

    audio.addEventListener('ended', () => {
        if (playNum < tracks.length - 1) {
            playNum++;
            audio.src = tracks[playNum];
            audio.play();
        } else {
            playNum = 0;
            audio.src = tracks[playNum];
            audio.play();
        }
    });














    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        timeline.value = (currentTime / duration) * 100;
        currentTimeText.textContent = formatTime(currentTime)
        durationText.textContent = formatTime(duration);
    })

    timeline.addEventListener('input', function() {
        audio.currentTime  = audio.duration * (timeline.value / 100);
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }


});