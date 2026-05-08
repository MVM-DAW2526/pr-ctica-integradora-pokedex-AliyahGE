const gridMisPokemos = document.querySelector('#grids');
const ordreN0m = document.querySelector('#ordreN0m');
const ordreNivell = document.querySelector('#ordreNivell');
const ordreNum = document.querySelector('#ordreNum');

let misPokenons = [];

document.addEventListener('DOMContentLoaded', prepMisPokemons);

function prepMisPokemons() {
    misPokenons = aconseguirPokemons();
    materialitzarElsMeusPokemons(misPokenons);
    prepOrden();
}

function prepOrden() {
    ordreN0m.addEventListener('change', ordenarPerNom);
    ordreNivell.addEventListener('change', ordrenarPerNivell);
    ordreNum.addEventListener('change', ordenarPerNum);
}

function ordenarPerNom() {
    const order = ordreN0m.value;

    if (!order) {
        return;
    }

    misPokenons.sort((a, b) => {
        if (order === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    materialitzarElsMeusPokemons(misPokenons);
}

function ordrenarPerNivell() {
    const order = ordreNivell.value;

    if (!order) {
        return;
    }

    misPokenons.sort((a, b) => {
        const levelA = a.level || 1;
        const levelB = b.level || 1;

        if (order === 'asc') {
            return levelA - levelB;
        } else {
            return levelB - levelA;
        }
    });

    materialitzarElsMeusPokemons(misPokenons);
}

function ordenarPerNum() {
    const order = ordreNum.value;

    if (!order) {
        return;
    }

    misPokenons.sort((a, b) => {
        if (order === 'asc') {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });

    materialitzarElsMeusPokemons(misPokenons);
}

function materialitzarElsMeusPokemons(pokemons) {
    gridMisPokemos.textContent = '';

    if (pokemons.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No hi ha Pokemons a la teva col·lecció :c';
        message.classList.add('empty-message');
        gridMisPokemos.appendChild(message);
        return;
    }

    pokemons.forEach((pokemon) => {
        const card = ferCromo(pokemon);
        gridMisPokemos.appendChild(card);
    });
}

function ferCromo(pokemon) {
    const card = document.createElement('article');
    card.classList.add('my-pokemon-card');

    const img = document.createElement('img');
    img.classList.add('my-pokemon-image');
    img.src = aconseguirImatge(pokemon);
    img.alt = pokemon.name;

    const name = document.createElement('h3');
    name.textContent = primeraMayus(pokemon.name);

    const info = document.createElement('div');
    info.classList.add('pokemon-card-info');

    const level = document.createElement('span');
    level.textContent = `Niv. ${pokemon.level || 1}`;

    info.appendChild(level);

    const typeName = aconseguirTipusPri(pokemon);

    if (typeName) {
        const type = document.createElement('span');
        type.classList.add('pokemon-type', `type-${typeName}`);
        type.textContent = primeraMayus(typeName);
        info.appendChild(type);
    }

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(info);

    card.addEventListener('click', () => {
        window.location.href = `details.html?id=${pokemon.id}`;
    });

    return card;
}

function aconseguirImatge(pokemon) {
    if (pokemon.sprites && pokemon.sprites.front_default) {
        return pokemon.sprites.front_default;
    } else {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    }
}

function aconseguirTipusPri(pokemon) {
    if (!pokemon.types || pokemon.types.length === 0) {
        return null;
    }

    if (pokemon.types[0].type) {
        return pokemon.types[0].type.name;
    } else {
        return pokemon.types[0];
    }
}

function primeraMayus(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}