alert('You have journeyed from far far to the west to find the evil amulet of the dead. Your destiny as a crusader is to destroy the amulet, as it is the embodiment of pure evil.')

const crusaderSprite = document.querySelector('.crusadersprite1');
const skellyRangerSprite = document.querySelector('.skellyRanger');
const skellyBruteSprite = document.querySelector('.skellyBrute');
const barroChillSprite = document.querySelector('.barroChill');
const barroMadSprite = document.querySelector('img.barroMad');

//getting checkboxes for events, and icons for changing
const event1Check = document.querySelector('.event1__checkbox.clickable');
const event1Icon = document.querySelector('.event1__icon');
const event2Check = document.querySelector('.event2__checkbox');
const event2Icon = document.querySelector('.event2__icon');
const event3Check = document.querySelector('.event3__checkbox');
const event3Icon = document.querySelector('.event3__icon');
const event4Check = document.querySelector('.event4__checkbox');
const event4Icon = document.querySelector('.event4__icon');
const event5Check = document.querySelector('.event5__checkbox');
const event5Icon = document.querySelector('.event5__icon');
const event6Check = document.querySelector('.event6__checkbox');
const event6Icon = document.querySelector('.event6__icon');
const event7Check = document.querySelector('.event7__checkbox');
const event7Icon = document.querySelector('.event7__icon');
const event8Check = document.querySelector('.event8__checkbox');
const event8Icon = document.querySelector('.event8__icon');


const attackIcon = document.querySelector('.attackIcon');
const armorIcon = document.querySelector('.armorIcon');

//BarroLiteral
const barro = {
    maxHP: 1000,
    name: 'Mad Barro',
    currentHP: 1000,
    evadeChance: .6,
    attackDamage: Math.floor(Math.random() * 200) + 70,
    sprite: barroMadSprite,
    attack: function(enemy){
        if(Math.random() > enemy.evadeChance && playerTurn === false){
            if(barro.attackDamage - enemy.armor > 0){
                enemy.currentHP -= barro.attackDamage - enemy.armor;
            }
            enemy.armor -= barro.attackDamage;
            if(enemy.armor < 0){
                enemy.armor = 0;
            }
                console.log('you were attacked by ' + this.name + ' your health is ' + enemy.currentHP);
        }else {
                console.log('you dodged him');
        }
        playerTurn = true;
    },
}

const theChillBarro = {
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
        this.minDamage = 10;
        this.maxArmorGain = 20;
        this.minArmorGain = 10;
        this.shieldCap = 50;
    }
    attack(enemy) {
        if(Math.random() > enemy.evadeChance){
            enemy.currentHP -= Math.floor(Math.random() * this.maxDamage) + this.minDamage;
            console.log('you attacked the ' + enemy.name + ' his health is ' + enemy.currentHP);
        }else {
            console.log('he dodged your puny attack nimbly');
        }
    }
}

const player = new Crusader(2);
console.log('crusader: ', player.currentHP);


