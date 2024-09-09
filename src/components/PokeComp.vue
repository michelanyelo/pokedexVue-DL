<template>
    <div class="container">
        <!-- Contenedor principal con alineación y estilos -->
        <div class="mt-3 d-flex flex-column align-items-center">
            <!-- Imagen de la Pokédex -->
            <img src="/pokedex.svg" alt="" class="img-fluid w-25">
            <!-- Título principal -->
            <h1>¿Quién es ese Pokemon?</h1>
            <!-- Contador de Pokémon descubiertos -->
            <h3>Pokémon descubiertos: <span class="text-warning fw-bold">{{ adivinadosCount }}</span></h3>
        </div>
        <!-- Fila de tarjetas de Pokémon -->
        <div class="row mt-4">
            <!-- Componente PokeCard para cada Pokémon en la lista -->
            <PokeCard v-for="(pokemon, idx) in pokemons" :key="idx" :pokemon="pokemon" @adivinado="manejarAdivinanza" />
        </div>
        <!-- Componente de modales -->
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
        PokeCard,    // Componente para mostrar la tarjeta de Pokémon
        ModalComp    // Componente para manejar los modales de éxito y error
    },
    data() {
        return {
            pokemons: [],    // Lista de Pokémon que se mostrarán
            currentPokemon: null    // Pokémon actualmente adivinado
        }
    },
    async mounted() {
        await this.getData()    // Obtiene los datos de Pokémon al montar el componente
    },
    methods: {
        async getData() {
            // Crea una instancia de PokeApi y obtiene la lista de Pokémon
            const pokeData = new PokeApi()
            const pokemonList = await pokeData.mapearPorId()
            this.pokemons = pokemonList    // Asigna la lista de Pokémon al estado
        },
        manejarAdivinanza({ nombre, correcto }) {
            // Muestra el modal de éxito o error basado en si la adivinanza fue correcta
            if (correcto) {
                const successModal = new Modal(document.getElementById('successModal'))
                successModal.show()
            } else {
                const errorModal = new Modal(document.getElementById('errorModal'))
                errorModal.show()
            }
            // Actualiza el estado del Pokémon según si fue adivinado correctamente
            const pokemon = this.pokemons.find(pokemon => pokemon.nombre === nombre)
            if (pokemon) {
                pokemon.adivinado = correcto
            }
        }
    },
    computed: {
        // Calcula el número total de Pokémon adivinados
        adivinadosCount() {
            return this.pokemons.filter(pokemon => pokemon.adivinado).length
        }
    }
};
</script>

<style scoped>
/* Estilos específicos para el componente si se requieren */
</style>
