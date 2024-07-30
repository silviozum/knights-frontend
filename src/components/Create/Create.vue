<template>
  <section class="create">
      <Carousel  @knight-featured="handleKnightChoiceEvent"/>
      <div class="content-form">
        <b-field label="Name">
            <b-input maxlength="30" v-model="name" required></b-input>
        </b-field>

        <b-field label="NickName">
            <b-input maxlength="30" v-model="nickname"></b-input>
        </b-field>
      </div>
      
      <div class="content-choice-weapon">
        <p class="subtitle is-4">Equip your Weapon:</p>
        <ul>
          <li v-for="(weapon, idx) in weaponsSelected" :key="idx">
              <div class="card">
                <div class="card-content">
                  <div class="header-weapon">
                    <img :src="weapon.url">
                    <p class="subtitle is-3">{{weapon.name}}</p>
                  </div>
                  <div class="columns weapon-info">
                    <div class="column">
                      <ul>
                        <li>mod: {{ weapon.mod }}</li>
                        <li>attribute: {{ weapon.attr }}</li>
                      </ul>
                    </div>
                    <div class="column weapon-actions">
                      <div>
                        <b-radio v-model="weapon.equipped"
                        name="name"
                        :native-value="true">
                        Equip
                      </b-radio>
                    </div>
                    <div>
                      <b-button size="is-small" @click="removeWeapon(idx)">Remove</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Weapons @knight-weapon="handleKnightWeaponEvent"/>
      <div class="attributes-switch">
        <p class="subtitle is-4">Select your Attributes:</p>
        <p class="subtitle is-6">you have <span>{{letfPoints}}</span> points left:</p>
        <div class="switch-value" v-for="([key, value]) in Object.entries(attributes)" :key="key">
          <p class="subtitle is-6">{{ key }}: {{ value }}</p>
          <b-field>
            <b-slider :min="0" :max="10" ticks v-model="attributes[key]" @input="validateTotalPoints(key, attributes[key])"></b-slider>
          </b-field>
        </div>
        <p v-if="pointsExceeded" class="error-message">You have exceeded the maximum number of points!</p>
        </div>
        <div class="buttons-submit" v-if="!pointsExceeded">
            <b-button type="is-primary" @click="submitKnight">Save</b-button>
            <b-button type="is-danger" @click="hideCreation">Exit</b-button>
        </div>
  </section>
</template>

<script>
import Carousel from './Carousel.vue'
import Weapons from './Weapons.vue'
import { validadeFields, parseApiError } from '@/helpers/validateKnightCreation'
import { constants } from '@/helpers/constants'
import { knightsService } from '@/services';
export default {
  name: "appCreate",
  data () {
    return {
      weaponsSelected: [],
      attributes:{
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      },
      name:'',
      keyAttribute: '',
      nickname: '',
      imageKnight: constants.KNIGHTS[0].url,
      maxPoints: 20,
      totalPoints: 0,
      pointsExceeded: false,
    }
  },
  components: {
    Carousel,
    Weapons
  },
  computed: {
    letfPoints () {
      return this.maxPoints - this.totalPoints
    }
  },
  methods: {
    errorAlert(message) {
      this.$buefy.toast.open({
        duration: 4000,
        message: message,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },
    successAlert(message) {
      this.$buefy.toast.open({
        duration: 4000,
        message: message,
        position: 'is-bottom-right',
        type: 'is-success'
      })
    },
    async submitKnight () {
      const knight = {
        attributes: this.attributes,
        weapons: this.weaponsSelected,
        image: this.imageKnight,
        name: this.name,
        nickname: this.nickname
      }
      // erros treatment
      const hasError = validadeFields(knight)
      if (hasError.error) {
        this.errorAlert(hasError.message)
      } else {
        //define keyAttribute
        knight.keyAttribute = this.getKeyAttribute()

        const submit = await knightsService.createKnight(knight)
        if (submit.error) {
          const apiErrors = parseApiError(submit.error)
          this.errorAlert(apiErrors.message)
        } else {
          this.$emit('new-knight', submit)
          this.successAlert(hasError.message)
        }
      }
      
    },
    getKeyAttribute () {
      return this.weaponsSelected.find( item => item.equipped).attr
    },
    handleKnightChoiceEvent (event) {
      this.imageKnight = event.url
    },
    handleKnightWeaponEvent (event) {
      if (this.weaponsSelected.length < 3) {
        this.weaponsSelected.push(event)
      }
    },
    removeWeapon (idx) {
      delete this.weaponsSelected.splice(idx, 1);
    },
    validateTotalPoints(key) {
      this.totalPoints = Object.values(this.attributes).reduce((acc, val) => acc + val, 0)
      if (this.totalPoints > this.maxPoints) {
        this.pointsExceeded = true
        this.attributes[key] -= (this.totalPoints - this.maxPoints)
      } else {
        this.pointsExceeded = false
      }
    },
    hideCreation () {
      this.$emit('hide-creation', false);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
.create {
  animation: myAnim .2s ease 0s 1 normal forwards;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $knight-theme-c;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 30px;
  height: 100%;
  overflow-x: hidden;
}
.create::-webkit-scrollbar {
  height: 7px;
  width: 7px;
}
.create::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: gray;
}

.create::-webkit-scrollbar-track:active {
  background-color: gray;
}

.create::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: $knight-theme-f;
}
  

.card-content {
  margin-bottom: $gutter;
}
.header-weapon {
  display: flex;
  p {
    margin-left: $gutter;
  }
}

.weapon-info {
  margin-top: 10px;
}

.weapon-actions {
  display: flex;
  justify-content: space-between;
  div {
    margin-bottom: $gutter;
  }
}

.attributes-switch {
  display: block;
  margin-top: $gutter;
  span {
    color: $knight-theme-d
  }
  .switch-value {
    display: inline-block;
    width: 140px;
    margin: $gutter;
  }
}

.buttons-submit{
  text-align: right;
  margin-top: $gutter;
  button {
    margin: $gutter;
  }
}
.error-message {
  color: red;
}
</style>