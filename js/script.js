const crusaderSprite = document.querySelector('.crusadersprite1');
const skellyRangerSprite = document.querySelector('.skellyRanger');
const skellyBruteSprite = document.querySelector('.skellyBrute');
const barroChillSprite = document.querySelector('.barroChill');
const barroMadSprite = document.querySelector('.barroMad');
const event1Check = document.querySelector('.event1__checkbox.clickable');

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
        this.maxDamage = this.level * 20;
    }
    attack(enemy) {
        if(Math.random() > enemy.evadeChance && playerTurn === false){
            let damageThisTime = Math.floor(Math.random() * this.maxDamage) + 10;
            if(damageThisTime - enemy.armor > 0){
                enemy.currentHP -= damageThisTime - enemy.armor;
            }
            enemy.armor -= damageThisTime;
            if(enemy.armor < 0){
                enemy.armor = 0;
            }
            console.log('you were attacked by a ' + this.name + ' your health is ' + enemy.currentHP);
        }else {
            console.log('you dodged him');
        }
        playerTurn = true;
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
        this.evadeChance = .28;
        this.sprite = crusaderSprite;
        this.name = 'The Crusader';
        this.armor = 0;
        this.maxDamage = 40;
    }
    attack(enemy) {
        if(Math.random() > enemy.evadeChance){
            enemy.currentHP -= Math.floor(Math.random() * this.maxDamage) + 10;
            console.log('you attacked the ' + enemy.name + ' his health is ' + enemy.currentHP);
        }else {
            console.log('he dodged your puny attack nimbly');
        }
    }
}

const player = new Crusader(1);
console.log('crusader: ', player.currentHP);
//MAKING THE GAME GO WITH EVERY ATTACK

const playersAttack = () => {
    if(playerTurn === true){
        player.attack(currentEnemy);
    }
    playerTurn = false;
    // playersAttack.called = true;
    if(currentEnemy.currentHP > 0){
        setTimeout(() => {enemyRetaliate();}, 2000);
    }
    if(player.currentHP <= 0 || currentEnemy.currentHP <= 0) {
    player.armor = 0;
    let location = currentEvent;
    location.checked = false;
    location.classList.remove('clickable');
    undoAnimateCharacter(player);
    undoAnimateCharacter(currentEnemy);
    undoAnimateButtons();
    currentEvent = null;
    }
}

const playersArmor = () => {
    if(playerTurn === true){
        player.armor += Math.floor(Math.random() * 20) + 1;
        console.log(player.armor);
    }
    playerTurn = false;
    // playersArmor.called = true;
    if(currentEnemy.currentHP > 0){
        setTimeout(() => {enemyRetaliate();}, 2000);
    }
    if(player.currentHP <= 0 || currentEnemy.currentHP <= 0) {
    player.armor = 0;
    let location = currentEvent;
    location.checked = false;
    location.classList.remove('clickable');
    undoAnimateCharacter(player);
    undoAnimateCharacter(currentEnemy);
    undoAnimateButtons();
    currentEvent = null;
    }
}

const enemyRetaliate = () => {
    currentEnemy.attack(player);
}
// const checkForAction = () => {
//     if(playersArmorCalled){
//         playersArmorCalled = false;
//         return true;
//     }else if(playersAttackCalled){
//         playersAttackCalled = false
//         return true;
//     }else{
//         return false;
//     }
// }

//ENEMIES FOR EACH BATTLE
let currentEnemy = null;

const battle1Brute = new SkellyBrute(1);
console.log(battle1Brute.currentHP);

const battle2Brute = new SkellyBrute(3);

const battle3Ranger = new SkellyRanger(5);

const battle4Ranger = new SkellyRanger(5);
const battle4Brute = new SkellyBrute(5);

//track battle
let playerTurn = true;
let currentEvent = null;

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

//ANIMATE AND DEANIMATE BUTTONS
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
// const fightingPossibility = (enemy) => {               <== broken.. starting over
//     setTimeout(() => { }, 2000);
//     if(playersAttack.called && playerTurn === true){
//         console.log('you attack');
//         playersAttack.called = false;
//         playerTurn = false;
//     }else if(playersArmor === 'called' && playerTurn === true){
//         console.log('you gain armor');
//         playersArmor.called = false;
//         playerTurn = false;
//     }
//     if(playerTurn === false){
//         enemy.attack(player);
//         console.log('enemy attacked');
//         playerTurn = true;
//     }else{
//         setTimeout(() => { }, 2000);
//     }    
// }

// function fightingLoop() {
//     while (player.currentHP > 0 && currentEnemy.currentHP > 0) {
//         fightingPossibility(currentEnemy);
//     }

// }
// const fightingLoop = (location) => {
    
//     location.checked = false;
//     location.classList.remove('clickable');
//     undoAnimateCharacter(player);
//     undoAnimateCharacter(currentEnemy);
//     undoAnimateButtons();
//     currentEvent = null;
// }

//Starting from checkbox change
startBattle = (event) => {
    if(event.target.checked === true && event.target.classList.contains('clickable')){
        animateCharacter(player);
        eventTarget = event.target;
        inBattle = true;
        if(event.target === event1Check){
            currentEvent = event1Check;
            currentEnemy = battle1Brute;
            animateCharacter(currentEnemy);
            animateButtons();
        }
        // fightingLoop(currentEnemy);
    }else {
        undoAnimateCharacter(player);
        undoAnimateCharacter(currentEnemy);
    }
}

event1Check.addEventListener('change', startBattle);

attackIcon.addEventListener('click', playersAttack);
armorIcon.addEventListener('click', playersArmor);