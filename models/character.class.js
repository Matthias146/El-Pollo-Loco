
class Character extends MovableObject {
    height = 280;
    y = 155;
    speed = 5;
    world;
    lastMoveCharacter = 0;


    offset = {
        top: 120,
        bottom: 20,
        left: 30,
        right: 30
    }

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE_CHARACTER = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE_CHARACTER = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE_CHARACTER);
        this.loadImages(this.IMAGES_LONG_IDLE_CHARACTER);
        this.checkApplyGravity();
        this.animate();
    }


    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacter(), 100);
    }


    /**
     * Sets camera position relative to character.
     * Plays walking sound when character moves.
     * Checks if the character can move or jump.
     * If it's possible then execute the function for moving or jumping.
     */
    moveCharacter() {
        this.world.camera_x = -this.x + 100;
        walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
    }


    /**
     * Checks if the character can move right based on the keyboard input and the end of the level position.
     * @returns {boolean} true if the character can move right, false otherwise. 
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead() && !endbosIsDead || this.world.keyboard.D && this.x < this.world.level.level_end_x && !this.isDead() && !endbosIsDead;
    }



    /**
     * Moves the character to the right by changing its x-coordinate and updating its direction.
     * Checks if the character is above ground after moving.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;

        this.checkAboverGround();
    }


    /**
     * Check if the character can move to the left.
     * @returns {boolean} - True if the character can move to the left, false otherwise. 
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0 && !this.isDead() && !endbosIsDead || this.world.keyboard.A && this.x > 0 && !this.isDead() && !endbosIsDead;
    }


    /**
     * Moves the character to the left and updates its direction and checks if it's above ground.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;

        this.checkAboverGround();
    }


    /**
     * Checks if the character is above ground and plays walking sound.
     */
    checkAboverGround() {
        if (!this.isAboveGround() && !this.isHurt())
            walking_sound.play();
    }


    /**
     * Determines if the character can jump.
     * @returns {boolean} True if the character can jump, false otherwise.
     */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * Plays the corresponding animation or routine for the character's current state.
     * Checks if the character is dead, is hurt, is above ground, is walking or is idle and then execute the associated function.
     * Otherwise, the idle routine is played.
     */
    playCharacter() {
        if (this.isDead()) {
            this.deathRoutine();
        } else if (this.isHurt()) {
            this.characterIsHurtRoutine();
        } else if (this.isAboveGround()) {
            this.characterJumpRoutine();
        } else if (this.checkCharacterWalking() && !endbosIsDead) {
            this.characterWalkingRoutine();
        } else if (this.checkCharacterIdle()) {
            this.characterIdleAnimation();
        } else {
            this.characterIdleRoutine();
        }
    }


    /**
     * Plays the character's hurt animation and sound effect and sets lastMoveCharacter to 0..
     */
    characterIsHurtRoutine() {
        hurt_sound.play();
        this.playAnimation(this.IMAGES_HURT);
        this.lastMoveCharacter = 0;
    }


    /**
     * Plays the animation if the character jumps and sets lastMoveCharacter to 0..
     */
    characterJumpRoutine() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.lastMoveCharacter = 0;
    }


    /**
     * Checks whether the character is walking.
     * @returns {boolean} true if the character is moving right or left, false otherwise.
     */
    checkCharacterWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.D || this.world.keyboard.LEFT || this.world.keyboard.A;
    }


    /**
     * Plays the walking animation and sets lastMoveCharacter to 0.
     */
    characterWalkingRoutine() {
        this.playAnimation(this.IMAGES_WALKING);
        this.lastMoveCharacter = 0;
    }


    /**
     * Plays the idle animation for the character when there is no user input and character is not moving.
     * Plays the snore sound.
     */
    characterIdleRoutine() {
        this.playAnimation(this.IMAGES_LONG_IDLE_CHARACTER);
        snoreSound.play();
    }


    /**
     * Makes the character jump and plays the jump sound.
     */
    jump() {
        this.speedY = 30;
        jumping_sound.play();
    }


    /**
     * Sets an interval for applying gravity to the character.
     * The second if-query ensures that the character lands on the ground at the right y-coordinates.
     */
    checkApplyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } if (this.y > 155) {
                this.y = 155;
            }
        }, 1000 / 25);
    }


    /**
     * Plays the character's death animation and stops the game. Plays the death sound. 
     * Sets the current time of death sound to 0. So this sound starts from the beginning next time.
     * Stops the game music and ensures that the snoring sound is not heard after the character died. 
     * Shows the death screen.
     */
    deathRoutine() {
        this.playAnimation(this.IMAGES_DEAD);
        death_sound.play();
        game_music.pause();
        boss_music.pause();
        walking_sound.pause();

        setTimeout(() => {
            deathScreen();
            snoreSound.volume = 0;
        }, 3000);
    }


    /**
     * Checks if the character is idle based on the time elapsed since the last move.
     * @returns {boolean} True if the character is idle, false otherwise.
     */
    checkCharacterIdle() {
        return this.lastMoveCharacter < 50;
    }


    /**
     * Plays idle animation of the character.
     * If the character has not moved for more than 50 frames, plays the long idle animation along with the snore sound effect.
     * Otherwise, plays the regular idle animation. Plays the snore sound.
     */
    characterIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE_CHARACTER);
        this.lastMoveCharacter++;
        snoreSound.pause();
    }
}
