<template>
  <div id="app">
    <Menu  @open-creation="openCreation"/>
    <section class="main">
      <div class="empty-content" v-if="empty">
        <p class="subtitle is-3">Your list 0f knights is empty :)</p>
      </div>

      <div v-for="knight in knights" :key="knight.nickname">
        <Card :data="knight" @delete-knight="deleteKnight"/>
      </div>

      <Create v-if="creation" @hide-creation="hideCreation" @new-knight="newKnight"/>
    </section>
  </div>
</template>

<script>
// components
import Card from '@/components/Card/Card.vue'
import Menu from '@/components/Menu/Menu.vue'
import Create from '@/components/Create/Create.vue'

//Api reques
import { knightsService } from '@/services';
import { constants } from '@/helpers/constants'
export default {
  name: 'HomeKnights',
  components: {
    Card,
    Menu,
    Create
  },
  data () {
    return {
      knights: [],
      empty: false,
      creation: false
    }
  },
  methods: {
    newKnight (event) {
      this.knights.unshift(event)
      this.creation = false
    },
    async deleteKnight (id) {
      const submit = await knightsService.deleteKnight(id)
      const newKnightsList  = this.knights.filter(item => item._id !== submit._id)
      this.knights = newKnightsList

      this.$buefy.toast.open({
        duration: 4000,
        message: constants.SUCCESS.DELETED,
        position: 'is-bottom-right',
        type: 'is-warning'
      })

    },
    async fetchKnights() {
      this.knights = await knightsService.getAllKnights('')
      if(this.knights.length === 0) {
        this.empty = true
      }
    },
    hideCreation (event) {
      this.creation = event
    },
    openCreation (event) {
      this.creation = event
    }
  },
  mounted() {
    this.fetchKnights();
  }
}
</script>

<style lang="scss" scopped>
.main {
  max-width: 1024px;
  margin: 0 auto;
}
.empty-content {
  text-align: center;
  margin-top: 100px;
}
</style>
