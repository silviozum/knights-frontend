<template>
  <div class="card">
    <div class="card-image">
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-80x80">
            <img
              :src="data.image"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="media-content">
          <div><p class="title is-4">{{ data.name }}</p></div>
          <div><p class="subtitle is-6">{{ data.nickname }}</p></div>
        </div>
        <div class="media-right">
          <div class="media-content">
            <div><p class="subtitle is-6">exp: <span class="exp-label">{{ data.exp }}</span></p></div>
            <div><p class="subtitle is-6">attack: <span class="attk-label">{{ data.attack }}</span></p></div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="columns">
          <div class="column left">
            <b-button @click="goToDetail(data._id)">
                Detail
            </b-button>
            <div class="infos b-tooltips">
              <b-tooltip label="Attribute" position="is-bottom">
                <div class="infos-item">
                  <span class="infos-icon attr-icon"></span> <p class="subtitle is-6"> : {{ data.attribute }} </p> 
                </div>
              </b-tooltip>
              <b-tooltip label="Age" position="is-bottom">
                <div class="infos-item">
                  <span class="infos-icon age-icon"></span> <p class="subtitle is-6"> : {{ data.age }}</p> 
                </div>
              </b-tooltip>
              <b-tooltip label="Weapons" position="is-bottom">
                <div class="infos-item">
                  <span class="infos-icon weapons-icon"></span><p class="subtitle is-6"> : {{ data.weapons }}</p> 
                </div>
              </b-tooltip>
            </div>
          </div>
          <div class="column right">
            <b-button @click="deleteKnight(data._id)">Remove</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    data: Object
  },
  methods: {
    async deleteKnight(id) {
      this.$emit('delete-knight', id)
    },
    goToDetail(id) {
      return this.$router.push({ path: `/knight/${id}` });
    }
  }
}
</script>

<style lang=scss scoped>
@import '@/assets/scss/mixins.scss';
.card {
  margin: 20px 0;
  figure.is-80x80 {
    height: 120px;
    width: 120px;
  }
}
  
.content {
  border-top: 1px solid #1D4241;
  padding-top: $gutter;
}

.media-content {
  div {
    p {
      margin-bottom: 5px;
    }
    .exp-label {
      color:orange
    }
    .attk-label {
      color:red
    }
  }
}

.right {
  text-align: right;
}
.left {
  text-align: left;
  display: flex;
  align-items: center;
}

.content{
  .infos {
    display: flex;
    div {
      margin: 0 $gutter;
      text-align: center;
    }
  }
}

.attr-icon {
  background-image: url('@/assets/icons/attribute.png');
}
.age-icon {
  background-image: url('@/assets/icons/age.png');
}
.weapons-icon {
  background-image: url('@/assets/icons/weapons.png');
}
 .infos-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
    .subtitle {
      margin-left: 10px;
    }
    .infos-icon {
      @include atributes-label();
  }

 }

</style>
