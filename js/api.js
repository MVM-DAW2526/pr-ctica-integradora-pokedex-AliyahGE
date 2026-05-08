/**
 * api.js — Capa d'accés a la PokéAPI.
 * Aquest és l'ÚNIC fitxer que fa crides fetch.
 * Implementa les funcions; la resta de mòduls les importaran.
 */

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Retorna la llista dels primers 151 Pokémon.
 * Endpoint: GET /pokemon?limit=151
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
async function fetchPokemonList() {
    try{
        const response = await fetch(`${BASE_URL}/pokemon?limit=151`);

        if (!response.ok) {            
            throw new Error(`Error al carregar la llista de Pokémon`);
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Retorna les dades completes d'un Pokémon.
 * Endpoint: GET /pokemon/{idOrName}
 * @param {string|number} idOrName
 * @returns {Promise<Object>}
 */
async function fetchPokemon(idOrName) {
    try {
        if (!idOrName) {
            console.error(`Nom o ID de Pokémon no proporcionat`);
            return null;
        }

        const normalizedName = String(idOrName).toLowerCase().trim();
        const response = await fetch(`${BASE_URL}/pokemon/${normalizedName}`);

        if (!response.ok) {
            throw new Error(`Pokémon no trobat: ${normalizedName}`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Retorna les dades d'espècie (inclou URL cadena evolutiva).
 * Endpoint: GET /pokemon-species/{id}
 * @param {number} id
 * @returns {Promise<Object>}
 */
async function fetchSpecies(id) {
    try {
        if (!id){
            console.error(`ID de Pokémon no proporcionat`);
            return null;
        }

        const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);

        if (!response.ok) {
            throw new Error(`Espècie no trobada`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Retorna la cadena evolutiva donada la seva URL completa.
 * @param {string} url
 * @returns {Promise<Object>}
 */
async function fetchEvolutionChain(url) {
    try {
        if (!url) {
            console.error(`URL de cadena evolutiva no proporcionada`);
            return null;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Cadena evolutiva no trobada`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Retorna les dades completes d'un moviment.
 * @param {string} url
 * @returns {Promise<Object|null>}
 */
async function fetchMove(url) {
    try {
        if (!url) {
            console.error('URL de moviment no proporcionada');
            return null;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Moviment no trobat');
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        return null;
    }
}