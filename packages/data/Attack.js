// @ts-nocheck
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

class Attack {
  constructor(
    name, // string, name of attack
    damage_bonus, // int, damage bonus, including all possible bonuses
    attack_bonus, // int, attack bonus, including all possible bonuses
    damage_dice, // array of ints, each representing a single die's number of sides.
    crit_dice, // array of ints, each representing a single die's number of sides.
    advantage_modifier, // int, set 1 for normal, set 2 for  advantage, set 3 for elven accuracy.
    gwmsharp, // int, Great Weapon Master, or Sharpshooter feat. set 0 for false, 1 for true.
    crit_range, // int, use n for 18-20, or 19 for 19-20, or 20 for standard crit chance.
    target_AC // int, the target's armor class
  ) {
    this.name = name;
    this.damage_bonus = damage_bonus;
    this.attack_bonus = attack_bonus;
    this.damage_dice = damage_dice;
    this.crit_dice = crit_dice;
    this.advantage_modifier = advantage_modifier;
    this.gwmsharp = gwmsharp;
    this.crit_range = crit_range;
    this.target_AC = target_AC;
  }

  effective_attack_bonus() {
    if (gwmsharp) return attack_bonus - 5;
    return attack_bonus;
  }

  effective_damage_bonus() {
    if (gwmsharp) return damage_bonus + 10;
    return damage_bonus;
  }

  calculate_average_total_attack_damage() {
    return (
      this.calculate_average_damage_from_dice() +
      this.calculate_average_damage_from_bonus() +
      this.calculate_average_damage_from_crit_factor()
    );
  }

  calculate_average_damage_from_dice() {
    return (
      p_hit(
        this.target_AC,
        this.effective_attack_bonus(),
        this.advantage_modifier
      ) * average_rolls(this.damage_dice)
    );
  }

  calculate_average_damage_from_bonus() {
    return (
      p_hit(
        this.target_AC,
        this.effective_attack_bonus(),
        this.advantage_modifier
      ) * this.effective_damage_bonus()
    );
  }

  calculate_average_damage_from_crit_factor() {
    return (
      p_crit(this.crit_range, this.advantage_modifier) *
      (average_rolls(this.crit_dice) - average_rolls(this.damage_dice))
    );
  }
}

class DieRoll {
  constructor(sides, reroll, min_roll) {
    this.sides = sides;
    this.reroll = reroll;
    this.min_roll = min_roll;
  }

  // Returns the average roll for a die
  // given its number of sides, minimum value to reroll once, and minimum roll.
  average_roll() {
    if (reroll == 0) {
      return (T(sides) + T(min_roll - 1)) / sides;
    } else if (reroll > min_roll)
      return (
        (T(sides) +
          T(min_roll - 1) -
          reroll * min_roll -
          T(min_roll) +
          reroll * d(sides, 0, min_roll)) /
        sides
      );
    else if (reroll <= min_roll)
      return (
        (T(sides) +
          T(min_roll - 1) -
          reroll * min_roll +
          reroll * d(sides, 0, min_roll)) /
        sides
      );
  }
}

//------------------------//
//--- HELPER FUNCTIONS ---//
//------------------------//

// Returns the sum of the averages of all rolls in a dice set.
function average_rolls(dice) {
  return undefined;
}

// Returns the sum of the averages of all rolls in a dice set
// given a dice set, which values to reroll,
function average_rolls_rerolls(dice, reroll_values, max_rerolls = 0) {
  return undefined;
}

function T(N) {
  return (N ** 2 + N) / 2;
}

// Returns the probability to hit an attack
// given the target's armor class, the attacker's attack bonus,
// and the attack's advantage modifier.
function p_hit(A, B, M = 1) {
  if (A >= B + 20) return 1 - (1 - 0.05) ** M;
  else if (A <= B + 2) return 1 - (1 - 0.05) ** M;
  return 1 - (1 - (21 + B - A) / 20) ** M;
}

// Returns the probability of a critical hit
// given the attacker's critical range, and advantage modifier.
function p_crit(crit_range, adv_mod) {
  return 1 - Math.pow(1 - (21 - crit_range) / 20, adv_mod);
}

//-------------------//
//--- TEST SCRIPT ---//
//-------------------//

console.log(d(6, 3, 6));
