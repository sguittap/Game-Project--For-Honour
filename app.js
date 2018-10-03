

class character {
    constructor(name,type, magicUser, hp, strength, defense, skill, speed, spAtk, spDef, ){
    this.name = name;
    this.hp = hp;
    this.type = type;
    this.magicUser = magicUser;
    this.originalHp = hp;
    this.strength = strength;
    this.defense = defense;
    this.skill = skill;
    this.speed = speed;
    this.spAtk = spAtk;
    this.spDef = spDef;
    }
    attack (enemy){
        //check skill hit
        if(Math.floor(Math.random()*10) < this.skill){
            if(this.magicUser === true){
                enemy.hp -= this.spAtk
                $('.messages').append(`${this.name} landed a critical blow in their attack! `);
                if(enemy.hp <= 0){
                    enemy.hp = 0;
                }return;
            
            }else{ 
                enemy.hp -= this.strength
                $('.messages').append(`${this.name} landed a critical blow in their attack! `);
                if(enemy.hp <= 0){
                    enemy.hp = 0;
                }return; 
            }
        }

        //check speed hit
        else if(Math.floor(Math.random()*10) < this.speed){
            if(this.magicUser === true){
                enemy.hp -= (this.spAtk + this.spAtk) - enemy.spDef
                $('.messages').append(`${this.name} striked twice in their attack! `);
                if(enemy.hp <= 0){
                    enemy.hp = 0;
                }return;
            
            }else{
            enemy.hp -= (this.strength + this.strength) - enemy.defense
            $('.messages').append(`${this.name} striked twice in their attack! `);
                if(enemy.hp <= 0){
                    enemy.hp = 0;
                }return;
            }
        }   
        //normal attack
        else{ 
            
            if(this.magicUser === true){
                enemy.hp -= this.spAtk - enemy.spDef
                if(enemy.hp <= 0){
                    enemy.hp = 0;
                }return;
            }
            else{
            enemy.hp -= this.strength - enemy.defense
            if(enemy.hp <= 0){
                enemy.hp = 0;
                }
            }    
        }
    }
};

//character creation: name, hp, strength, defense, skill, speed, special attack, special def, 
 const knight = new character("Hector",'knight', false, 20, 5, 4, 2, 1, 1, 1, );
 const rogue = new character("Kaze",'rogue',false, 20, 4, 1, 3, 4, 1, 3, );
 const archer = new character("Selena",'archer', false, 20, 4, 2, 2, 2, 1, 2, );
 const mage = new character("Linde",'mage', true, 20, 1, 2, 3, 2, 4, 4, )
 const rider = new character("Minerva",'rider', false, 20, 4, 3, 2, 3, 1, 3, )
 //character select Array
 const charSelection = [knight, rogue, archer, mage, rider];

 //character selection
 let playerChar = 0;
 
//random enemy generate
//spread operator creates a COPY of the object
const enemyChar = Object.assign(charSelection[Math.floor(Math.random()*charSelection.length)]);

//update health bars
const updateHealth=()=>{
    const updatePlayerHealthBar = () => {
        let numHp = (playerChar.hp / playerChar.originalHp) * 100;
        let percentHp = `${numHp}%`;
        $('.playerBar').css("width", percentHp);
    }
updatePlayerHealthBar();

    const updateEnemyHealthBar = () => {
        let numHp = (enemyChar.hp / enemyChar.originalHp) * 100;
        let percentHp = `${numHp}%`;
        $('.enemyBar').css("width", percentHp);
    }
updateEnemyHealthBar();
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
        $('.messages,').empty()
        $('.player-hp').empty()
        $('.enemy-hp').empty()
        $('.player-img').removeClass(`${playerChar.type}Attack`)
        $('.enemy-img').removeClass(`${enemyChar.type}Attack`)

    };
    if(enemyChar.hp === 0){
        alert('You won!')
        $('.messages').empty()
        $('.player-health').empty()
        $('.enemy-health').empty()
        $('.enemy-img').empty();
        $('.player-img').removeClass(`${playerChar.type}Attack`)
        $('.enemy-img').removeClass(`${enemyChar.type}Attack`)
    }
}


