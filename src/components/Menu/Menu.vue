<template>
<div>
  <header>
    <h1 class="title is-1">Knights Challenge</h1>
    <b-button type="is-primary" @click="openCreation">Create a Knight</b-button>
  </header>
</div>
</template>

<script>
export default {
  name: 'appMenu',
  data() {
    return {
      isActive: true
    }
  },
  methods: {
    openCreation () {
      this.$emit('open-creation', true  )
    }
  }
}
</script>
<style lang="scss" scopped>
header {
  text-align: center;
  margin-top: 100px;
}
</style>