
let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let endbossReached = false;
let endbosIsDead = false;


/**
 * Starts the game by initializing the level, hiding elements, setting up mobile buttons, 
 * showing game buttons and creating a new world object.
 */
function startGame() {
    showLoadingScreen();
    setTimeout(() => {
        showGameContainer();
        initLevel();
        hideElements();
        mobileButtons();
        showButtons();
        soundSettings();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }, 2500);
}


/**
 * Hides the game container and shows the loading screen.
 */
function showLoadingScreen() {
    document.getElementById('game-container').classList.add('d-none');
    document.getElementById('loading-screen').classList.remove('d-none');
}


/**
 * Hides the loading screen and shows the game container.
 */
function showGameContainer() {
    document.getElementById('game-container').classList.remove('d-none');
    document.getElementById('loading-screen').classList.add('d-none');
}


/**
 * Sets up a stoppable interval that calls a function repeatedly with a specified time interval.
 * @param {Function} fn - The function to be called repeatedly. 
 * @param {number} time - The time interval in milliseconds. 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


/**
 * Stops all stoppable intervals that were previously set up using the setStoppableInterval function.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
}


/**
 * Shows game buttons by removing the 'd-none' class from their respective HTML elements.
 */
function showButtons() {
    document.getElementById('button-container-ingame').classList.remove('d-none');
}


/**
 * Shows the death screen by adding/removing specific classes to/from HTML elements after a delay of 500ms.
 */
function deathScreen() {
    setTimeout(() => {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('button-container-ingame').classList.add('d-none');
        document.getElementById('mobile-btns-bottom').classList.add('d-none');
        document.getElementById('restart-container').classList.remove('d-none');
    }, 500);
    endbossReached = false;
}


/**
 * Hides elements of the start screen and shows the canvas
 */
function hideElements() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('button-container').classList.add('d-none');
    document.getElementById('startscreen-container').classList.add('mobile-height');
    document.getElementById('startscreen-container').classList.remove('mobile-height');
}


/**
 * Restarts the game by hiding the death screen and calling the startGame function to initialize the game.
 */
function restartGame() {
    document.getElementById('restart-container').classList.add('d-none');
    death_sound.pause();
    endbosIsDead = false;
    death_sound.currentTime = 0;

    clearAllIntervals();
    startGame();
}


/**
 * Displays the "game won" screen and hides various elements of the game interface.
 */
function gameWon() {
    document.getElementById('game-over-screen-img').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('button-container-ingame').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');

    endbossReached = false;
    showGameWonContainer();
}


/**
 * Shows the "game won" container after a delay of 2 seconds.
 * Hides the "game over" image and sets the global variable "endbosIsDead" to false.
 */
function showGameWonContainer() {
    setTimeout(() => {
        document.getElementById('game-over-screen-img').classList.add('d-none');
        document.getElementById('game-won-container').classList.remove('d-none');
        endbosIsDead = false;
    }, 2000);
}


/**
 * Reloads the current page, effectively returning the user to the main menu and resetting the game.
 */
function mainMenu() {
    clearAllIntervals();
    showMainMenu();

    death_sound.currentTime = 0;
    endbossReached = false;

    exitFullscreen();
    pauseGameSounds();
    hideButtons();
}


/**
 * Shows the main menu by adding/removing appropriate CSS classes to DOM elements.
 */
function showMainMenu() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('button-container').classList.remove('d-none');
    document.getElementById('restart-container').classList.add('d-none');
    document.getElementById('game-won-container').classList.add('d-none');
    document.getElementById('game-over-screen-img').classList.add('d-none');
}


/**
 * Hide all ingame buttons.
 */
function hideButtons() {
    document.getElementById('button-container-ingame').classList.add('d-none');
}


/**
 * Opens the controls menu, hiding the game container and mobile buttons.
 */
function openControls() {
    document.getElementById('controls-container').classList.remove('d-none');
    document.getElementById('startscreen-container').classList.add('d-none');
    document.getElementById('button-container').classList.add('d-none');
}


/**
 * Closes the controls menu, shows the mobile buttons.
 */
function closeControlsContainer() {
    document.getElementById('controls-container').classList.add('d-none');
    document.getElementById('startscreen-container').classList.remove('d-none');
    document.getElementById('button-container').classList.remove('d-none');
}


