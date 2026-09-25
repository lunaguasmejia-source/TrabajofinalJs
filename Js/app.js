document.getElementById('txtBtn').addEventListener('click', cargarTXT);
document.getElementById('jsonBtn').addEventListener('click', cargarJSON);
document.getElementById('apiBTN').addEventListener('click', cargarRes);
document.getElementById('pokemonBtn').addEventListener('click', cargarPokemon);



function cargarTXT() {
    fetch('datos.txt')
        .then(function(res){
        return res.text();
        })
        .then(function(empleados){
        document.getElementById('resultado').innerHTML = empleados;
        })
        .catch(function(error){
        console.log(error)
        })
}

function cargarJSON(event) {
    event.preventDefault();
    fetch('Js/empleados.json')
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            let html = '';
            data.forEach(function(empleado){
                html += `
                   <li>${empleado.nombre} ${empleado.puesto}</li>`;
            })
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(function(error){
            console.log(error);
        });
}

function cargarRes() {
    fetch('https://picsum.photos/list')
        .then(function(res){
            return res.json();
        })
        .then(function(imagenes){
            let html = '';
            imagenes.forEach(function(imagen){
                html += 
                `<li>
                   <a target="_blank" href="${imagen.post_url}">ver imagen </a>
                   ${imagen.author}
                </li>`;
            })
            document.getElementById('resultado').innerHTML = html;
        })
}

function cargarPokemon(event) {
    event.preventDefault();

    const entrada = prompt('Escribe el nombre o número del Pokémon:');
    const resultado = document.getElementById('resultado');

    if (entrada === null) {
        return;
    }

    const pokemonBuscado = entrada.trim().toLowerCase();

    if (!pokemonBuscado) {
        alert('Ingresa el nombre o número de un Pokémon.');
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonBuscado)}`)
        .then(function(res){
            if (!res.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return res.json();
        })
        .then(function(pokemon){
            resultado.innerHTML = `
                <h2>${pokemon.name}</h2>
                <p>Número: ${pokemon.id}</p>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            `;
        })
        .catch(function(error){
            resultado.innerHTML = '<p>No se encontró ese Pokémon.</p>';
            console.error(error);
        })
}