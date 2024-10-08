<script>
import { usePokeApi } from '../services/PokeApi.js'
import PokeCard from './PokeCard.vue'
import ModalComp from './ModalComp.vue'
import { Modal } from 'bootstrap'

export default {
    name: 'PokeComp',
    components: {
        PokeCard,
        ModalComp
    },
    setup() {
        const { consultaAPI, listado } = usePokeApi()
        consultaAPI()
        return {
            consultaAPI,
            listado
        }
    },
    methods: {
        manejarAdivinanza({ nombre, correcto }) {
            const modalId = correcto ? 'successModal' : 'errorModal'
            const modalElement = document.getElementById(modalId)
            const modalInstance = new Modal(modalElement)

            modalInstance.show()

            const pokemon = this.listado.find(pokemon => pokemon.nombre === nombre)
            if (pokemon) {
                pokemon.adivinado = correcto
            }
        }
    },
    computed: {
        adivinadosCount() {
            return this.listado.filter(pokemon => pokemon.adivinado).length
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="mt-3 d-flex flex-column align-items-center">
            <img src="/pokedex.svg" alt="Pokédex" class="img-fluid w-25">
            <h1>¿Quién es ese Pokémon?</h1>
            <h3>
                Pokémon descubiertos:
                <span class="text-warning fw-bold">{{ adivinadosCount }}</span>
            </h3>
        </div>

        <div class="row mt-4">
            <PokeCard v-for="pokemon in listado" :key="pokemon.nombre" :pokemon="pokemon" @adivinado="manejarAdivinanza" />
        </div>

        <ModalComp modalId="successModal" title="¡Felicidades!" message="¡Has adivinado el Pokémon!"
            imageSrc="https://i.pinimg.com/236x/40/76/8e/40768e50330180d9249bf3921def7c24.jpg"
            headerClass="bg-success text-white" footerButtonClass="btn btn-success" />
        <ModalComp modalId="errorModal" title="¡Oh no!" message="¡Inténtalo de nuevo!"
            imageSrc="https://i.pinimg.com/474x/46/bc/f7/46bcf71aaa097cca204f5dbe50240186.jpg"
            headerClass="bg-danger text-white" footerButtonClass="btn btn-danger" />
    </div>
</template>

<style scoped></style>
