const img1 = document.querySelector('#imgPokemon1');
const img2 = document.querySelector('#imgPokemon2');
const vida1 = document.querySelector('#vidaPokemon1');
const vida2 = document.querySelector('#vidaPokemon2');
const btnAtacar = document.querySelector('#btnAtacar');
const missatgeBaralla = document.querySelector('#missatgeBaralla');
const nomPokemon1 = document.querySelector('#nomPokemon1');
const nomPokemon2 = document.querySelector('#nomPokemon2');

let pokemon1;
let pokemon2;
let baralla;

document.addEventListener('DOMContentLoaded', Baralla);
btnAtacar.addEventListener('click', ferTorn);

function Baralla() {
    const misPokenons = aconseguirPokemons();
    const pokemonDelCarrer = aconseguirPokemonDeLasCalles();

    // si no hay pokemon salvaje no hay peleitas >:c
    if (!pokemonDelCarrer) {
        missatgeBaralla.textContent = 'Has d\'aconseguir un Pokémon de las calles para luchar!';
        btnAtacar.disabled = true;
        return;
    }

    // si no tienes pokemon te quedas al pokemon de las calles, si tienes pokemon coges al primero
    if (misPokenons.length === 0) {
        pokemon1 = new Pokemon(pokemonDelCarrer);
    } else {
        pokemon1 = new Pokemon(misPokenons[0]);
    }

    pokemon2 = new Pokemon(pokemonDelCarrer);

    baralla = new Battle(pokemon1, pokemon2);

    img1.src = pokemon1.sprites.front_default;
    img2.src = pokemon2.sprites.front_default;

    nomPokemon1.textContent = pokemon1.name;
    nomPokemon2.textContent = pokemon2.name;

    materialitzarVides();
}

function ferTorn() {
    let guanyador = baralla.torn();

    materialitzarVides();

    if (guanyador === pokemon1) {
        missatgeBaralla.textContent = 'Campeón ✧.*';
        afegirPokemon(pokemon2);
        btnAtacar.disabled = true;
    }

    if (guanyador === pokemon2) {
        missatgeBaralla.textContent = 'Loser ( ͡°❥ ͡°)';
        btnAtacar.disabled = true;
    }
}

function materialitzarVides() {
    vida1.textContent = 'HP: ' + pokemon1.hp;
    vida2.textContent = 'HP: ' + pokemon2.hp;
}