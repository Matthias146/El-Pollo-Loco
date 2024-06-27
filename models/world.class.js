
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarIcon = new StatusbarIcon();
    throwableObjects = [];
    statusbarBottle = new Bottlebar();
    statusbarCoin = new Coinbar();
    enbosshealthBar = new EndbossHealthBar();
    collidesWithEndboss = false;
    lastThrow = false;
    alreadyThrow = false;
    endbossIsInvulnerable = false;
    characterIsInvulnerable = false;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Assigns the current object as the world for the associated character.
     * This allows the character to access and modify properties of the world object.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Starts the game loop and runs the game by repeatedly calling methods to check for collisions with the chicken,
     * the endboss, and the objects in the game, and to collect objects and kill the endboss with bottles.
     * Uses a stoppable interval to run the game loop.
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisionsWithChicken();
            this.checkCollisionsWithEndboss();
            this.checkTimerForThrow();
            this.collectBottles();
            this.collectCoins();
            this.killEnemyWithBottle();
        }, 1000 / 25);
    }


    /**
     * Sets an interval to check if the character has thrown an object.
     */
    checkTimerForThrow() {
        setStoppableInterval(() => this.checkThrowObjects(), 1000 / 60);
    }


    /**
     * Checks if the "E" key is pressed and there are still bottles left to throw,
     * and creates a new ThrowableObject to be thrown by the character.
     * Updates the character's bottles count and the statusbar display.
     * Sets a timer after throw to prevent consecutive throws too soon.
     * Otherwise, starts the timer to check again if the conditions for a throw are met.
     */

    checkThrowObjects() {
        if (this.checkIfBottleThrowable()) {
            this.alreadyThrow = true;
            this.lastThrow = true;
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 100, this.character.otherDirection);
            throwSound.play();
            this.throwableObjects.push(bottle);
            this.character.bottles -= 10;
            this.statusbarBottle.setPercentage(this.character.bottles);
            this.character.lastMoveCharacter = 0;
        } else {
            this.timerForThrow();
        }
    }


    /**
     * Check if the bottle is throwable.
     * @returns {boolean} Whether the bottle is throwable or not.
     */
    checkIfBottleThrowable() {
        return this.keyboard.E && this.character.bottles > 0 && !this.lastThrow || this.keyboard.DOWN && this.character.bottles > 0 && !this.lastThrow;
    }


    /**
     * Sets a timeout for the last throw action and prevents the player from throwing objects continuously.
     */
    timerForThrow() {
        if (this.alreadyThrow) {
            this.alreadyThrow = false;
            setTimeout(() => {
                this.lastThrow = false;
            }, 500);
        }
    }


    /**
     * Checks for collisions between the character and all the chickens in the level.
     * If the character collides with a chicken and is not hurt, it checks whether the character is above ground or not.
     * If the character is above ground, it kills the chicken, otherwise it reduces the character's health and updates the health status bar.
     */
    checkCollisionsWithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                if (this.character.isAboveGround()) {
                    this.killChicken(enemy);
                } else {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }


    /**
     * Checks for collisions between the character and the end boss in the level.
     * If there is a collision, decreases the character's health and sets the status bar accordingly.
     * Sets a short invulnerability period after being hit to prevent multiple hits in a row.
     */
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.characterIsInvulnerable) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
                this.characterIsInvulnerable = true;
                setTimeout(() => {
                    this.characterIsInvulnerable = false;
                }, 750);
            }
        });
    }


    /**
     * Kills a chicken enemy, applies a vertical speed to the character and removes the enemy after a delay.
     * @param {Object} enemy - The chicken enemy to be killed.
     */    
    killChicken(enemy) {
        this.character.speedY = 30;
        deadChicken.play();
        enemy.chickenKilled();

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }


    /**
     * Kills chickens that are hit by a bottle from the throwableObjects array and removes them from the level.
     */
    killChickenWithBottle() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy)) {
                    this.chickenKilledWithBottle(enemy);
                }
            });
        });
    }


    /**
     * Plays the animation and sound effect for killing a chicken with a bottle, removes the chicken after a delay.
     * @param {object} enemy - The chicken enemy that was killed.
     */
    chickenKilledWithBottle(enemy) {
        deadChicken.play();
        enemy.chickenKilled();

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }


    /**
     * Checks if throwable objects collide with the endboss and kills the endboss.
     * Checks if throwable objects collide with chickens and kills the chicken.
     */    
    killEnemyWithBottle() {
        this.hitEndboss();
        this.killChickenWithBottle();
    }


    /**
     * Checks if a bottle collides with the endboss.
     * If it does, it removes the bottle and decreases the endboss's energy.
     */
    hitEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach(endboss => {
                if (this.bottleCollidingEndboss(endboss, bottle)) {
                    this.endbossIsHurt(endboss);
                }
            });
        });
    }


    /**
     * Determines if a bottle collides with the endboss.
     * @param {Object} endboss - The endboss object to check for collision with the bottle.
     * @param {Object} bottle - The throwable object to check for collision with the endboss.
     * @returns {boolean} - Returns true if the bottle collides with the endboss and the endboss is not invulnerable.
     */
    bottleCollidingEndboss(endboss, bottle) {
        return bottle.isColliding(endboss) && !this.endbossIsInvulnerable;
    }


    /**
     * Inflicts damage to the endboss and sets a timer during which the endboss becomes invulnerable.
     * @param {Object} endboss - The endboss to be hurt.
     */
    endbossIsHurt(endboss) {
        this.collidesWithEndboss = true;
        endboss.hurtEndboss();
        this.endbossIsInvulnerable = true;
        setTimeout(() => {
            this.endbossIsInvulnerable = false;
        }, 500);
        this.enbosshealthBar.setPercentage(world.level.endboss[0].energy);
    }


    /**
     * Deletes an enemy from the level.
     * @param {Object} enemy - The enemy to be deleted.
     */
    deleteEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        if (i > -1) {
            this.level.enemies.splice(i, 1);
        }
    }


    /**
     * Collects the bottles and increases the count of character's bottles.
     */
    collectBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 50) {
                this.bottleCollected(bottle);
                bottleSound.play();
                this.character.addBottle();
                this.statusbarBottle.setPercentage(this.character.bottles);
            }
        });
    }


    /**
     * Collects coins when the character collides with them and updates the status bar for the number of coins collected.
     */
    collectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinCollected(coin);
                coinSound.play();
                this.character.addCoin();
                this.statusbarCoin.setPercentage(this.character.coins);
            }
        })
    }


    /**
     * Removes the given bottle from the level bottles array.
     * @param {Object} bottle - The bottle object to be removed.
     */
    bottleCollected(bottle) {
        let i = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(i, 1);
    }


    /**
     * Removes the collected coin from the level's coins array.
     * @param {Object} coin - The coin to be removed.
     */
    coinCollected(coin) {
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
    }


    /**
     * Draws the game elements onto the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        this.checkEnbossHealthBar();
        
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Checks if the endboss health bar should be added to the game map.
     */
    checkEnbossHealthBar() {
        if (endbossReached === true) {
            this.addToMap(this.enbosshealthBar);
            this.addToMap(this.statusbarIcon);
        }
    }


    /**
     * Adds the given objects to the map.
     * @param {*} objects - An array of objects to add to the map. 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Checks if otherDirection is true (when push button <- or A) so the character walks into the other direction.
     * First it saves the current state if the canvas (ctx.save()).
     * Then it translates the canvas along the x-axis (ctx.translate) and scales it horizontally by x-axis (ctx.scale).
     * Finally the method sets the x property of mo its negative value.
     * @param {object} mo - A param for a movable object (like the character)
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) this.flipImageBack(mo);
    }


    /**
     * Flips an image horizontally by scaling it negatively and translating it.
     * @param {object} mo - The image object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Flips the given image back to its original state after being flipped horizontally.
     * @param {object} mo - The image object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
