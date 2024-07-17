const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (min - max) + min);
};

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      this.monsterHealth -= getRandomValue(5, 12);
      this.attackPlayer();
    },
    attackPlayer() {
      this.playerHealth -= getRandomValue(8, 15);
    },
  },
});

app.mount("#game");
