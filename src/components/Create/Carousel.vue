<template>
  <section class="content-carousel">
    <p class="subtitle is-4">Choose your Hero:</p>
    <b-carousel
          :autoplay="false"
          @change="info($event)">
          <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
              <section :class="`hero is-medium is-${carousel.color} is-bold`">
                  <div class="has-text-centered">
                    <img :src="carousel.url">
                  </div>
              </section>
          </b-carousel-item>
      </b-carousel>
  </section>
</template>

<script>
import { constants } from '@/helpers/constants'
export default {
  name: "appCarousel",
  data() {
    return {
      carousels: constants.KNIGHTS
    }
  },
  methods: {
    info(value) {
      this.$emit('knight-featured', this.carousels[value]);
    }
  }
}
</script>
<style lang="scss" scoped>
.content-carousel {
  .hero-body {
    padding: 0;
  }
  .has-text-centered {
    margin-bottom: 30px;
  }
}

</style>