//MAKING THE GAME GO WITH EVERY ATTACK
const playersAttack = () => {
    if(playerTurn === true){
        player.attack(currentEnemy);
    }
    playerTurn = false;
    // playersAttack.called = true;
    if(currentEnemy.currentHP > 0){
        enemyRetaliate();
    }
    if(barro.currentHP <= 0){
        const winContain = document.createElement('div');
        winContain.style.position = 'absolute';
        winContain.style.top = '50%';
        winContain.style.left = '50%';
        winContain.style.backgroundColor = 'red';
        winContain.style.zIndex = '2500';
        const youWin = document.createElement('h1');
        youWin.innerText = "You destroyed the amulet and fulfilled your destiny. You will be hailed as a hero by your fellow crusaders at the church";
        document.querySelector('body').appendChild(winContain);
        winContain.appendChild(youWin);
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Replay?';
        resetButton.addEventListener('click', () => {
            location.reload();
        });
        winContain.appendChild(resetButton);
    }
    if(currentEnemy.currentHP <= 0 && player.currentHP > 0) {
        player.armor = 0;
        currentIcon.innerText = 'X';
        nextEvent.classList.add('clickable');
        nextIcon.innerText = '!';
        currentEvent.checked = false;
        currentEvent.classList.remove('clickable');
        undoAnimateCharacter(player);
        undoAnimateCharacter(currentEnemy);
        undoAnimateButtons();
    }else if(player.currentHP <= 0){
        currentEvent.checked = false;
        undoAnimateCharacter(player);
        undoAnimateCharacter(currentEnemy);
        undoAnimateButtons();
        currentEvent.classList.remove('clickable');
        const winContain = document.createElement('div');
        winContain.style.position = 'absolute';
        winContain.style.top = '50%';
        winContain.style.left = '50%';
        winContain.style.backgroundColor = 'red';
        winContain.style.zIndex = '2500';
        const youWin = document.createElement('h1');
        youWin.innerText = "Died pitifully. Luckily you can respawn on the island of the dead";
        document.querySelector('body').appendChild(winContain);
        winContain.appendChild(youWin);
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Retry?';
        resetButton.addEventListener('click', () => {
            location.reload();
        });
        winContain.appendChild(resetButton);
    }
}

