class character {
    constructor(name, hp, strength, defense, skill, speed, limitBreak){
    this.name = name;
    this.hp = hp;
    this.strength = strength;
    this.defense = defense;
    this.skill = skill;
    this.speed = speed;
    this.limitBreak = limitBreak;
    }
    attack (enemy){
        enemy.hp -= this.strength - enemy.defense
        if(enemy.hp <= 0){
            enemy.hp = 0;
        }
    }
};

//character creation: name, hp, strength, defense, skill, speed, limitBreak
 const warrior = new character("Gunter", 15, 2, 1, 1, 3, 0);
 const rogue = new character("Kaze", 7, 4, 4, 3, 6, 0);
 const lancer = new character("Selena", 15, 3, 1, 2, 2, 0);

//enemy select attack

//display health
const updateHealth=()=>{
    $('.player-health').append("Player HP: " + lancer.hp)
    $('.enemy-health').append("Enemy HP: " + warrior.hp)

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
    if(lancer.hp === 0){
        alert('You Died')
    };
    if(warrior.hp === 0){
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
        lancer.attack(warrior);
    }else if(playerClash === 4 && enemyClash !== 2){
        $('.messages').append("you dodged their attack!")
    }else if(playerClash === 4 && enemyClash === 2){
        $('.messages').append("you tried to dodge but failed")
        warrior.attack(lancer);
    }else if(playerClash !== enemyClash){
        $('.messages').append("you damage each other")
        lancer.attack(warrior)
        warrior.attack(lancer)
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

//Event Listener
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