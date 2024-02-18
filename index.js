//Función para hacer la llamada a la API

async function fetchCharacters(name) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const data = await response.json();
    return data.results;
}

//Función para renderizar los personajes

function renderCharacters(characters) {
    const container = document.getElementById('character-container');
    container.innerHTML = '';

    characters.forEach(character => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

//Función para crear la card del personaje

function createCharacterCard(character) {
    const card = document.createElement('div');
    card.classList.add('character-card');
    card.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p>Status: ${character.status}</p>
        <p>Especie: ${character.species}</p>
        <p>Origen: ${character.origin.name}</p>
    `;
    return card;
}

//Función de filtrado entre los personajes de la API y el valor (string) del primer input

document.getElementById('search-btn').addEventListener('click', async function() {
    const existingCharacterCard = document.getElementById('existing-character-card');
    existingCharacterCard.innerHTML = '';
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm !== '') {
        try {
            const characters = await fetchCharacters(searchTerm);
            renderCharacters(characters);
        } catch (error) {
            const contenedor = document.getElementById('character-container');
            contenedor.innerHTML = '<h3>No se encontró ningún personaje con ese nombre.</h3>';
            console.error('Error al buscar personajes:', error);
        }
    }
});

//Función que filtra (De los personajes obtenidos de la primera búsqueda) el personaje que queremos ver en detalle

document.getElementById('existing-character-input').addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.character-card');

    let found = false;
    cards.forEach(card => {
        const characterName = card.querySelector('h2').textContent.trim().toLowerCase();
        if (characterName === searchTerm) {
            const existingCharacterCard = document.getElementById('existing-character-card');
            existingCharacterCard.innerHTML = '';
            existingCharacterCard.appendChild(card.cloneNode(true));
            found = true;
        }
    });

    if (!found) {
        const existingCharacterCard = document.getElementById('existing-character-card');
        existingCharacterCard.innerHTML = '<h3>No se encontró ningún personaje con ese nombre.</h3>';
    }
});
