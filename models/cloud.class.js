
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    

    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.animate();
        this.x = x;
    }


    /**
     * Animate the object's leftward movement.
     */
    animate() {
        setInterval(() => this.moveLeft() , 1000 / 60);
    }
}
