// @ts-nocheck

//-------------------------------------------//
//--- CLASS SavingThrowAttack DESCRIPTION ---//
//-------------------------------------------//
/*
    This class is used to instantiate SavingThrowAttack objects, 
    which represent instances of D&D 5e attacks that require saving throw,
    for example, Fireball, Spirit Guardians, etc...
    These objects can be used to store data and perform
    statistical analysis about these attacks such
    as calculating the average damage per round.
*/

class SavingThrowAttack {
  name: string; // SavingThrow name
  save_dc: number; // SavingThrow difficulty class
  save_stat: string; // STR, DEX, CON, INT, WIS, OR CHA
  damage_dice: DiceSet; // damage dice
  damage_bonus: number; // bonus static damage
  target_save_bonus: number; // enemy SavingThrow bonus
  target_save_advantage_modifier: number; // 0 for disadvantage, 1 for standard roll, 2 for advantage
  save_for_half: boolean; // does the attack deal damage on failed save? for example, fireball does, disintegrate doesn't

  constructor(
    name: string,
    save_dc: number,
    save_stat: string,
    damage_dice: DiceSet,
    damage_bonus: number,
    target_save_bonus: number,
    target_save_advantage_modifier: number,
    save_for_half: boolean
  ) {
    this.name = name;
    this.save_dc = save_dc;
    this.save_stat = save_stat;
    this.damage_dice = damage_dice;
    this.damage_bonus = damage_bonus;
    this.target_save_bonus = target_save_bonus;
    this.target_save_advantage_modifier = target_save_advantage_modifier;
    this.save_for_half = save_for_half;
  }

  getDPR() {
    // TODO
  }

  getDamageOnFailedSave() {
    // TODO
  }
}

//--------------------------------//
//--- CLASS Attack DESCRIPTION ---//
//--------------------------------//
/*
    This class is used to instantiate Attack objects,
    which represent instances of D&D 5e attack rolls.
    These objects can be used to store data and perform
    statistical analysis about these attacks such
    as calculating the average damage per round.
*/

export default class Attack {
  name: string; // custom name for the attack
  attack_bonus: number; // attack roll bonus, also known as hit/dc
  damage_bonus: number; // damage roll bonus, for example bonus for strength or magic items
  damage_dice: DiceSet; // array of die, for example 2d6 for a greatsword
  crit_dice: DiceSet; // array of die for when attack is critical hit, for example 4d6 for a greatsword plus 6d8 for divine smite used only when attack is a crit
  advantage_modifier: 0 | 1 | 2 | 3; // 0 for disadvantage, 1 for standard roll, 2 for advantage and 3 for elven accuracy
  gwmsharp: boolean; // 0 for no, 1 for yes. adds plus 10 to damage bonus, and reduces 5 from attack bonus
  crit_range: number; // 20 for crit on 20 only. 19 for crit range of 19-20
  target_AC: number; // target's armor class

