<template>
  <section class="content-weapons">
    <p class="subtitle is-4">Choose your Weapon:</p>
    <p class="subtitle is-7"> Maximum 3 weapons</p>
    <div class="navegate-weapons">
      <ul>
        <li v-for="(weapon, idx) in weapons" :key="weapon.name" class="hvr-grow">
          <b-button @click="weaponSelected(idx)"><img :src="weapon.url"></b-button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { constants } from '@/helpers/constants'
export default {
  name: "appWeapons",
  computed: {
    weapons () {
      return constants.WEAPONS
    }
  },
  methods: {
    weaponSelected(idx) {
      this.$emit('knight-weapon', this.weapons[idx]);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/animations.scss';
@import '@/assets/scss/custom-bulma.scss';
.create {
  position: fixed;
  left: 0;
  top: 0;
  max-width: 500px ;
  background-color: #112026;
  padding: 20px;
}
.navegate-weapons {
  ul {
    li {
      display: inline-block;
      border:1px solid #80B4BF;
      border-radius: 6px;
      margin: 5px;
      padding: 5px;
      cursor: pointer;
    }
  }
}
</style>