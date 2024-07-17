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
    };
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      return { width: this.playerHealth + "%" };
    },
    specialAttackStatus() {
      return this.round % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      console.log(`player health: ${value}`);
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        [this.playerHealth, this.monsterHealth] = [0, 0];
        this.winner = "draw";
      } else if (value <= 0) {
        //lose
        this.playerHealth = 0;
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      console.log(`monster health: ${value}`);
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        [this.playerHealth, this.monsterHealth] = [0, 0];
        this.winner = "draw";
      } else if (value <= 0) {
        //lose
        this.monsterHealth = 0;
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
  },
});

app.mount("#game");
