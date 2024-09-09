import axios from "axios"
import { ref } from "vue"

class PokeApi {
    constructor() {
        this.baseURL = 'https://pokeapi.co/api/v2/pokemon'
        this.data = ref(null)
    }

    async setData() {
        try {
            const url = this.baseURL
            const { data } = await axios.get(url)
            this.data.value = data.results
        } catch (error) {
            console.error(error)
        }
    }

    async mapearPorId() {
        await this.setData()

        if (this.data.value) {
            const mapPokemon = await Promise.all(this.data.value.map(async (pokemon) => {
                try {
                    // solicitud a la URL de cada pokemon para obtener sus detalles
                    const { data } = await axios.get(pokemon.url)
                    return {
                        nombre: pokemon.name,
                        imagen: data.sprites.front_default
                    }
                } catch (error) {
                    console.error(`Error al obtener datos del pokemon ${pokemon.name}:`, error)
                    return null
                }
            }))
            return mapPokemon
        } else {
            console.log('No se encontraron datos.')
            return []
        }
    }


}

export default PokeApi
