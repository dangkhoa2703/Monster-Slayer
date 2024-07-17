const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    attackMonster() {
      this.monsterHealth -= getRandomValue(5, 12);
      this.attackPlayer();
      console.log(`monster heatlh: ${this.monsterHealth}`);
    },
    attackPlayer() {
      this.playerHealth -= getRandomValue(8, 15);
    },
  },
});

app.mount("#game");