const playersArmor = () => {
    if(playerTurn === true){
        player.armor += Math.floor(Math.random() * player.maxArmorGain) + player.minArmorGain;
        console.log(player.armor);
    }
    if(player.armor > player.shieldCap){
        player.armor = player.shieldCap;
    }
    playerTurn = false;
    // playersArmor.called = true;
    if(currentEnemy.currentHP > 0){
        enemyRetaliate();
    }
    if(player.currentHP <= 0) {
        const winContain = document.createElement('div');
        winContain.style.position = 'absolute';
        winContain.style.top = '50%';
        winContain.style.left = '50%'
        winContain.style.backgroundColor = 'red';
        winContain.style.zIndex = '2500';
        const youWin = document.createElement('h1');
        youWin.innerText = "Died pitifully. Luckily you can respawn on the island of the dead";
        document.querySelector('body').appendChild(winContain);
        winContain.appendChild(youWin);
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Retry?';
        resetButton.addEventListener('click', () => {
            location.reload();
        });;
        winContain.appendChild(resetButton);
        currentEvent.checked = false;
        currentEvent.classList.remove('clickable');
        undoAnimateCharacter(player);
        undoAnimateCharacter(currentEnemy);
        undoAnimateButtons();
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

const battle2Ranger = new SkellyRanger(3);

const battle3Brute = new SkellyBrute(3);

const battle4Ranger = new SkellyRanger(5);

//track battle
let playerTurn = true;
let currentEvent = null;
let currentIcon = null;
let nextIcon = null;
let nextEvent = null;

//ANIMATE AND DEANIMATE CHARACTER SPRITES
const animateCharacter = (character) => {
    if(character === player){
        character.sprite.style.width = '160px';
        character.sprite.style.height = '120px';
        character.sprite.style.transform = 'scale(3.5)'
        character.sprite.style.opacity = '1';
    } else if(character.sprite === skellyBruteSprite || character.sprite === skellyRangerSprite){
        character.sprite.style.width = '144px';
        character.sprite.style.height = '250px';
        character.sprite.style.transform = 'scale(1.5)'
        character.sprite.style.opacity = '1';
    } else if(character === theChillBarro || character === barro){
        character.sprite.style.width = '167px';
        character.sprite.style.height = '404px';
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
const startBattle = (event) => {
    if(event.target.checked === true){
        eventTarget = event.target;
        if(eventTarget === event1Check && event1Check.classList.contains('clickable')){
            alert('Press the sword button to attack. Press the shield button to gain a varying amount of armor. Your enemy will attack simultaniously when you choose your action.');
            currentEvent = event1Check;
            nextEvent = event2Check;
            currentIcon = event1Icon;
            nextIcon = event2Icon;
            currentEnemy = battle1Brute;
            animateButtons();
            animateCharacter(player);
            animateCharacter(currentEnemy);
        }else if(eventTarget === event2Check && event2Check.classList.contains('clickable')){
            alert('After defeating your first enemy, you stumble upon an abandoned town. No noise, no lights. Save for 1 tavern, that has a warm glow inside. You enter and are greeted');
            currentEvent = event2Check;
            nextEvent = event3Check;
            currentIcon = event2Icon;
            nextIcon = event3Icon;
            currentEnemy = theChillBarro;
            event2dialogue();
            animateCharacter(player);
            animateCharacter(currentEnemy);
        }else if(eventTarget === event3Check && event3Check.classList.contains('clickable')){
            currentEvent = event3Check;
            nextEvent = event4Check;
            currentIcon = event3Icon;
            nextIcon = event4Icon;
            currentEnemy = battle2Ranger;
            animateButtons();
            animateCharacter(player);
            animateCharacter(currentEnemy);
        }else if(eventTarget === event4Check && event4Check.classList.contains('clickable')){
            alert('Your health does not regenerate if you have not visited a bartender');
            currentEvent = event4Check;
            nextEvent = event5Check;
            currentIcon = event4Icon;
            nextIcon = event5Icon;
            currentEnemy = battle3Brute;
            animateButtons();
            animateCharacter(player);
            animateCharacter(currentEnemy);
        }else if(eventTarget === event5Check && event5Check.classList.contains('clickable')){
            alert('After a long hike, with a few encounters you reach the next barten-- wait a minute');
            currentEvent = event5Check;
            nextEvent = event6Check;
            currentIcon = event5Icon;
            nextIcon = event6Icon;
            currentEnemy = theChillBarro;
            event5dialogue();
            animateCharacter(player);
            animateCharacter(currentEnemy);
        }else if(eventTarget === event6Check && event6Check.classList.contains('clickable')){
            currentEvent = event6Check;
            nextEvent = event7Check;
            currentIcon = event6Icon;
            nextIcon = event7Icon;
            currentEnemy = battle4Ranger;
            animateButtons();
            animateCharacter(player);
            animateCharacter(currentEnemy);
        }else if(eventTarget === event7Check && event7Check.classList.contains('clickable')){
            alert('okay I cant say I didnt see this coming');
            currentEvent = event7Check;
            nextEvent = event8Check;
            currentIcon = event7Icon;
            nextIcon = event8Icon;
            currentEnemy = theChillBarro;
            event7dialogue();
            animateCharacter(player);
            animateCharacter(currentEnemy);
        }else if(eventTarget === event8Check && event8Check.classList.contains('clickable')){
            currentEvent = event8Check;
            currentIcon = event8Icon;
            currentEnemy = theChillBarro;
            event8dialogue();
            animateCharacter(player);
            animateCharacter(currentEnemy);
        }
        // fightingLoop(currentEnemy);
    // }else {
    //     undoAnimateCharacter(player);
    //     undoAnimateCharacter(currentEnemy);
    //     undoAnimateButtons();
    // }
    }
}

//barro dialogues

const event2dialogue = () => {
    let speechContainer = document.createElement('div');
    speechContainer.style.zIndex = '500';
    speechContainer.style.position = 'absolute';
    speechContainer.style.top = '50%';
    speechContainer.style.left = '60%';
    document.querySelector('body').appendChild(speechContainer);
    let barrosSpeech = document.createElement('p');
    barrosSpeech.style.position = 'relative';
    barrosSpeech.style.textAlign = 'center';
    barrosSpeech.style.color = 'white';
    barrosSpeech.style.fontSize = '7rem';
    speechContainer.appendChild(barrosSpeech);
    const barroString1 = 'Barro: Hey there... Its been a while since a mortal has wandered onto this island.';
    barrosSpeech.innerText = barroString1;
    setTimeout(() => { const barroString2 = 'Dont worry, I\'m a big guy, but Im more of a bartender, rather than a fighter. You have the bearing of a crusader';
    barrosSpeech.innerText = barroString2;}, 5000);
    setTimeout(() => {const barroString3 = 'If youre looking to destroy the amulet of the dead that has been plaguing this island, then you should head to the next town';
    barrosSpeech.innerText = barroString3}, 10000);
    setTimeout(() => {const barroString4 = 'I know the bartender there, just head southeast and tell him Barro sent you. He knows where the amulet is held.';
    barrosSpeech.innerText = barroString4}, 15000);
    setTimeout(() => {const barroString4 = 'But first let me restore your health'; 
    barrosSpeech.innerText = barroString4}, 20000)
    setTimeout(() => {barrosSpeech.innerText = '';}, 25000);
    player.maxHP += 30;
    player.currentHP = player.maxHP;
    player.minDamage += 25;
    player.maxDamage += 50;
    player.minArmorGain += 30;
    player.maxArmorGain += 70;
    player.shieldCap += 50;
    setTimeout(() => {alert('Your max health has increased and your health has increased to the new max. Your maximum damage output has also increased.');}, 25000);
    //end event
    setTimeout(() => {currentIcon.innerText = 'X';
    nextEvent.classList.add('clickable');
    nextIcon.innerText = '!';
    currentEvent.checked = false;
    currentEvent.classList.remove('clickable');
    undoAnimateCharacter(player);
    undoAnimateCharacter(currentEnemy);}, 26000);
}

const event5dialogue = () => {
    let speechContainer = document.createElement('div');
    speechContainer.style.zIndex = '500';
    speechContainer.style.position = 'absolute';
    speechContainer.style.top = '50%';
    speechContainer.style.left = '60%';
    document.querySelector('body').appendChild(speechContainer);
    let barrosSpeech = document.createElement('p');
    barrosSpeech.style.position = 'relative';
    barrosSpeech.style.textAlign = 'center';
    barrosSpeech.style.color = 'white';
    barrosSpeech.style.fontSize = '7rem';
    speechContainer.appendChild(barrosSpeech);
    const barroString1 = 'Okay okay okay... Maybe I gave you the run around a bit. But I do have cool bars... I just wanted you to see.';
    barrosSpeech.innerText = barroString1;
    setTimeout(() => { const barroString2 = 'Now Ms. Crusader... That amulet will be in the keep to the north of here.';
    barrosSpeech.innerText = barroString2;}, 5000);
    setTimeout(() => {const barroString3 = 'Your best bet is to stop at the mini-island town and heal at that bar.';
    barrosSpeech.innerText = barroString3}, 10000);
    setTimeout(() => {const barroString4 = 'I hear the guardian of the amulet is a real terrifying presence to come face to face with.';
    barrosSpeech.innerText = barroString4}, 15000);
    setTimeout(() => {const barroString4 = 'Im going to heal you now. Keep in mind that this journey may not end happily... But I wish the best for you'; 
    barrosSpeech.innerText = barroString4}, 20000)
    setTimeout(() => {barrosSpeech.innerText = '';}, 25000);
    player.maxHP += 30;
    player.currentHP = player.maxHP;
    player.minDamage += 25;
    player.maxDamage += 50;
    player.minArmorGain += 40;
    player.maxArmorGain += 40;
    player.shieldCap += 100;
    setTimeout(() => {alert('Your max health has increased and your health has increased to the new max. Your maximum damage output has also increased. And your shield is significantly upgraded');}, 25000);
    //end event
    setTimeout(() => {currentIcon.innerText = 'X';
    nextEvent.classList.add('clickable');
    nextIcon.innerText = '!';
    currentEvent.checked = false;
    currentEvent.classList.remove('clickable');
    undoAnimateCharacter(player);
    undoAnimateCharacter(currentEnemy);}, 26000);
}

const event7dialogue = () => {
    let speechContainer = document.createElement('div');
    speechContainer.style.zIndex = '500';
    speechContainer.style.position = 'absolute';
    speechContainer.style.top = '50%';
    speechContainer.style.left = '60%';
    document.querySelector('body').appendChild(speechContainer);
    let barrosSpeech = document.createElement('p');
    barrosSpeech.style.position = 'relative';
    barrosSpeech.style.textAlign = 'center';
    barrosSpeech.style.color = 'white';
    barrosSpeech.style.fontSize = '7rem';
    speechContainer.appendChild(barrosSpeech);
    const barroString1 = 'Yeah its me again. Im basically the ONLY sane skelly on this whole island.';
    barrosSpeech.innerText = barroString1;
    setTimeout(() => { const barroString2 = 'But the good news is I get ownership of every bar on the island... For FREE!';
    barrosSpeech.innerText = barroString2;}, 5000);
    setTimeout(() => {const barroString3 = 'Well to the more serious matters... It was fun getting to know you, but';
    barrosSpeech.innerText = barroString3}, 10000);
    setTimeout(() => {const barroString4 = 'Im not exactly betting my salary on YOU here... No offense';
    barrosSpeech.innerText = barroString4}, 15000);
    setTimeout(() => {const barroString4 = 'Time for some heals bud? It\'s the least I can do... actually its the most, too'; 
    barrosSpeech.innerText = barroString4}, 20000)
    setTimeout(() => {barrosSpeech.innerText = '';}, 25000);
    player.maxHP += 30;
    player.currentHP = player.maxHP;
    player.minDamage += 25;
    player.maxDamage += 50;
    player.minArmorGain += 10;
    player.maxArmorGain += 10;
    player.shieldCap += 50;
    setTimeout(() => {alert('Your max health has increased and your health has increased to the new max. Your maximum damage output has also increased. And your shield has been upgraded');}, 25000);
    //end event
    setTimeout(() => {currentIcon.innerText = 'X';
    nextEvent.classList.add('clickable');
    nextIcon.innerText = '!';
    currentEvent.checked = false;
    currentEvent.classList.remove('clickable');
    undoAnimateCharacter(player);
    undoAnimateCharacter(currentEnemy);}, 26000);
}

const event8dialogue = () => {
    let speechContainer = document.createElement('div');
    speechContainer.style.zIndex = '500';
    speechContainer.style.position = 'absolute';
    speechContainer.style.top = '50%';
    speechContainer.style.left = '60%';
    document.querySelector('body').appendChild(speechContainer);
    let barrosSpeech = document.createElement('p');
    barrosSpeech.style.position = 'relative';
    barrosSpeech.style.textAlign = 'center';
    barrosSpeech.style.color = 'white';
    barrosSpeech.style.fontSize = '7rem';
    speechContainer.appendChild(barrosSpeech);
    const barroString1 = 'Ohhhhhh MAN... WHAT A TWIST!';
    barrosSpeech.innerText = barroString1;
    setTimeout(() => { const barroString2 = 'Judging from that expression I\'m guessing I should tell you';
    barrosSpeech.innerText = barroString2;}, 5000);
    setTimeout(() => {const barroString3 = 'Im the guardian of the amulet of the dead... obviously';
    barrosSpeech.innerText = barroString3}, 10000);
    setTimeout(() => {const barroString4 = 'I mean I cant exactly let you kill me... the amulet is the source of my immortality after all';
    barrosSpeech.innerText = barroString4}, 15000);
    setTimeout(() => {const barroString4 = 'Well... Good luck little crusader, you will need it'; 
    barrosSpeech.innerText = barroString4}, 20000)
    setTimeout(() => {barrosSpeech.innerText = '';}, 25000);
    //end event
    setTimeout(() => {
    undoAnimateCharacter(theChillBarro);
    currentEnemy = barro
    animateCharacter(currentEnemy);
    animateButtons();}, 27000);
}


//event listeners for all events
event1Check.addEventListener('change', startBattle);

event2Check.addEventListener('change', startBattle);

event3Check.addEventListener('change', startBattle);

event4Check.addEventListener('change', startBattle);

event5Check.addEventListener('change', startBattle);

event6Check.addEventListener('change', startBattle);

event7Check.addEventListener('change', startBattle);

event8Check.addEventListener('change', startBattle);

attackIcon.addEventListener('click', playersAttack);
armorIcon.addEventListener('click', playersArmor);