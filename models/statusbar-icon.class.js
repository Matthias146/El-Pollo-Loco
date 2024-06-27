
class StatusbarIcon extends DrawableObject {
    x = 547;
    y = 70;
    width = 70;
    height = 70;


    IMAGES = [
        './img/7_statusbars/3_icons/icon_health_endboss.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES);
    }
}
