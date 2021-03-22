const crusaderSprite = document.querySelector('.crusadersprite1');
const skellyRangerSprite = document.querySelector('.skellyRanger');
const skellyBruteSprite = document.querySelector('.skellyBrute');
const barroChillSprite = document.querySelector('.barroChill');
const barroMadSprite = document.querySelector('.barroMad');
const event1Check = document.querySelector('.event1__checkbox');

console.log(crusaderSprite);
console.log(event1Check);

startBattle = () => {
    if(event1Check.checked === true){
        crusaderSprite.style.width = '741px';
        crusaderSprite.style.height = '741px';
        crusaderSprite.style.transform = '.5';
        crusaderSprite.style.opacity = '1';
    }else {
        crusaderSprite.style.width = '0';
        crusaderSprite.style.opacity = '0';
    }
}

event1Check.addEventListener('change', startBattle);

console.log(skellyBruteSprite, skellyRangerSprite, barroChillSprite, barroMadSprite);