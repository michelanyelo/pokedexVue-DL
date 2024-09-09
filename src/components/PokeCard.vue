<template>
    <div id="pokeContainer" class="container">
        <div class="row">
            <div class="col mb-4" v-for="(pokemon, idx) in pokemons" :key="idx">
                <div class="card align-items-center" style="width: 18rem;">
                    <img :src="pokemon.imagen" class="card-img-top w-50"
                        :class="!pokemon.adivinado ? 'camuflado' : 'visible'" :alt="pokemon.nombre">
                    <div class="card-body">
                        <h5 class="card-title text-center" v-if="pokemon.adivinado">{{ pokemon.nombre }}</h5>
                        <input type="text" class="w-100 mb-2">
                        <button class="btn btn-dark w-100">Descubrir</button>
                    </div>
                </div>
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
            pokemons: [],
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
        },
    }

};
</script>
<style scoped>
.camuflado {
    filter: blur(5px) grayscale(100%)
}

.oculto {
    display: none;
}

.visible {
    display: block;
    filter: none;
}
</style>