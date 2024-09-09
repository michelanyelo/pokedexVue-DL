<template>
    <div id="pokeContainer">
        <div class="row">
            <div v-for="(pokemon, idx) in pokemons" :key="idx">
                <h1>{{ pokemon.nombre }}</h1>
                <img :src="pokemon.imagen" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import PokeApi from '../services/PokeApi.js'
export default {
    name: 'PokeComp',
    data() {
        return {
            pokemons: []
        }
    },
    async mounted() {
        await this.getData();
    },
    methods: {
        async getData() {
            const pokeData = new PokeApi();
            const pokemonList = await pokeData.mapearPorId()
            this.pokemons = pokemonList
        }
    }

};
</script>
<style scoped></style>