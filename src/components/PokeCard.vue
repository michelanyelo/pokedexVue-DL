<template>
    <div class="col mb-4">
        <div class="card align-items-center" style="width: 18rem;">
            <img :src="pokemon.imagen" class="card-img-top w-50" :class="!adivinado ? 'camuflado' : 'visible'"
                :alt="pokemon.nombre">
            <div class="card-body">
                <h5 class="card-title text-center" v-if="adivinado">{{ pokemon.nombre }}</h5>
                <div :class="!adivinado ? 'visible' : 'oculto'">
                    <input v-model="inputValue" @keydown.enter.prevent="verificarNombre" type="text" class="w-100 mb-2">
                    <button @click="verificarNombre" class="btn btn-dark w-100">Descubrir</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PokeCard',
    props: {
        pokemon: Object,
    },
    data() {
        return {
            inputValue: '',
            adivinado: false,
        }
    },
    methods: {
        verificarNombre() {
            const esCorrecto = this.inputValue.toLowerCase().trim() === this.pokemon.nombre.toLowerCase().trim();
            this.adivinado = esCorrecto
            this.$emit('adivinado', { nombre: this.pokemon.nombre, correcto: esCorrecto });
            this.inputValue = ''
        }
    }
}
</script>

<style scoped>
.camuflado {
    filter: blur(5px) grayscale(100%);
}

.oculto {
    display: none;
}

.visible {
    display: block;
    filter: none;
}
</style>