//battle function
const battle=()=>{
    compChoice()
    if(playerClash === 4 && enemyClash === 4){
        $('.messages').append("Both of you took defensive positions");
    }else if(enemyClash === 4 && playerClash !== 2){
        $('.messages').append("Enemy dodged your attack!")
    }else if(enemyClash === 4 && playerClash === 2){
        playerChar.attack(enemyChar);
        $('.messages').append("Enemy tried to dodge but failed")
    }else if(playerClash === 4 && enemyClash !== 2){
        $('.messages').append("You dodged their attack!")
    }else if(playerClash === 4 && enemyClash === 2){
        enemyChar.attack(playerChar)
        $('.messages').append("You tried to dodge but failed")
    }else if(playerClash !== enemyClash){
        playerChar.attack(enemyChar)
        enemyChar.attack(playerChar)
        $('.messages').append("Blood was shed..")
    }else{
        $('.messages').append("You clashed weapons, no damage dealt.")
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

//Animate character to arena
const animatePlayerHero=()=>{

    for(let i=0; i<charSelection.length; i++){
        if(playerChar === charSelection[i]){
            $(".player-img").addClass(`${playerChar.type}Attack`).addClass("mirror")
        }
    }
}
const animateEnemyHero=()=>{
    for(let i=0; i<charSelection.length; i++){
        if(enemyChar === charSelection[i]){
            $(".enemy-img").addClass(`${enemyChar.type}Attack`)
        }
    }
}

//Create Arena
const createArena=()=>{
$('.container-fluid').empty()
//create health bars
$('.container-fluid').append('<div class="row name-display"></div>')
$('.name-display').append(`<div class="col player-name">${playerChar.name} the ${playerChar.type}</div>`)
$('.name-display').append(`<div class="col enemy-name">${enemyChar.name} the ${enemyChar.type}</div>`)
$('.container-fluid').append('<div class="row health-bars"></div>')
$('.health-bars').append('<div class="col health-bar1">')
$('.health-bar1').append('<div class="progress"><div class="progress-bar playerBar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>')
$('.health-bars').append('<div class="col health-bar2">')
$('.health-bar2').append('<div class="progress"><div class="progress-bar enemyBar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>')
updateHealth();
//create arena
$('.container-fluid').append('<div class="row arenaDisplay"></div>')
$('.arenaDisplay').append('<div class="col backgroundImg2"></div>')
$('.backgroundImg2').addClass("backgroundImg2")
$('.backgroundImg2').append('<div class="row bottom-half"></div>')
$('.bottom-half').addClass("split-img2")
$('.split-img2').append('<div class="col-md-3 "></div>')
$('.split-img2').append('<div class="col-md-3 player-img"></div>')
$('.split-img2').append('<div class="col-md-3 enemy-img"></div>')
$('.split-img2').append('<div class="col-md-3 "></div>')
//dislay heros in arena
animatePlayerHero();
animateEnemyHero();
//create action buttons
$('.container-fluid').append('<div class="row choices2"></div>')
$('.choices2').append('<div class="col-sm-6 attack-choice"></div>')
$('.attack-choice').append('<button type="button" class="btn btn-primary-left btn-sm">LEFT</button>')
$('.attack-choice').append('<button type="button" class="btn btn-primary-top btn-sm">TOP</button>')
$('.attack-choice').append('<button type="button" class="btn btn-primary-right btn-sm">RIGHT</button>')
$('.attack-choice').append('<button type="button" class="btn btn-primary-dodge btn-sm">Dodge</button>')
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

$('.btn-primary-dodge').on("click", function(){
    playerClash = 4;
    clearDisplays();
    battle();
});
};

//display stats
const displayStatsOnScreen=()=>{
    $('.name-stat').append(playerChar.name)
    $('.hp-stat').append(playerChar.hp)
    $('.strength-stat').append(playerChar.strength)
    $('.defense-stat').append(playerChar.defense)
    $('.skill-stat').append(playerChar.skill)
    $('.speed-stat').append(playerChar.speed)
    $('.spAtk-stat').append(playerChar.spAtk)
    $('.spDef-stat').append(playerChar.spDef)
    $('.typeClass').append(playerChar.type)
};

//pickSelector cycles through characters to choose
let characterSelectorPosition = 0;
const checkPosition=()=>{
    if(characterSelectorPosition === 1){
        $(".player-display").addClass("knight")
        playerChar = knight;
        displayStatsOnScreen();
    }
    else if(characterSelectorPosition === 2){
        $(".player-display").addClass("rogue")
        playerChar = rogue
        displayStatsOnScreen();
    }
    else if(characterSelectorPosition === 3){
        $(".player-display").addClass("mage")
        playerChar = mage
        displayStatsOnScreen();
    }
    else if(characterSelectorPosition === 4){
        $(".player-display").addClass("rider")
        playerChar = rider
        displayStatsOnScreen();
    }
    else{
        $(".player-display").addClass("archer")
        playerChar = archer
        displayStatsOnScreen()
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
    if(characterSelectorPosition >= 5){
        characterSelectorPosition = 5
    }else{
        characterSelectorPosition += 1;
    }
    checkPosition();
};
const pickedCharacter=()=>{
    if(characterSelectorPosition > 0){
        createArena();
    }else{
        $(".messages").text("Choose LEFT or RIGHT to select a Hero!")

    }
    

};

//clear hero class from player-display window
const clearHero=()=>{
    $('.player-display').removeClass("knight")
    $('.player-display').removeClass("rogue")
    $('.player-display').removeClass("archer")
    $('.player-display').removeClass("mage")
    $('.player-display').removeClass("rider")
    $('.name-stat').text("Name: ")
    $('.hp-stat').text("Health: ")
    $('.strength-stat').text("Strength: ")
    $('.defense-stat').text("Defense: ")
    $('.skill-stat').text("Skill: ")
    $('.speed-stat').text("Speed: ")
    $('.spAtk-stat').text("spAtk: ")
    $('.spDef-stat').text("spDef: ")
    $('.typeClass').text("Class: ")
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

