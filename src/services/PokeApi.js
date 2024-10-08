import { ref } from 'vue'
import axios from 'axios'

export function usePokeApi() {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon'
    const listado = ref([])

    // Función para obtener los datos de los Pokémon
    const consultaAPI = async () => {
        try {
            const { data } = await axios.get(baseURL)
            const mapPokemon = await Promise.all(data.results.map(async (pokemon) => {
                try {
                    const response = await axios.get(pokemon.url)
                    return {
                        nombre: pokemon.name,
                        imagen: response.data.sprites.front_default,
                        adivinado: false
                    }
                } catch (err) {
                    console.error(`Error al obtener datos del pokemon ${pokemon.name}:`, err)
                    return null
                }
            }))
            listado.value = mapPokemon.filter(Boolean)
        } catch (err) {
            console.error('Error al consultar la API:', err)
        }
    }

    // Variables reactivas y la función de consulta
    return {
        consultaAPI,
        listado      
    }
}
