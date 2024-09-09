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

        <!-- Modal de éxito -->
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="successModalLabel">¡Felicidades!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="https://i.redd.it/0xsc6c6oovu81.jpg" alt="Pikachu feliz" class="img-fluid">
                        <p>¡Has adivinado el Pokémon!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de error -->
        <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="errorModalLabel">¡Oh no!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="https://i.pinimg.com/236x/40/76/8e/40768e50330180d9249bf3921def7c24.jpg"
                            alt="Pikachu sorprendido" class="img-fluid">
                        <p>¡Inténtalo de nuevo!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PokeApi from '../services/PokeApi.js'
import PokeCard from './PokeCard.vue'
import { Modal } from 'bootstrap'

export default {
    name: 'PokeComp',
    components: {
        PokeCard,
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

<style scoped>
.camuflado {
    filter: blur(5px) grayscale(100%);
}

.visible {
    display: block;
    filter: none;
}
</style>
