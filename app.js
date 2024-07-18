const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      round: 0,
      winner: "",
      battleLogs: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttackStatus() {
      return this.round % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        //lose
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      console.log(`monster health: ${value}`);
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        //lose
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.round++;
      const attackDamage = getRandomValue(5, 12);
      this.monsterHealth -= attackDamage;
      this.addLogMessage("Player", "attack", attackDamage);
      this.attackPlayer();
    },
    attackPlayer() {
      this.round++;
      const attackDamage = getRandomValue(8, 15);
      this.addLogMessage("Monster", "attack", attackDamage);
      this.playerHealth -= attackDamage;
    },
    specialAttack() {
      this.round++;
      const attackDamage = getRandomValue(10, 25);
      this.monsterHealth -= attackDamage;
      this.addLogMessage("Player", "special-attack", attackDamage);
      this.attackPlayer();
    },
    healPlayer() {
      this.round++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += getRandomValue(8, 20);
      }
      this.addLogMessage("Player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
      this.battleLogs.push(`Player surrender`);
    },
    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.winner = null;
      this.battleLogs = [];
    },
    addLogMessage(who, what, value) {
      this.battleLogs.unshift({
        actionBy: who,
        action: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
