const crusaderSprite = document.querySelector('.crusadersprite1');
const skellyRangerSprite = document.querySelector('.skellyRanger');
const skellyBruteSprite = document.querySelector('.skellyBrute');
const barroChillSprite = document.querySelector('.barroChill');
const barroMadSprite = document.querySelector('.barroMad');
const event1Check = document.querySelector('.event1__checkbox');

//BarroLiteral
const barro = {
    maxHP: 1000,
    currentHP: 1000,
    evadeChance: .4,
    attackDamage: Math.floor(Math.random() * 70) + 50,
    sprite: barroChillSprite,
}

//enemyClasses
class SkellySoldier {
    constructor(level) {
        this.level = level;
        this.maxHP = Math.floor(Math.random() * (this.level * 100)) + (this.level * 50);
        this.currentHP = 0;
        this.evadeChance = Math.random() * 0.3 + 0.1;
        this.Moneypayout = this.level * 10;
        this.xpPayout = this.level * 10;
    }
    attack(enemy) {
        if(Math.random() > enemy.evadeChance){
            enemy.currentHP -= Math.floor(Math.random() * (this.level * 5));
            enemy.sprite.style.transform = 'translateX(1rem)';
            enemy.sprite.style.transform = 'translateX(-1rem)';
        }
    }
}

class SkellyBrute extends SkellySoldier {
    constructor(level) {
        super(level)
        this.sprite = skellyBruteSprite;
    }
}

class SkellyRanger extends SkellySoldier {
    constructor(level) {
        super(level);
        this.sprite = skellyRangerSprite;
    }
}

//HERO CLASS
class Crusader {
    constructor(level) {
        this.level = level;
        this.maxHP = Math.floor(Math.random() * (this.level * 100)) + (this.level * 50);
        this.currentHP = this.maxHP;
        this.evadeChance = .48;
        this.sprite = crusaderSprite;
    }
    attack(enemy) {
        if(Math.random() > enemy.evadeChance){
            enemy.currentHP -= Math.floor(Math.random() * (this.level * 20)) + 5;
            enemy.sprite.style.transform = 'translateX(1rem)';
            enemy.sprite.style.transform = 'translateX(-1rem)';
        }
    }
}

const player = new Crusader(1);

//ENEMIES FOR EACH BATTLE
let currentEnemy = null;

const battle1Brute = new SkellyBrute(5);

const battle2Brute = new SkellyBrute(7);

const battle3Ranger = new SkellyRanger(9);

const battle4Ranger = new SkellyRanger(7);
const battle4Brute = new SkellyBrute(7);

//ANIMATE AND DEANIMATE CHARACTER SPRITES
const animateCharacter = (character) => {
    character.sprite.style.width = '741px';
    character.sprite.style.height = '741px'; 
    character.sprite.style.transform = 'scale(.5)'
    character.sprite.style.opacity = '1';
}

const undoAnimateCharacter = (character) => {
    character.sprite.style.width = '0';
    character.sprite.style.opacity = '0';
}

//Game Loop
const fightingLoop = (enemy) => {
    enemy.currentHP = enemy.maxHP
    while(player.currentHP > 0 && enemy.currentHP > 0){
        
    }
}

//Starting from checkbox change
startBattle = (event) => {
    if(event.target.checked === true){
        animateCharacter(player);
        if(event.target === event1Check){
            currentEnemy = battle1Brute;
            animateCharacter(currentEnemy);
        }
        fightingLoop(currentEnemy);
    }else {
        crusaderSprite.style.width = '0';
        crusaderSprite.style.opacity = '0';
        undoAnimateCharacter(currentEnemy);
    }
}

event1Check.addEventListener('change', startBattle);

if(currentEnemy) {
    currentEnemy.sprite.addEventListener('click', player.attack);
}