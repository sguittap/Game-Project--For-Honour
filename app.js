class character {
    constructor(name, hp, strength, defense, skill, speed, type){
    this.name = name;
    this.hp = hp;
    this.strength = strength;
    this.defense = defense;
    this.skill = skill;
    this.speed = speed;
    this.type = type;
    }
    attack (enemy){
        enemy.hp -= this.strength - enemy.defense
        if(enemy.hp <= 0){
            enemy.hp = 0;
        }
    }
};

//character creation: name, hp, strength, defense, skill, speed, limitBreak
 const warrior = new character("Gunter", 15, 2, 1, 1, 3, 'warrior');
 const rogue = new character("Kaze", 7, 4, 4, 3, 6, 'rogue');
 const lancer = new character("Selena", 15, 3, 1, 2, 2, 'lancer');
 //character select Array
 const charSelection = [warrior, rogue, lancer];

 //character selection
 let playerChar = 0;
 
//random enemy generate
const enemyChar = charSelection[Math.floor(Math.random()*charSelection.length)];


//display health
const updateHealth=()=>{
    $('.player-health').append("Player HP: " + playerChar.hp)
    $('.enemy-health').append("Enemy HP: " + enemyChar.hp)

}
//computer clashNumber
let enemyClash = 0;
const compChoice=()=>{
    const random =  Math.floor(Math.random() * 4) +1;
    if(random === 1){
        enemyClash = 1;
    };
    if(random === 2){
        enemyClash = 2;
    };
    if(random === 3){
        enemyClash = 3;
    };
    if(random === 4){
        enemyClash = 4;
    };

};

//player clashNumber
let playerClash = 0;

//WinOrLose 
const checkWinOrLose=()=>{
    if(playerChar.hp === 0){
        alert('You Died')
    };
    if(enemyChar.hp === 0){
        alert('You won!')
    }
}

//battle function
const battle=()=>{
    compChoice()
    if(playerClash === 4 && enemyClash === 4){
        $('.messages').append("Both of you took defensive positions");
    }else if(enemyClash === 4 && playerClash !== 2){
        $('.messages').append("enemy dodged your attack!")
    }else if(enemyClash === 4 && playerClash === 2){
        $('.messages').append("enemy tried to dodge but failed")
        playerChar.attack(enemyChar);
    }else if(playerClash === 4 && enemyClash !== 2){
        $('.messages').append("you dodged their attack!")
    }else if(playerClash === 4 && enemyClash === 2){
        $('.messages').append("you tried to dodge but failed")
        enemyChar.attack(playerChar);
    }else if(playerClash !== enemyClash){
        $('.messages').append("you damage each other")
        playerChar.attack(enemyChar)
        enemyChar.attack(playerChar)
    }else{
        $('.messages').append("Your swords clashed, no damage dealt.")
    }
    updateHealth();
    checkWinOrLose();
    console.log(playerClash, enemyClash)
};

//clear health and message display
const clearDisplays=()=>{
    $('.player-health').empty()
    $('.enemy-health').empty()
    $('.messages').empty()
};
//Create Arena
const createArena=()=>{
$('.container-fluid').empty()
//create health bars
$('.container-fluid').append('<div class="row health-bars"></div>')
$('.health-bars').append('<div class="col player-health">Player HP:</div>')
$('.health-bars').append('<div class="col enemy-health">Enemy HP:</div>')
//create arena
$('.container-fluid').append('<div class="col-md-12 backgroundImg2"></div>')
$('.backgroundImg2').addClass("backgroundImg")
$('.backgroundImg2').append('<div class="row top-half"></div>')
$('.backgroundImg2').append('<div class="row bottom-half"></div>')
$('.top-half').addClass("split-img")
$('.bottom-half').addClass("split-img2")
$('.split-img2').append('<div class="col-md-4 player-img"></div>')
$('.split-img2').append('<div class="col-md-4 "></div>')
$('.split-img2').append('<div class="col-md-4 enemy-img"></div>')
//add player selection to the arena
console.log(playerChar.type)
console.log(enemyChar.type);
//
//create action buttons
$('.container-fluid').append('<div class="row choices2"></div>')
$('.choices2').append('<div class="col-sm-6 attack-choice"></div>')
$('.attack-choice').append('<button type="button" class="btn btn-primary-left">LEFT</button>')
$('.attack-choice').append('<button type="button" class="btn btn-primary-top">TOP</button>')
$('.attack-choice').append('<button type="button" class="btn btn-primary-right">RIGHT</button>')
$('.attack-choice').append('<button type="button" class="btn btn-primary-Dodge">Dodge</button>')
//create message bar
$('.choices2').append('<div class="col-sm-6 messages">Choose your Attack!</div>')

//Battle Event Listener
$('.btn-primary-left').on("click", function(){
    playerClash = 1;
    clearDisplays();
    battle();
});

$('.btn-primary-top').on("click", function(){
    playerClash = 2;
    clearDisplays();
    battle();
});

$('.btn-primary-right').on("click", function(){
    playerClash = 3;
    clearDisplays();
    battle();
});

$('.btn-primary-select').on("click", function(){
    playerClash = 4;
    clearDisplays();
    battle();
});
};

//pickSelector cycles through characters to choose
let characterSelectorPosition = 1;

const checkPosition=()=>{
    if(characterSelectorPosition === 1){
        $(".player-display").addClass("warrior")
        playerChar = warrior;
    }
    else if(characterSelectorPosition === 2){
        $(".player-display").addClass("rogue")
        playerChar = rogue
    }
    else{
        $(".player-display").addClass("lancer")
        playerChar = lancer
    }
};
const pickSelectorLeft=()=>{
    if(characterSelectorPosition <= 1){
        characterSelectorPosition =1
    }else{
        characterSelectorPosition -= 1;
    }
    checkPosition();
};
const pickSelectorRight=()=>{
    if(characterSelectorPosition >= 3){
        characterSelectorPosition = 3
    }else{
        characterSelectorPosition += 1;
    }
    checkPosition();
};
const pickedCharacter=()=>{
    createArena();
    
}

//clear hero class from player-display window
const clearHero=()=>{
    $('.player-display').removeClass("warrior")
    $('.player-display').removeClass("rogue")
    $('.player-display').removeClass("lancer")
};

//character select buttons
$('.btn-primary-leftChoice').on("click", function(){
    clearHero()
    pickSelectorLeft();
    console.log("pick left")
    console.log(characterSelectorPosition)
});
$('.btn-primary-rightChoice').on("click", function(){
    clearHero();
    pickSelectorRight();
    console.log("pick right")
    console.log(characterSelectorPosition)
});
$('.btn-primary-select').on("click", function(){
    pickedCharacter();
});

