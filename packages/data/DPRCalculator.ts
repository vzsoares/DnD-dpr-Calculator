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

export default class Attack {
  name: string;
  attack_bonus: number;
  damage_bonus: number;
  damage_dice: DiceSet;
  crit_dice: DiceSet;
  advantage_modifier: number;
  gwmsharp: boolean;
  crit_range: number;
  target_AC: number;

  constructor(
    name: string, // string, name of attack
    attack_bonus: number, // int, attack bonus, including all possible bonuses
    damage_bonus: number, // int, damage bonus, including all possible bonuses
    damage_dice: DiceSet, // DiceSet.
    crit_dice: DiceSet, // DiceSet.
    advantage_modifier: number, // int, set 1 for normal, set 2 for  advantage, set 3 for elven accuracy.
    gwmsharp: boolean, // int, Great Weapon Master, or Sharpshooter feat. set 0 for false, 1 for true.
    crit_range: number, // int, use n for 18-20, or 19 for 19-20, or 20 for standard crit chance.
    target_AC: number // int, the target's armor class
  ) {
    this.name = name;
    this.attack_bonus = attack_bonus;
    this.damage_bonus = damage_bonus;
    this.damage_dice = damage_dice;
    this.crit_dice = crit_dice;
    this.advantage_modifier = advantage_modifier;
    this.gwmsharp = gwmsharp;
    this.crit_range = crit_range;
    this.target_AC = target_AC;
  }

  getEffectiveAttackBonus() {
    if (this.gwmsharp == true) {
      return this.attack_bonus - 5;
    }
    return this.attack_bonus;
  }

  getEffectiveDamageBonus() {
    if (this.gwmsharp == true) {
      return this.damage_bonus + 10;
    }
    return this.damage_bonus;
  }

  getAverageFromDice() {
    return (
      p_hit(
        this.target_AC,
        this.getEffectiveAttackBonus(),
        this.advantage_modifier
      ) * this.damage_dice.getAverageRolls()
    );
  }

  getAverageFromBonus() {
    return (
      p_hit(
        this.target_AC,
        this.getEffectiveAttackBonus(),
        this.advantage_modifier
      ) * this.getEffectiveDamageBonus()
    );
  }

  getAverageFromCritFactor() {
    return (
      p_crit(this.crit_range, this.advantage_modifier) *
      (this.crit_dice.getAverageRolls() - this.damage_dice.getAverageRolls())
    );
  }

  getAverageTotal() {
    return (
      this.getAverageFromDice() +
      this.getAverageFromBonus() +
      this.getAverageFromCritFactor()
    );
  }
}

//--------------------------------//
//--- CLASS ATTACK DESCRIPTION ---//
//--------------------------------//
/*
    This class is used to instantiate DieRoll objects,
    which represent a single dice roll with along with
    modifiers for rerolling and minimum rolls.
*/

class Die {
  sides: number;
  reroll: number;
  minRoll: number;
  constructor(sides: number, reroll: number = 0, minRoll: number = 1) {
    this.sides = sides;
    this.reroll = reroll;
    this.minRoll = minRoll;
  }

  // Returns the average roll for a die
  // given its number of sides, minimum value to reroll once, and minimum roll.
  getAverageRoll(): number {
    if (this.reroll == 0) {
      return (T(this.sides) + T(this.minRoll - 1)) / this.sides;
    } else if (this.reroll > this.minRoll)
      return (
        (T(this.sides) +
          T(this.minRoll - 1) -
          this.reroll * this.minRoll -
          T(this.minRoll) +
          this.reroll * new Die(this.sides, 0, this.minRoll).getAverageRoll()) /
        this.sides
      );
    else this.reroll <= this.minRoll;
    return (
      (T(this.sides) +
        T(this.minRoll - 1) -
        this.reroll * this.minRoll +
        this.reroll * new Die(this.sides, 0, this.minRoll).getAverageRoll()) /
      this.sides
    );
  }
  getSides(): number {
    return this.sides;
  }
}

class DiceSet {
  dice: Die[];

  constructor(dice: {sides: number, reroll: number, minRoll: number, id: number}[]) {
    this.dice = []
    for (let i = 0; i < dice.length; i++) {
      this.dice.push(
        new Die(dice[i].sides, dice[i].reroll, dice[i].minRoll)
      );
    }
  }

  getAverageRolls(): number {
    let total = 0;
    for (let i = 0; i < this.dice.length; i++) {
      total += this.dice[i].getAverageRoll();
    }
    return total;
  }

  getDie(N: number): Die {
    return this.dice[N];
  }

  addDie(die: Die): void {
    this.dice.push(die);
  }

  length() {
    return this.dice.length;
  }
}

//------------------------//
//--- HELPER FUNCTIONS ---//
//------------------------//

function calculateDefaultCritDice(diceset: DiceSet): DiceSet {
  let dice: number[] = [];
  for (let i = 0; i < diceset.length() * 2; i++) {
    dice.push(diceset.getDie(i % diceset.length()).getSides());
  }
  return new DiceSet(dice);
}

// Returns the triangular number, T(N) = 1 + 2 + 3 + ... + N
function T(N: number) {
  return (N ** 2 + N) / 2;
}

// Returns the probability to hit an attack
// given the target's armor class, the attacker's attack bonus,
// and the attack's advantage modifier.
function p_hit(A: number, B: number, M = 1): number {
  if (A >= B + 20) return 1 - (1 - 0.05) ** M;
  else if (A <= B + 2) return 1 - (1 - 0.05) ** M;
  return 1 - (1 - (21 + B - A) / 20) ** M;
}

// Returns the probability of a critical hit
// given the attacker's critical range, and advantage modifier.
function p_crit(crit_range: number, adv_mod: number): number {
  return 1 - Math.pow(1 - (21 - crit_range) / 20, adv_mod);
}

//-------------------//
//--- TEST SCRIPT ---//
//-------------------//

/*let my_attack = new Attack(
    "Holy Attack",
    9,
    5,
    new DiceSet([ { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905668944 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669096 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669215 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669341 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669453 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669573 }, { "sides": 8, "reroll": 1, "minRoll": 1, "id": 1654905669813 }, { "sides": 8, "reroll": 1, "minRoll": 1, "id": 1654905669927 } ]),
    new DiceSet([ { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905668944 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669096 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669215 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669341 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669453 }, { "sides": 12, "reroll": 1, "minRoll": 1, "id": 1654905669573 }, { "sides": 8, "reroll": 1, "minRoll": 1, "id": 1654905669813 }, { "sides": 8, "reroll": 1, "minRoll": 1, "id": 1654905669927 } ]),
    1,
    false,
    20,
    15
)

console.log(my_attack.crit_dice.getAverageRolls());
console.log("\n          Chance to Hit: " + p_hit(15, 9, 1));
console.log("       Damage From Dice: " + my_attack.getAverageFromDice());
console.log("      Damage From Bonus: " + my_attack.getAverageFromBonus());
console.log("Damage From Crit Factor: " + my_attack.getAverageFromCritFactor());
console.log("           Damage Total: " + my_attack.getAverageTotal());*/
