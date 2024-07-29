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
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>