
walking_sound = new Audio('./audio/running.mp3');
jumping_sound = new Audio('./audio/jump.mp3');
hurt_sound = new Audio('./audio/hurt.mp3');
death_sound = new Audio('./audio/death-sound.mp3');
win_sound = new Audio('./audio/win.mp3');
bottle_splash = new Audio('./audio/bottle-splash.mp3');
bottleSound = new Audio('./audio/bottle.mp3');
coinSound = new Audio('./audio/coin.mp3');
deadChicken = new Audio('./audio/chicken.mp3');
throwSound = new Audio('./audio/throw.mp3');
snoreSound = new Audio('./audio/snore.mp3');

hit_boss = new Audio('./audio/hit-boss.mp3');
boss_music = new Audio('./audio/boss-music.mp3');
boss_music.loop = true;

let game_music_muted = false;
game_music = new Audio('./audio/game-music.mp3');
game_music.loop = true;


/**
 * Set the sound settings for the game
 */
function soundSettings() {
    snoreSound.volume = 1;
    checkgameMusicMuted();

    boss_music.currentTime = 0;
}


/**
 * Checks if the game music is muted and either starts playing the music or sets its volume to 0.
 */
function checkgameMusicMuted() {
    if (!game_music_muted) {
        game_music.currentTime = 0;
        game_music.play();
        game_music.volume = 0.5;
    } else {
        game_music.volume = 0;
    }
}


/**
 * Pause all ingame sounds.
 */
function pauseGameSounds() {
    death_sound.pause();
    death_sound.currentTime = 0;
    game_music.pause();
    game_music.currentTime = 0;
    win_sound.pause();
    win_sound.currentTime = 0;
}


/**
 * Mutes all sounds in the game by setting their volume to 0.
 * Also shows the "unmute sound" button.
 */
function muteSound() {
    showUnmuteButton();
    walking_sound.volume = 0;
    jumping_sound.volume = 0;
    hurt_sound.volume = 0;
    death_sound.volume = 0;
    win_sound.volume = 0;
    bottle_splash.volume = 0;
    bottleSound.volume = 0;
    coinSound.volume = 0;
    deadChicken.volume = 0;
    throwSound.volume = 0;
    snoreSound.volume = 0;
    muteGameMusic();
    boss_music.volume = 0;
    hit_boss.volume = 0;
    muteButton = true;
}


/**
 * Displays the unmute sound button and hides the mute sound button.
 */
function showUnmuteButton() {
    document.getElementById('unmute-sound').classList.remove('d-none');
    document.getElementById('mute-sound').classList.add('d-none');
}


/**
 * The unmuteSound() function in the code is used to unmute the game sounds.
 * Also it shows the "mute" button.
 */
function unmuteSound() {
    showMuteButton();
    walking_sound.volume = 1;
    jumping_sound.volume = 1;
    hurt_sound.volume = 1;
    death_sound.volume = 1;
    win_sound.volume = 1;
    bottle_splash.volume = 1;
    bottleSound.volume = 1;
    coinSound.volume = 1;
    deadChicken.volume = 1;
    throwSound.volume = 1;
    snoreSound.volume = 1;
    unmuteGameMusic();
    boss_music.volume = 1;
    hit_boss.volume = 1;
    muteButton = false;
}


/**
 * Displays the mute sound button and hides the unmute sound button.
 */
function showMuteButton() {
    document.getElementById('unmute-sound').classList.add('d-none');
    document.getElementById('mute-sound').classList.remove('d-none');
}


/**
 * Pauses the game music and sets the game_music_muted variable to true.
 */
function muteGameMusic() {
    game_music.pause();
    game_music_muted = true;

    muteButton = true;
}


/**
 * Hides the in-game controls container and shows the game canvas and main controls button.
 */
function unmuteGameMusic() {
    game_music.play();
    game_music.volume = 0.5;
    game_music_muted = false;
}
