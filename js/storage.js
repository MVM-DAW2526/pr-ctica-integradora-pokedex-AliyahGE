const STORAGE_KEY = 'my_pokemons';
const WILD_KEY = 'wild_pokemon';

function aconseguirPokemons() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    return JSON.parse(data);
}

function guardarPokemons(pokemons) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
}

function afegirPokemon(pokemon) {
    const pokemons = aconseguirPokemons();

    pokemons.push(pokemon);

    guardarPokemons(pokemons);
}

function treurePokemon(id) {
    const pokemons = aconseguirPokemons();

    const elsFiltrats = pokemons.filter((pokemon) => pokemon.id !== id);

    guardarPokemons(elsFiltrats);
}

function guardarPokemonDeLasCalles(pokemon) {
    sessionStorage.setItem(WILD_KEY, JSON.stringify(pokemon));
}

function aconseguirPokemonDeLasCalles() {
    const data = sessionStorage.getItem(WILD_KEY);

    if (!data) return null;

    return JSON.parse(data);
}

function treurePokemonDeLasCalles() {
    sessionStorage.removeItem(WILD_KEY);
}
