const crusaderSprite = document.querySelector('.crusadersprite1');
const skellyRangerSprite = document.querySelector('.skellyRanger');
const skellyBruteSprite = document.querySelector('.skellyBrute');
const barroChillSprite = document.querySelector('.barroChill');
const barroMadSprite = document.querySelector('.barroMad');
const event1Check = document.querySelector('.event1__checkbox');

const attackIcon = document.querySelector('.attackIcon');
const armorIcon = document.querySelector('.armorIcon');

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
        this.currentHP = this.maxHP;
        this.evadeChance = Math.random() * 0.3 + 0.1;
        this.Moneypayout = this.level * 10;
        this.xpPayout = this.level * 10;
    }
    attack(enemy) {
        if(Math.random() > enemy.evadeChance){
            let attackDamage = Math.floor(Math.random() * (this.level * 5) - enemy.armor);
            enemy.currentHP -= attackDamage;
            enemy.armor -= attackDamage;
            if(enemy.armor < 0){
                enemy.armor = 0;
            }
            console.log('you were attacked by a ' + enemy.name + ' your health is ' + enemy.currentHP);
        }else {
            console.log('you dodged him');
        }
    }
}

class SkellyBrute extends SkellySoldier {
    constructor(level) {
        super(level)
        this.sprite = skellyBruteSprite;
        this.name = 'Skeleton Brute';
    }
}

class SkellyRanger extends SkellySoldier {
    constructor(level) {
        super(level);
        this.sprite = skellyRangerSprite;
        this.name = 'Skeleton Ranger';
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
        this.name = 'The Crusader';
        this.armor = 0;
        this.maxDamage = 20;
    }
    attack(enemy) {
        if(Math.random() > enemy.evadeChance){
            enemy.currentHP -= Math.floor(Math.random() * this.maxDamage) + 5;
            console.log('you attacked the ' + enemy.name + ' his health is ' + enemy.currentHP);
        }else {
            console.log('he dodged your puny attack nimbly');
        }
    }
}

const player = new Crusader(1);

const playersAttack = () => {
    player.attack(currentEnemy);
    playersAttack.called = true;
}

const playersArmor = () => {
    player.armor += Math.floor(Math.random() * 20) + 1;
    console.log(player.armor);
    playersArmor.called = true;
}

//ENEMIES FOR EACH BATTLE
let currentEnemy = null;

const battle1Brute = new SkellyBrute(5);
console.log(battle1Brute.currentHP);

const battle2Brute = new SkellyBrute(7);

const battle3Ranger = new SkellyRanger(9);

const battle4Ranger = new SkellyRanger(7);
const battle4Brute = new SkellyBrute(7);

//track battle
let inBattle = false;
let playerTurn = true;

//ANIMATE AND DEANIMATE CHARACTER SPRITES
const animateCharacter = (character) => {
    if(character === player){
        character.sprite.style.width = '160px';
        character.sprite.style.height = '120px';
        character.sprite.style.transform = 'scale(2)'
        character.sprite.style.opacity = '1';
    } else if(character.sprite === skellyBruteSprite || character.sprite === skellyRangerSprite){
        character.sprite.style.width = '144px';
        character.sprite.style.height = '250px';
        character.sprite.style.transform = 'scale(1.5)'
        character.sprite.style.opacity = '1';
    }
}

const undoAnimateCharacter = (character) => {
    character.sprite.style.width = '0';
    character.sprite.style.opacity = '0';
}

const animateButtons = () => {
    attackIcon.style.width = '512px';
    attackIcon.style.height = '512px';
    attackIcon.style.transform = 'scale(.25)';
    attackIcon.style.opacity = '1'
    armorIcon.style.width = '512px';
    armorIcon.style.height = '512px';
    armorIcon.style.transform = 'scale(.25)';
    armorIcon.style.opacity = '1';
}

const undoAnimateButtons = () => {
    attackIcon.style.height = '0';
    attackIcon.style.opacity = '0';
    armorIcon.style.height = '0';
    armorIcon.style.opacity = '0';
}
//Game Loop
const fightingPossibility = (enemy) => {
    setTimeout(() => { }, 2000);
    if(playersAttack.called && playerTurn === true){
        console.log('you attack');
        playersAttack.called = false;
        playerTurn = false;
    }else if(playersArmor === 'called' && playerTurn === true){
        console.log('you gain armor');
        playersArmor.called = false;
        playerTurn = false;
    }
    if(playerTurn === false){
        enemy.attack(player);
        console.log('enemy attacked');
        playerTurn = true;
    }    
}

function fightingLoop() {
    while (player.currentHP > 0 && currentEnemy.currentHP > 0) {
        fightingPossibility(currentEnemy);
    }

}

//Starting from checkbox change
startBattle = (event) => {
    if(event.target.checked === true){
        animateCharacter(player);
        eventTarget = event.target;
        inBattle = true;
        if(event.target === event1Check){
            currentEnemy = battle1Brute;
            animateCharacter(currentEnemy);
            animateButtons();
        }
        setTimeout(() => { fightingLoop() }, 1000);
        // fightingLoop(currentEnemy);
    }else {
        crusaderSprite.style.width = '0';
        crusaderSprite.style.opacity = '0';
        undoAnimateCharacter(currentEnemy);
    }
}

event1Check.addEventListener('change', startBattle);

attackIcon.addEventListener('click', playersAttack);
armorIcon.addEventListener('click', playersArmor);