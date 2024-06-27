
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 50;
    lastHit = 0;
    coins = 0;
    bottles = 0;
    timePassed; 

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


    /**
     * Applies gravity to the object by decreasing its vertical position (y) based on its current speedY
     *  and updating its speedY by subtracting the object's acceleration. 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above ground or not.
     * If the object is an instance of the ThrowableObject class, 
     * then it always returns true because throwable objects are meant to be thrown in the air.
     * @returns {boolean} Returns true if the object is above ground or if it's an instance of ThrowableObject.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 155;
        }
    }


    /**
     * Checks teh collision between different objects. These are the character and bottles with enemies.
     * @param {Object} mo - The game object to check collision with.
     * @returns {boolean} - Whether or not the two game objects are colliding. 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Decreases energy by 10 and sets the lastHit property to the current time.
     * If energy goes below zero, sets it to zero.
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object has been hurt in the last second.
     * @returns {boolean} Returns true if the object has been hurt in the last second.
     */
    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit; 
        this.timePassed = this.timePassed / 1000;                  
        return this.timePassed < 1;    
    }


    /**
     * Increases the player's coins by 10.
     */
    addCoin() {
        this.coins += 10;
    }


    /**
     * Increases the player's bottlees by 10.
     */
    addBottle() {
        this.bottles += 10;
    }


    /**
     * Reduces the energy of the end boss by 10 and updates the last hit time.
     */
    hurtEndboss() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    

    /**
     * Checks whether the endboss is hurt or not by comparing the time passed from the last hit with a threshold of 1 second.
     * @returns {boolean} Returns true if the endboss is hurt.
     */
    endbossIsHurt() {
        let timePassed = new Date().getTime() - this.lastHit; 
        timePassed = timePassed / 1000;                         
        return timePassed < 1;    
    }


    /**
     * Checks if the player is dead.
     * @returns {boolean} True if the player's energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Returns true if the energy of the object is equal to 0.
     * @returns {boolean} - Whether the energy of the object is 0 or not.
     */
    chickenKilled() {
        return this.energy = 0;
    }


    /**
     * Plays an animation for different objects.
     * @param {Array} images - An array of strings representing the image paths for the animation frames
     */
    playAnimation(images) {
        let i = this.currenImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage++;
    }


    /**
     * Moves the object to the right by its current speed.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left by its current speed.
     */
    moveLeft() {
        this.x -= this.speed;

    }


    /**
     * Animates the chicken, moving it to the left and playing a walking animation.
     * If the chicken is dead it plays a dead animation.
     */
    animateChicken() {
        this.move = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walking = setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGE_DEAD);
                this.deadChicken()
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }


    /**
     * Stops the movement and walking animation of the chicken when it's dead.
     */
    deadChicken() {
        setTimeout(() => {
            clearInterval(this.move);
            clearInterval(this.walking);
        }, 50);
    }
}
