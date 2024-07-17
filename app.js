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
      this.monsterHealth -= getRandomValue(5, 12);
      this.attackPlayer();
    },
    attackPlayer() {
      this.round++;
      this.playerHealth -= getRandomValue(8, 15);
    },
    specialAttack() {
      this.round++;
      this.monsterHealth -= getRandomValue(10, 25);
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
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.winner = null;
    },
  },
});

app.mount("#game");