/**
 * Shows the in-game controls and hides the canvas element and back buttons.
 */
function openIngameControls() {
    document.getElementById('controls-container').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('controls-container-back').classList.add('d-none');
    document.getElementById('controls-container-ingame-back').classList.remove('d-none');
}


/**
 * Hides the in-game controls container and shows the game canvas and main controls button.
 */
function closeControlsContainerIngame() {
    document.getElementById('controls-container').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('controls-container-back').classList.remove('d-none');
    document.getElementById('controls-container-ingame-back').classList.add('d-none');
}


/**
 * Shows the story container and hides the game container and mobile buttons at the bottom.
 */
function openStoryContainer() {
    document.getElementById('story-container').classList.remove('d-none');
    document.getElementById('game-container').classList.add('d-none');
}

/**
 * Shows the Impressum container and hides the game container and mobile buttons at the bottom.
 */
function openImpressumContainer() {
    document.getElementById('impressum-container').classList.remove('d-none');
    document.getElementById('game-container').classList.add('d-none');
}

/**
 * Closes the story container and shows the game container.
 */
function closeStoryContainer() {
    document.getElementById('story-container').classList.add('d-none');
    document.getElementById('game-container').classList.remove('d-none');
}

function closeImpressumContainer() {
    document.getElementById('impressum-container').classList.add('d-none');
    document.getElementById('game-container').classList.remove('d-none');
}


/**
 * Toggles fullscreen mode for the game container element.
 */
function fullscreen() {
    let gameContainer = document.getElementById('game-container');
    enterFullscreen(gameContainer);
}


/**
 * Requests fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to enter fullscreen mode. 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    fullscreenStyle();
}


/**
 * Applies CSS styling to elements when the game enters fullscreen mode.
 */
function fullscreenStyle() {
    document.getElementById('restart-container').classList.add('fullscreen');
    document.getElementById('game-won-container').classList.add('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('fullscreen-btn').classList.add('d-none');
    document.getElementById('exit-fullscreen').classList.remove('d-none');
    document.getElementById('game-won-container').classList.add('fullscreen');
    document.getElementById('controls-container').classList.add('fullscreen');
}


/**
 * Exits fullscreen mode and removes fullscreen styles from elements.
 */
function exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    removeFullscreenStyle();
}



/**
 * Removes the fullscreen styles from various elements on the page.
 * Restores the fullscreen button and hides the exit fullscreen button.
 */
function removeFullscreenStyle() {
    document.getElementById('restart-container').classList.remove('fullscreen');
    document.getElementById('game-won-container').classList.remove('fullscreen');
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('fullscreen-btn').classList.remove('d-none');
    document.getElementById('exit-fullscreen').classList.add('d-none');
    document.getElementById('controls-container').classList.remove('fullscreen');
}


/**
 * Clears all JavaScript intervals with IDs between 1 and 9999.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++)  window.clearInterval(i);
}


/**
 * Adds an event listener to the window object that listens for keydown events
 * and sets the corresponding value in the keyboard object to true if the keycode matches.
 * @param {Object} e - The event object.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 65) {
        keyboard.A = true;
    }

    if (e.keyCode == 83) {
        keyboard.S = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    if (e.keyCode == 87) {
        keyboard.W = true;
    }

    if (e.keyCode == 69) {
        keyboard.E = true;
    }
});


/**
 * Event listener for keyup events that sets the corresponding property to false in the keyboard object.
 * @param {KeyboardEvent} e - The keyboard event object
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 65) {
        keyboard.A = false;
    }

    if (e.keyCode == 83) {
        keyboard.S = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }

    if (e.keyCode == 87) {
        keyboard.W = false;
    }

    if (e.keyCode == 69) {
        keyboard.E = false;
    }
});


/**
 * Initializes mobile controls for the game.
 */
function mobileButtons() {
    document.getElementById("canvas").addEventListener("touchstart", (e) => {
        e.preventDefault();
    });

    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById("btn-left").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById("btn-right").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById("btn-jump").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.E = true;
    });

    document.getElementById("btn-throw").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.E = false;
    });

    document.getElementById('mobile-btns-bottom').classList.remove('d-none');
}
