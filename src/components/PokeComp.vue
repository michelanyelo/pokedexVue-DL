<template>
    <div id="pokeContainer" class="container">
        <div class="mt-3">
            <h3>Pokémon adivinados: {{ adivinadosCount }}</h3>
        </div>
        <div class="row">
            <PokeCard v-for="(pokemon, idx) in pokemons" :key="idx" :pokemon="pokemon" @adivinado="manejarAdivinanza" />
        </div>
    </div>
</template>

<script>
import PokeApi from '../services/PokeApi.js'
import PokeCard from './PokeCard.vue'

export default {
    name: 'PokeComp',
    components: {
        PokeCard,
    },
    data() {
        return {
            pokemons: [],
        }
    },
    async mounted() {
        await this.getData()
    },
    methods: {
        async getData() {
            const pokeData = new PokeApi()
            const pokemonList = await pokeData.mapearPorId()
            this.pokemons = pokemonList
        },
        manejarAdivinanza(nombrePokemon) {
            alert(`¡Has adivinado el Pokémon: ${nombrePokemon}!`)
            const pokemon = this.pokemons.find(pokemon => pokemon.nombre === nombrePokemon)
            if (pokemon) {
                pokemon.adivinado = true
            }
        },
    },
    computed: {
        adivinadosCount() {
            const cantidadAdivinados = this.pokemons.filter(pokemon => pokemon.adivinado).length
            return cantidadAdivinados
        }
    }
};
</script>
