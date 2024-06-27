
class Level {
    enemies;
    endboss;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 3500;

    
    constructor(enemies, endboss, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    };
}
