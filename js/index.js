const buscador = document.querySelector('#pkmSearchInput');
const grids = document.querySelector('#mainPkmGrid');

let losPOkemon = [];

document.addEventListener('DOMContentLoaded', inici);

async function inici() {

    const pokemonList = await fetchPokemonList();

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = await fetchPokemon(pokemonList[i].name);

        if (pokemon !== null) {
            losPOkemon.push(pokemon);
        }
    }

    materialitzarPokeGrid(losPOkemon);
    prepCerca();
}

function prepCerca() {
    buscador.addEventListener('input', () => {
        const textACercar = buscador.value.toLowerCase().trim();
        const elsFiltrats = [];

        losPOkemon.forEach((pokemon) => {
            const id = String(pokemon.id);
            const name = pokemon.name.toLowerCase();

            if (id.includes(textACercar) || name.includes(textACercar)) {
                elsFiltrats.push(pokemon);
            }
        });

        materialitzarPokeGrid(elsFiltrats);
    });
}

function materialitzarPokeGrid(pokemonList) {
    grids.textContent = '';

    if (pokemonList.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No hi han Pokemons ara.';
        message.classList.add('no-results');
        grids.appendChild(message);
        return;
    }

    pokemonList.forEach((pokemon) => {
        const card = materialitzarCromo(pokemon);
        grids.appendChild(card);
    });
}

function materialitzarCromo(pokemon) {
    const card = document.createElement('article');
    card.classList.add('pokemon-card');
    card.dataset.id = pokemon.id;

    const number = document.createElement('p');
    number.classList.add('pokemon-number');
    number.textContent = IdPokemon(pokemon.id);

    const image = document.createElement('img');
    image.classList.add('pokemon-image');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;

    const name = document.createElement('h3');
    name.classList.add('pokemon-name');
    name.textContent = primeraMayus(pokemon.name);

    const typesContainer = document.createElement('div');
    typesContainer.classList.add('pokemon-types');

    pokemon.types.forEach((typeInfo) => {
        const type = document.createElement('span');
        type.classList.add('pokemon-type', `type-${typeInfo.type.name}`);
        type.textContent = primeraMayus(typeInfo.type.name);
        typesContainer.appendChild(type);
    });

    card.appendChild(number);
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(typesContainer);

    card.addEventListener('click', () => {
        window.location.href = `details.html?id=${pokemon.id}`;
    });

    return card;
}

function IdPokemon(id) {
    return `#${String(id).padStart(3, '0')}`;
}

function primeraMayus(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}