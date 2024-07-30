<template>
  <div class="content-knight">
    <div class="columns">
      <div class="column"><img :src="knight.image"></div>
      <div class="column">
        <div>
          <p class="title is-2">name: {{ knight.name }}</p>
        </div>
        <div class="detail-right">
          <b-field label="Edit Nickname:">
              <b-input maxlength="30" v-model="knight.nickname"></b-input>
          </b-field>
          <b-button type="is-ghost">Salvar</b-button>
        </div>
      </div>
    </div>

    <section>
        <b-tabs v-model="activeTab">
            <b-tab-item label="Attributes">
                Lorem ipsum dolor sit amet.
            </b-tab-item>

            <b-tab-item label="Weapons">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </b-tab-item>

        </b-tabs>
    </section>
  </div>
</template>

<script>
import { knightsService } from '@/services';
export default {
  name: 'DetailKnight',
  data () {
    return {
      knight: {},
      activeTab: 0,
    }
  },
  methods: {
    async fetchKnight(id) {
      this.knight = await knightsService.getKnight(id)
      console.log(this.knight)
    },
  },
  mounted () {
    this.fetchKnight(this.$route.params.id)
  }
}
</script>

<style lang="scss" scopped>
@import '@/assets/scss/mixins.scss';
.content-knight{
  max-width: 1024px;
  padding-top: 100px;
  margin: 0 auto;
}
.detail-right {
  display: flex;
  margin-top: $gutter * 2;
}
</style>