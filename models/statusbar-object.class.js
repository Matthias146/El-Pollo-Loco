
class Statusbar extends DrawableObject {

    x = 40;
    width = 250;
    height = 60;
    percentage = 50;


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Resolves the index of the image to use for the current percentage of completion.
     * @returns {number} The index of the image to use. 
     */
    resolveImageIndex() {
        if (this.percentage == 50) {
            return 5;
        } else if (this.percentage >= 40) {
            return 4;
        } else if (this.percentage >= 30) {
            return 3;
        } else if (this.percentage >= 20) {
            return 2;
        } else if (this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }
}
