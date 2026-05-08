const mapaCaça = document.querySelector('#mapaCaça');
const popupCaça = document.querySelector('#popupCaça');
const imgSombra = document.querySelector('#imgSombra');
const btnVeure = document.querySelector('#btnVeure');
const btnLluitar = document.querySelector('#btnLluitar');

let pokemonSalvatge = null;

popupCaça.classList.add('ocult');

mapaCaça.addEventListener('click', buscarPokemon);
btnVeure.addEventListener('click', veurePokemon);
btnLluitar.addEventListener('click', lluitar);

async function buscarPokemon() {
    if (pokemonSalvatge !== null) {
        return;
    }

    const id = Math.floor(Math.random() * 151) + 1;

    pokemonSalvatge = await fetchPokemon(id);

    imgSombra.src = pokemonSalvatge.sprites.front_default;
    imgSombra.classList.add('silueta');

    popupCaça.classList.remove('ocult');
}

function veurePokemon(event) {
    event.stopPropagation();

    imgSombra.classList.remove('silueta');
    btnVeure.classList.add('ocult');
    btnLluitar.classList.remove('ocult');
}

function lluitar(event) {
    event.stopPropagation();

    guardarPokemonDeLasCalles(pokemonSalvatge);
    window.location.href = 'battle.html';
}