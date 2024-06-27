
class ThrowableObject extends MovableObject {

    characterDirection;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: -8
    }


    ROTATING_IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]


    constructor(x, y, otherDirection) {
        super().loadImage(this.ROTATING_IMAGES[0]);
        this.loadImages(this.ROTATING_IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.characterDirection = otherDirection;
        this.throw();
        this.animateBottle();
    }


    /**
     * Sets the initial speed and applies gravity to the bottle.
     * Moves the bottle in the throwing direction until the bottle hits the ground or a throwable object.
     * Clears the throw interval after 1 second.
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (this.characterDirection) {
                this.x -= 12;
            } else {
                this.x += 12;
            }
        }, 25);
        
        setTimeout(() => clearInterval(this.throwInterval) , 1000)
    }


    /**
     * Animates the bottle by playing a rotation animation unless it collides with the endboss, in which case it plays a collision animation.
     */
    animateBottle() {
        this.splash = setInterval(() => {
            if (this.y > 350 || world.collidesWithEndboss) {
            this.playCollisionAnimation();
            } else {
              this.playAnimation(this.ROTATING_IMAGES);
            }
          }, 1000 / 60);
        setInterval(() => world.collidesWithEndboss = false, 100);
    }


    /**
     * Plays the collision animation of the bottle.
     * It plays a splash sound effect, changes the bottle image to the splash image and stops the rotation.
     */
    playCollisionAnimation() {     
        bottle_splash.play();
        this.playAnimation(this.IMAGES_SPLASH);
        this.speed = 0;
        clearInterval(this.splash);
    }
}
