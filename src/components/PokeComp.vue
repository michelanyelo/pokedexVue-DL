<template>
    <div class="container">
        <div class="mt-3 d-flex flex-column align-items-center">
            <img src="/pokedex.svg" alt="" class="img-fluid w-25">
            <h1>¿Quién es ese Pokemon?</h1>
            <h3>Pokémon descubiertos: <span class="text-warning fw-bold">{{ adivinadosCount }}</span></h3>
        </div>
        <div class="row mt-4">
            <PokeCard v-for="(pokemon, idx) in pokemons" :key="idx" :pokemon="pokemon" @adivinado="manejarAdivinanza" />
        </div>
        <ModalComp />
    </div>
</template>

<script>
import PokeApi from '../services/PokeApi.js'
import PokeCard from './PokeCard.vue'
import ModalComp from './ModalComp.vue'
import { Modal } from 'bootstrap'

export default {
    name: 'PokeComp',
    components: {
        PokeCard,
        ModalComp
    },
    data() {
        return {
            pokemons: [],
            currentPokemon: null
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
        manejarAdivinanza({ nombre, correcto }) {
            if (correcto) {
                const successModal = new Modal(document.getElementById('successModal'))
                successModal.show()
            } else {
                const errorModal = new Modal(document.getElementById('errorModal'))
                errorModal.show()
            }
            const pokemon = this.pokemons.find(pokemon => pokemon.nombre === nombre)
            if (pokemon) {
                pokemon.adivinado = correcto
            }
        }
    },
    computed: {
        adivinadosCount() {
            return this.pokemons.filter(pokemon => pokemon.adivinado).length
        }
    }
};
</script>

<style scoped></style>
