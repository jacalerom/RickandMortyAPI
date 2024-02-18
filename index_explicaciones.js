//Función para hacer la llamada a la API

async function fetchCharacters(name) {
    //Primer llamado a la API (filtrando personajes que contengan el string del input de búsqueda)
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    //Transformar la respuesta a JSON
    const data = await response.json();
    //Devolver los personajes obtenidos después de ejecutar la función
    return data.results;
}

//Función para renderizar los personajes

function renderCharacters(characters) {
    //Seleccionamos el contenedor que engloba las cards de los personajes
    const container = document.getElementById('character-container');
    //Limpiamos el contenedor para proceder a llenarlo con las cards de cada personaje
    container.innerHTML = '';

    //Para cada personaje obtenido vamos a crear una card
    characters.forEach(character => {
        //Creamos una constante que guarda la card creada
        const card = createCharacterCard(character);
        //La constante (card) creada se añade al contenedor global de las cards
        container.appendChild(card);
    });
}

//Función para crear la card del personaje

function createCharacterCard(character) {
    //Creamos un div que contendrá la card del personaje con sus datos
    const card = document.createElement('div');
    //Añadimos una clase a ese div
    card.classList.add('character-card');
    //Rellenamos ese div con la información del personaje que deseamos mostrar al usuario
    //Datos: nombre, imagen, status, especie, origen
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
//Se muestran los personajes que tienen ese valor

//Seleccionamos el botón de búsqueda a través de su ID
//Por medio de un click llamamos a la función especificada
document.getElementById('search-btn').addEventListener('click', async function() {
    //Limpiamos el div secundario en caso de que exista un mensaje de error o haya una card allí
    const existingCharacterCard = document.getElementById('existing-character-card');
    existingCharacterCard.innerHTML = '';
    //Guardamos el string del input de búsqueda (borramos los espacios en blanco)
    const searchTerm = document.getElementById('search-input').value.trim();
    //Si el término introducido no es un string vacío seguimos con la función
    if (searchTerm !== '') {
        try {
            //Llamamos a la API pasándole el string del input
            const characters = await fetchCharacters(searchTerm);
            //Renderizamos las cards de los personajes
            renderCharacters(characters);
        } catch (error) {
            //Manejamos los errores (en caso de buscar un personaje inexistente)
            //Imprimimos un mensaje de error en un div y en consola
            const contenedor = document.getElementById('character-container');
            contenedor.innerHTML = '<h3>No se encontró ningún personaje con ese nombre.</h3>';
            console.error('Error al buscar personajes:', error);
        }
    }
});

//Función que filtra (De los personajes obtenidos de la primera búsqueda) el personaje que queremos ver en detalle
//Seleccionamos el segundo input y por medio del cambio (cada vez que se escriba algo en él)
//Se ejecutará la función

document.getElementById('existing-character-input').addEventListener('input', function() {
    //Se guarda el string del usuario en una variable
    const searchTerm = this.value.trim().toLowerCase();
    //Se guardan las cardas existentes en una variable
    const cards = document.querySelectorAll('.character-card');

    //Iniciamos una variable de control (comienza en 'false')
    let found = false;
    //Ejecutamos una función forEach para comparar el string con el nombre de cada card
    cards.forEach(card => {
        //Guardamos el nombre de cada card en una variable
        const characterName = card.querySelector('h2').textContent.trim().toLowerCase();
        //Iniciamos la comparación entre el string del usuario y el nombre de cada card
        if (characterName === searchTerm) {
            //En caso de coincidir el filtro se selecciona el div final
            const existingCharacterCard = document.getElementById('existing-character-card');
            //Se limpia el div por si existía contenido allí
            existingCharacterCard.innerHTML = '';
            //Se agrega la card que cumple el filtro al div final de la aplicación
            existingCharacterCard.appendChild(card.cloneNode(true));
            //Se cambia el valor de la variable de control a 'true'
            found = true;
        }
    });

    //Se hace un segundo filtro para ver si no hubo una coincidencia en la búsqueda
    if (!found) {
        //Se selecciona el div final
        const existingCharacterCard = document.getElementById('existing-character-card');
        //Se añade un mensaje de resultado negativo para informar al usuario sobre el resultado de la búsqueda
        existingCharacterCard.innerHTML = '<h3>No se encontró ningún personaje con ese nombre.</h3>';
    }
});