  constructor(
    name: string,
    attack_bonus: number,
    damage_bonus: number,
    damage_dice: DiceSet,
    crit_dice: DiceSet,
    advantage_modifier: number,
    gwmsharp: boolean,
    crit_range: number,
    target_AC: number
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

  // Returns the effective attack bonus to account for great weapon master (or sharpshooter).
  getEffectiveAttackBonus() {
    return this.gwmsharp == true ? this.attack_bonus - 5 : this.attack_bonus;
  }

  // Returns the effective damage bonus to account for great weapon master (or sharpshooter).
  getEffectiveDamageBonus() {
    return this.gwmsharp == true ? this.damage_bonus + 10 : this.damage_bonus;
  }

  // Returns the average damage from dice rolls on normal hit.
  getAverageDiceDMG() {
    let tempdice: Die[] = []; // create empty array

    // instantiate Die objects
    for (let index = 0; index < this.damage_dice?.length; index++) {
      tempdice.push(
        new Die(
          this.damage_dice[index].sides,
          this.damage_dice[index].reroll,
          this.damage_dice[index].minRoll
        )
      );
    }

    // instantiate DiceSet object
    let diceset = new DiceSet(tempdice);
    return diceset.getAverageTotal();
  }

  // Returns the average damage from dice rolls on a critical hit.
  getAverageCritDiceDMG() {
    let tempcritdice: Die[] = []; // create empty array

    // instantiate Die objects
    for (let index = 0; index < this.crit_dice?.length; index++) {
      tempcritdice.push(
        new Die(
          this.crit_dice[index].sides,
          this.crit_dice[index].reroll,
          this.crit_dice[index].minRoll
        )
      );
    }

    // instantiate DiceSet object
    let crit_diceset = new DiceSet(tempcritdice);
    return crit_diceset.getAverageTotal();
  }

  // Returns the average damage from dice only ACCOUNTING FOR CHANCE TO HIT.
  // For example, if your chance to hit is 65% and you are attacking with a greatsword with advantage,
  // your average damage will be (1 - (1 - 0.65) ^ 2) * (2 * 3.5) = 6.1425
  getDiceDPR() {
    return this.getAverageDiceDMG() * p_hit(this.target_AC, this.getEffectiveAttackBonus(), this.advantage_modifier);
  }

  // Returns the average damage from bonus only, ACCOUNTING FOR CHANCE TO HIT.
  // For example if chance to hit is 65% and you have a damage bonus of 5 and you are attacking with elven accuracy,
  // your damage will be (1 - (1 - 0.65) ^ 3) * 5 = 4.785625
  getDmgBonusDPR() {
    return this.getEffectiveDamageBonus() * p_hit(this.target_AC, this.getEffectiveAttackBonus(), this.advantage_modifier);
  }

  // Returns the average damage PER ATTACK derived from critical hits.
  // THIS IS NOT A CALCULATION OF THE AVERAGE DAMAGE DEALT BY A CRITICAL HIT.
  // For example, if chance to hit is 65%, you are attacking with a greatsword, you have advantage,
  // you crit on 19-20, and you use 3rd level smite only on crits.
  // Your chance to crit will then be 1 - (1 - 0.10) ^ 2 = 0.19 = 19%
  // To find the damage you multiply the chance to crit by all the EXTRA DAMAGE that you would get from the attack.
  // the EXTRA DAMAGE of this attack would be (2 * 3.5 + 6 * 4.5) = 34
  // The final result returned will then be 0.19 * 34 = 6.46
  getAverageCritFactorDMG() {
    let tempdice: Die[] = []; // create empty array
    let tempcritdice: Die[] = []; // create empty array

    // instantiate die objects
    for (let index = 0; index < this.damage_dice?.length; index++) {
      tempdice.push(
        new Die(
          this.damage_dice[index].sides,
          this.damage_dice[index].reroll,
          this.damage_dice[index].minRoll
        )
      );
    }

    // instantiate die objects
    for (let index = 0; index < this.crit_dice?.length; index++) {
      tempcritdice.push(
        new Die(
          this.crit_dice[index].sides,
          this.crit_dice[index].reroll,
          this.crit_dice[index].minRoll
        )
      );
    }

    // instantiate DiceSet objects
    let damage_diceset = new DiceSet(tempdice);
    let crit_diceset = new DiceSet(tempcritdice);

    return (
      p_crit(this.crit_range, this.advantage_modifier) *
      (crit_diceset.getAverageTotal() - damage_diceset.getAverageTotal())
    );
  }

  // Returns the average damage dealt by the attack on a normal hit.
  getAverageDMG() {
    return this.getAverageDiceDMG() + this.getEffectiveDamageBonus();
  }

  // Returns the average damage dealt by the attack on a critical hit.
  getAverageCriticalDMG() {
    return this.getAverageCritDiceDMG() + this.getEffectiveDamageBonus();
  }

  // Returns the average damage per turn dealt by this attack
  getDPR() {
    return (
      this.getDiceDPR() + this.getDmgBonusDPR() + this.getAverageCritFactorDMG()
    );
  }
  p_hit() {
    return p_hit(
      this.target_AC,
      this.getEffectiveAttackBonus(),
      this.advantage_modifier
    );
  }
}

//-----------------------------//
//--- CLASS DIE DESCRIPTION ---//
//-----------------------------//
/*
    This class is used to instantiate Die objects,
    which represent a single dice roll with along with
    modifiers for rerolling and minimum rolls.
    NOTE: Rerolling more than once is not supported.
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
  // given its number of sides, minimum value to reroll ONCE, and minimum roll.
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
}

//---------------------------------//
//--- CLASS DiceSet DESCRIPTION ---//
//---------------------------------//
/*
    This class represents a collection of Die Objects
*/

class DiceSet {
  dice: Die[]; // Die object array

  constructor(
    dice: { sides: number; reroll: number; minRoll: number; id: number }[]
  ) {
    this.dice = [];
    for (let i = 0; i < dice.length; i++) {
      this.dice.push(new Die(dice[i].sides, dice[i].reroll, dice[i].minRoll));
    }
  }

  // Returns the average total from the dice set rolls
  getAverageTotal(): number {
    let total = 0;
    for (let i = 0; i < this.dice.length; i++) {
      total += this.dice[i].getAverageRoll();
    }
    return total;
  }

  // Returns a Die object from the DiceSet given an index.
  getDie(N: number): Die {
    return this.dice[N];
  }

  // Adds a Die object to the DiceSet.
  addDie(die: Die): void {
    this.dice.push(die);
  }

  // Returns the the number of dice in the DiceSet.
  length() {
    return this.dice.length;
  }
}

//------------------------//
//--- HELPER FUNCTIONS ---//
//------------------------//

// Returns a DiceSet containing double the amount of dice in the parameter passed in the function call.
function calculateDefaultCritDiceSet(diceset: DiceSet): DiceSet {
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

// Returns the probability to pass a saving throw
// given the difficulty class, your bonus, and your advantage modifier respectively.
// use M = 0 for disadvantage, 1 for standard, 2 for advantage.
function p_save(DC: number, B: number, M = 1) {
  return M < 1 ? ((21 + B - DC) / 20) ** 2 : 1 - (1 - (21 + B - DC) / 20) ** M;
}

// Returns the probability to hit an attack
// given the target's armor class, the attacker's attack bonus,
// and the attack's advantage modifier respectively.
// use M = 0 for disadvantage, 1 for standard, 2 for advantage, 3 for elven accuracy.
export function p_hit(A: number, B: number, M = 1): number {
  if (A >= B + 20) {
    return M < 1 ? 0.05 ** 2 : 1 - (1 - 0.05) ** M;
  } else if (A <= B + 2) {
    return M < 1 ? 0.95 ** 2 : 1 - (1 - 0.95) ** M;
  }
  return M < 1 ? ((21 + B - A) / 20) ** 2 : 1 - (1 - (21 + B - A) / 20) ** M;
}

// Returns the probability of a critical hit
// given the attacker's critical range, and advantage modifier.
function p_crit(crit_range: number, adv_mod: number): number {
  return adv_mod < 1
    ? ((21 - crit_range) / 20) ** 2
    : 1 - Math.pow(1 - (21 - crit_range) / 20, adv_mod);
}
