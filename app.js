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
};

//character creation: name, hp, strength, defense, skill, speed, limitBreak
 const warrior = new character("Gunter", 10, 6, 5, 1, 3, 0);
 const rogue = new character("Kaze", 7, 4, 4, 3, 6, 0);
 const lancer = new character("Selena", 6, 5, 4, 2, 2, 0);


