const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      round: 0,
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
      return this.round % 3 === 0;
    },
  },
  methods: {
    attackMonster() {
      this.round++;
      this.monsterHealth -= getRandomValue(5, 12);
      this.attackPlayer();
      console.log(`monster heatlh: ${this.monsterHealth}`);
    },
    attackPlayer() {
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
