function PlaySound(_sound) {
    const audio = new Audio(_sound);
    audio.play();
}

let currentMusic = null;

function PlayMusic(_music){
    if (currentMusic == null) {
        currentMusic = new Audio(_music);
        currentMusic.loop = true;
        currentMusic.play();
    }
    else {
        currentMusic.pause();
        currentMusic = null; 
    }
}