<template>
    <div class="container">
        <!-- Encabezado y contadores -->
        <div class="mt-3 d-flex flex-column align-items-center">
            <!-- Imagen de la Pokédex -->
            <img src="/pokedex.svg" alt="Pokédex" class="img-fluid w-25">
            <!-- Título del juego -->
            <h1>¿Quién es ese Pokémon?</h1>
            <!-- Contador de Pokémon descubiertos -->
            <h3>
                Pokémon descubiertos:
                <span class="text-warning fw-bold">{{ adivinadosCount }}</span>
            </h3>
        </div>

        <!-- Fila de tarjetas de Pokémon -->
        <div class="row mt-4">
            <!-- Componente para mostrar cada tarjeta de Pokémon -->
            <PokeCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" @adivinado="manejarAdivinanza" />
        </div>

        <!-- Modales para éxito y error -->
        <ModalComp modalId="successModal" title="¡Felicidades!" message="¡Has adivinado el Pokémon!"
            imageSrc="https://i.pinimg.com/236x/40/76/8e/40768e50330180d9249bf3921def7c24.jpg"
            headerClass="bg-success text-white" footerButtonClass="btn btn-success" />
        <ModalComp modalId="errorModal" title="¡Oh no!" message="¡Inténtalo de nuevo!"
            imageSrc="https://i.pinimg.com/474x/46/bc/f7/46bcf71aaa097cca204f5dbe50240186.jpg"
            headerClass="bg-danger text-white" footerButtonClass="btn btn-danger" />
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
        PokeCard,    // Componente para las tarjetas de Pokémon
        ModalComp    // Componente para los modales
    },
    data() {
        return {
            pokemons: [],    // Lista de Pokémon
            currentPokemon: null    // Pokémon actualmente adivinado
        }
    },
    async mounted() {
        // Obtiene los datos de Pokémon al montar el componente
        await this.getData()
    },
    methods: {
        async getData() {
            // Obtiene la lista de Pokémon desde la API
            const pokeData = new PokeApi()
            const pokemonList = await pokeData.mapearPorId()
            this.pokemons = pokemonList
        },
        manejarAdivinanza({ nombre, correcto }) {
            // Muestra el modal correspondiente basado en la adivinanza
            const modalId = correcto ? 'successModal' : 'errorModal'
            const modalElement = document.getElementById(modalId)
            const modalInstance = new Modal(modalElement)
            modalInstance.show()

            // Actualiza el estado del Pokémon
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

<style scoped></style>
