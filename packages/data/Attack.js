//--------------------------------//
//--- CLASS ATTACK DESCRIPTION ---//
//--------------------------------//
/*
    This class is used to instantiate Attack objects,
    which represent instances of D&D 5e weapon attacks.
    These objects can be used to store data and perform
    statistical analysis about these weapons attacks such
    as calculating the average damage per round.
*/

export default class Attack {
    constructor(
        name,                   // string, name of attack
        damage_bonus,           // int, damage bonus, including all possible bonuses
        attack_bonus,           // int, attack bonus, including all possible bonuses
        damage_dice,            // array of ints, each representing a single die's number of sides.
        crit_dice,              // array of ints, each representing a single die's number of sides.
        advantage_modifier,     // int, set 1 for normal, set 2 for  advantage, set 3 for elven accuracy.
        gwmsharp,               // int, Great Weapon Master, or Sharpshooter feat. set 0 for false, 1 for true.
        crit_range,             // int, use n for 18-20, or 19 for 19-20, or 20 for standard crit chance.
        target_AC               // int, the target's armor class
    ) {
        this.name                = name
        this.damage_bonus        = damage_bonus;
        this.attack_bonus        = attack_bonus;
        this.damage_dice         = damage_dice;
        this.crit_dice           = crit_dice;
        this.advantage_modifier  = advantage_modifier;
        this.gwmsharp            = gwmsharp;
        this.crit_range          = crit_range;
        this.target_AC           = target_AC;
        if(gwmsharp) {
            this.effective_attack_bonus = attack_bonus - 5;
            this.effective_damage_bonus = damage_bonus + 10;
        }
        else {
            this.effective_damage_bonus = damage_bonus;
            this.effective_attack_bonus = attack_bonus;
        }
    }

    calculate_average_total_attack_damage() {
        return  this.calculate_average_damage_from_dice()
              + this.calculate_average_damage_from_bonus()
              + this.calculate_average_damage_from_crit_factor();
    }

    calculate_average_damage_from_dice() {
        return p_hit_mod(this.target_AC, this.effective_attack_bonus, this.advantage_modifier) * 
        calculate_average_dice_rolls(this.damage_dice);
    }

    calculate_average_damage_from_bonus() {
        return p_hit_mod(this.target_AC, this.effective_attack_bonus, this.advantage_modifier) * 
        this.effective_damage_bonus;
    }

    calculate_average_damage_from_crit_factor() {
        return p_crit(this.crit_range, this.advantage_modifier) * 
        (calculate_average_dice_rolls(this.crit_dice) - calculate_average_dice_rolls(this.damage_dice));
    }
}

//------------------------//
//--- HELPER FUNCTIONS ---//
//------------------------//

// Returns the sum of the averages of all rolls in a dice set.
function calculate_average_dice_rolls(dice) {
    let sum = 0;
    let i = 0;
    for (i = 0; i < dice.length; i++) {
        sum += d(dice[i]);
    }
    return sum;
}

// Returns the average roll for a die, given its number of sides, for example d(8) = 4.5
function d(sides) {
    return sides / 2 + 0.5
}

// Returns the probability to hit an attack 
// given the target's armor class, the attacker's attack bonus.
function p_hit(A, B) {
    if (A >= B + 20) {
        return 0.05;
    }
    else if (A <= B + 2) {
        return 0.95;
    }
    else {
        return (21 + B - A) / 20;
    }
}

// Returns the probability of a critical hit
// given the attacker's critical range, and advantage modifier.
function p_crit(crit_range, adv_mod) {
    return 1 - Math.pow(1 - (21 - crit_range)/20, adv_mod);
}


// Returns the probability to hit an attack
// given the target's armor class, the attacker's attack bonus, 
// and the attack's advantage modifier.
function p_hit_mod(AC, bonus, adv_mod) {
    return 1 - Math.pow(1 - p_hit(AC, bonus), adv_mod);
}


//-------------------//
//--- TEST SCRIPT ---//
//-------------------//

/*let attack = new Attack(
    "Glaive Attack", 
    5, 
    9, 
    [10], 
    [10, 10], 
    2, 
    1, 
    20, 
    15);

console.log(attack.calculate_average_damage_from_dice());
console.log(attack.calculate_average_damage_from_bonus());
console.log(attack.calculate_average_damage_from_crit_factor());
console.log(attack.calculate_average_total_attack_damage());*/