<template>
    <div class="col mb-4">
        <!-- Tarjeta de Pokémon -->
        <div class="card align-items-center" style="width: 18rem;">
            <!-- Imagen del Pokémon, que se camufla si no ha sido adivinado -->
            <img :src="pokemon.imagen" class="card-img-top w-50" :class="!adivinado ? 'camuflado' : 'visible'"
                :alt="pokemon.nombre">
            <div class="card-body">
                <!-- Nombre del Pokémon visible solo si ha sido adivinado -->
                <h5 class="card-title text-center" v-if="adivinado">{{ pokemon.nombre }}</h5>
                <div :class="!adivinado ? 'visible' : 'oculto'">
                    <!-- Input para ingresar el nombre del Pokémon y botón para descubrir -->
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
        // Propiedad que recibe el objeto Pokémon
        pokemon: Object,
    },
    data() {
        return {
            inputValue: '', // Valor del input para ingresar el nombre
            adivinado: false, // Estado de si el Pokémon ha sido adivinado
        }
    },
    methods: {
        verificarNombre() {
            // Verifica si el nombre ingresado coincide con el nombre del Pokémon
            const esCorrecto = this.inputValue.toLowerCase().trim() === this.pokemon.nombre.toLowerCase().trim();
            this.adivinado = esCorrecto
            // Emite el evento con el resultado de la adivinanza
            this.$emit('adivinado', { nombre: this.pokemon.nombre, correcto: esCorrecto });
            // Limpia el campo de entrada
            this.inputValue = ''
        }
    }
}
</script>

<style scoped>
.camuflado {
    /* Estilo para camuflar la imagen (difuminar y poner en escala de grises) */
    filter: blur(5px) grayscale(100%);
}

.oculto {
    /* Oculta el contenido que no debe mostrarse */
    display: none;
}

.visible {
    /* Estilo para mostrar el contenido */
    display: block;
    filter: none;
}
</style>
