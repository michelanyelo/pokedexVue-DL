<script>
import PokeApi from './services/PokeApi.js'
export default {
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      const pokeData = new PokeApi();
      await pokeData.mapearPorId();
      const poke = pokeData.data.value
      console.log(poke)
    }
  }
}

</script>

<template>
  <h1>Pokemones</h1>
</template>

<style scoped></style>
