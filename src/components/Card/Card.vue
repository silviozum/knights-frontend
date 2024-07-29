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
            <div class="infos b-tooltips">
              <b-tooltip label="Attribute" position="is-bottom">
                <div>
                  <span class="infos-icon attr-icon"></span> <p class="subtitle is-6">{{ data.attribute }} </p> 
                </div>
              </b-tooltip>
              <b-tooltip label="Age" position="is-bottom">
                <div>
                  <span class="infos-icon age-icon"></span> <p class="subtitle is-6">{{ data.age }}</p> 
                </div>
              </b-tooltip>
              <b-tooltip label="Weapons" position="is-bottom">
                <div>
                  <span class="infos-icon weapons-icon"></span><p class="subtitle is-6">{{ data.weapons }}</p> 
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
    }
  }
}
</script>

<style lang=scss scoped>
.card {
  margin: 20px 0;
  figure.is-80x80 {
    height: 80px;
    width: 80px;
  }
}
  
.content {
  border-top: 1px solid #1D4241;
  padding-top: 15px;
}

.media-content {
  div {
    margin: 10px;
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
}

.content{
  .infos {
    display: flex;
    div {
      margin: 0 10px;
      text-align: center;
    }
  }
}

.infos-icon {
  width: 28px;
  height: 28px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 0 auto;
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


</style>
