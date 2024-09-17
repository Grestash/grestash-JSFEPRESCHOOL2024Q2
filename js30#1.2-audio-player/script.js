document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const play_pause_button = document.getElementById('play-pause');
    const timeline = document.getElementById('timeline');
    const currentTimeText = document.getElementById('current-time');
    const durationText = document.getElementById('duration');
    let isPlay = false;

    play_pause_button.addEventListener('click', function() {
        
        if (!isPlay) {
            audio.play();
            play_pause_button.textContent = 'Pause';
            isPlay = true;
            
        } else {
            audio.pause();
            play_pause_button.textContent = 'Play';
            isPlay = false; 
            
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
        const seekTo = audio.duration * (timeline.value / 100);
        audio.currentTime = seekTo;
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }


});