const contenidorDetalls = document.querySelector('#pokemonDetail');

document.addEventListener('DOMContentLoaded', prepDetalls);

async function prepDetalls() {
    carrega();

    try {
        const params = new URLSearchParams(window.location.search);
        const pokemonId = params.get('id');

        if (!pokemonId) {
            verError('No s’ha trobat cap Pokémon.');
            return;
        }

        const pokemon = await fetchPokemon(pokemonId);

        if (!pokemon) {
            verError('No s’ha pogut carregar el Pokémon.');
            return;
        }

        const species = await fetchSpecies(pokemon.id);

        let evolutionChain = null;

        if (species && species.evolution_chain) {
            evolutionChain = await fetchEvolutionChain(species.evolution_chain.url);
        }

        let moves = [];

        for (let i = 0; i < 10; i++) {
            const move = await fetchMove(pokemon.moves[i].move.url);

            if (move) {
                moves.push(move);
            }
        }

        materialitzarlPokeDetalls(pokemon, evolutionChain, moves);

    } catch (error) {
        console.error(error);
        verError('Hi ha hagut un error carregant el detall.');
    }
}

function materialitzarlPokeDetalls(pokemon, evolutionChain, moves) {
    contenidorDetalls.textContent = '';

    const layout = document.createElement('article');
    layout.classList.add('pokemon-detail-layout');

    const leftPanel = document.createElement('section');
    leftPanel.classList.add('detail-panel', 'main-pokemon-panel');

    const image = document.createElement('img');
    image.classList.add('detail-image');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;

    const title = document.createElement('h1');
    title.classList.add('pokemon-title');
    title.textContent = primeraMayus(pokemon.name);

    const number = document.createElement('p');
    number.classList.add('pokemon-number');
    number.textContent = `ID: ${IdPokemon(pokemon.id)}`;

    leftPanel.appendChild(image);
    leftPanel.appendChild(title);
    leftPanel.appendChild(number);

    const centerColumn = document.createElement('div');
    centerColumn.classList.add('center-column');

    const profilePanel = document.createElement('section');
    profilePanel.classList.add('detail-panel', 'profile-panel');

    const profileTitle = document.createElement('h2');
    profileTitle.textContent = 'Perfil';

    profilePanel.appendChild(profileTitle);
    profilePanel.appendChild(ferPerfil(pokemon));

    const abilitiesPanel = document.createElement('section');
    abilitiesPanel.classList.add('detail-panel', 'abilities-panel');

    const abilitiesTitle = document.createElement('h2');
    abilitiesTitle.textContent = 'Habilitats';

    const abilitiesText = document.createElement('p');

    pokemon.abilities.forEach((a) => {
        abilitiesText.textContent += a.ability.name + ' ';
    });

    abilitiesPanel.appendChild(abilitiesTitle);
    abilitiesPanel.appendChild(abilitiesText);

    centerColumn.appendChild(profilePanel);
    centerColumn.appendChild(abilitiesPanel);

    const movesPanel = ferTaulaMovis(moves);
    movesPanel.classList.add('detail-panel', 'moves-panel');

    const evolutionPanel = ferTaulaEvolus(evolutionChain);
    evolutionPanel.classList.add('detail-panel', 'evolution-panel');

    layout.appendChild(leftPanel);
    layout.appendChild(centerColumn);
    layout.appendChild(movesPanel);
    layout.appendChild(evolutionPanel);

    contenidorDetalls.appendChild(layout);
}

function ferPerfil(pokemon) {
    const section = document.createElement('section');
    section.classList.add('profile-info');

    let hp = null;
    let attack = null;

    pokemon.stats.forEach((stat) => {
        if (stat.stat.name === 'hp') {
            hp = stat;
        }

        if (stat.stat.name === 'attack') {
            attack = stat;
        }
    });

    if (hp) {
        section.appendChild(ferBarritas('HP', hp.base_stat));
    }

    if (attack) {
        section.appendChild(ferBarritas('Atac', attack.base_stat));
    }

    const height = document.createElement('p');
    height.classList.add('profile-line');
    height.textContent = `Alçada: ${pokemon.height / 10} m`;

    const weight = document.createElement('p');
    weight.classList.add('profile-line');
    weight.textContent = `Pes: ${pokemon.weight / 10} kg`;

    section.appendChild(height);
    section.appendChild(weight);

    return section;
}

function ferBarritas(label, value) {
    const row = document.createElement('div');
    row.classList.add('stat-row');

    const name = document.createElement('span');
    name.classList.add('stat-name');
    name.textContent = label;

    const bar = document.createElement('div');
    bar.classList.add('stat-bar');

    const fill = document.createElement('div');
    fill.classList.add('stat-fill');

    const percent = Math.min(value, 200) / 200 * 100;
    fill.style.width = `${percent}%`;

    const statValue = document.createElement('span');
    statValue.classList.add('stat-value');
    statValue.textContent = value;

    bar.appendChild(fill);
    row.appendChild(name);
    row.appendChild(bar);
    row.appendChild(statValue);

    return row;
}

function ferTaulaMovis(moves) {
    const section = document.createElement('section');
    section.classList.add('moves-section');

    const title = document.createElement('h2');
    title.textContent = 'Moviments';
    section.appendChild(title);

    const table = document.createElement('table');
    table.classList.add('moves-table');

    const headerRow = document.createElement('tr');

    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Atac';

    const typeHeader = document.createElement('th');
    typeHeader.textContent = 'Tipus';

    const powerHeader = document.createElement('th');
    powerHeader.textContent = 'Poder';

    headerRow.appendChild(nameHeader);
    headerRow.appendChild(typeHeader);
    headerRow.appendChild(powerHeader);
    table.appendChild(headerRow);

    moves.forEach((move) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = move.name;

        const typeCell = document.createElement('td');

        const typeBadge = document.createElement('span');
        typeBadge.classList.add('pokemon-type', `type-${move.type.name}`);
        typeBadge.textContent = primeraMayus(move.type.name);

        typeCell.appendChild(typeBadge);

        const powerCell = document.createElement('td');
        powerCell.textContent = move.power || '—';

        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(powerCell);

        table.appendChild(row);
    });

    section.appendChild(table);

    return section;
}

function ferTaulaEvolus(evolutionChain) {
    const section = document.createElement('section');
    section.classList.add('evolution-section');

    const title = document.createElement('h2');
    title.textContent = 'Evolució';
    section.appendChild(title);

    const list = document.createElement('ul');
    list.classList.add('evolution-list');

    if (!evolutionChain) {
        const item = document.createElement('li');
        item.textContent = 'No hi ha dades d’evolució.';
        list.appendChild(item);
        section.appendChild(list);
        return section;
    }

    const evolutionNames = aconseguirNomsEvolus(evolutionChain.chain);

    evolutionNames.forEach((name) => {
        const item = document.createElement('li');
        item.textContent = primeraMayus(name);
        list.appendChild(item);
    });

    section.appendChild(list);

    return section;
}

function aconseguirNomsEvolus(chain) {
    const names = [];

    let currentEvolution = chain;

    while (currentEvolution) {
        names.push(currentEvolution.species.name);
        currentEvolution = currentEvolution.evolves_to[0];
    }

    return names;
}

function carrega() {
    contenidorDetalls.textContent = '';

    const loading = document.createElement('p');
    loading.textContent = 'Carregant detall del Pokémon...';
    loading.classList.add('loading');

    contenidorDetalls.appendChild(loading);
}

function verError(messageText) {
    contenidorDetalls.textContent = '';

    const message = document.createElement('p');
    message.textContent = messageText;
    message.classList.add('error-message');

    contenidorDetalls.appendChild(message);
}

function IdPokemon(id) {
    return `#${String(id).padStart(3, '0')}`;
}

function primeraMayus(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}