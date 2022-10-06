let currentPokemon;
let currentPokemonName;
let currentPokemonArtwork;
let currentPokemonNumber;
let currentPokemonType1;
let currentPokemonType2;
let currentPokemonAnimal;

let backgroundColors = [{ 'normal': '#BBBBAA', 'fire': '#F4563A', 'water': '#3399FF', 'grass': '#77CC55', 'flying': '#6699FF', 'fighting': '#BB5544', 'poison': '#AA5599', 'electric': '#FFCC33', 'ground': '#DDBB55', 'rock': '#BBAA66', 'psychic': '#FF5599', 'ice': '#83D4EF', 'bug': '#AABB22', 'ghost': '#6666BB', 'steel': '#AAAABB', 'dragon': '#7766EE', 'dark': '#775544', 'fairy': '#FFAAFF' }];


async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/ho-oh`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    currentPokemonArtwork = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    getPokemonTypes();


    let backgroundColor = backgroundColors[0][currentPokemonType1];
    document.getElementById('pokedex').style = `background-color: ${backgroundColor};`;


    getPokemonName();

    getPokemonNumber();
    renderPokemonInfo();

    console.log('Loaded Pokemon:', currentPokemon);
}

function renderPokemonInfo() {
    document.getElementById('pokemonFirstType').innerHTML = currentPokemonType1;
    document.getElementById('pokemonName').innerHTML = currentPokemonName;
    document.getElementById('pokemonNumber').innerHTML = currentPokemonNumber;
    document.getElementById('pokemonArtwork').src = currentPokemonArtwork;
}













function getPokemonName() {
    let firstLetter = String(currentPokemon['name'].charAt(0)).toLocaleUpperCase();
    currentPokemonName = firstLetter + currentPokemon['name'].slice(1);
}

function getPokemonTypes() {
    currentPokemonType1 = currentPokemon['types']['0']['type']['name'];
    if (currentPokemon['types'].length == 1) {  // Pokemon has more then one type?
        // No? Do nothing!
    } else {
        currentPokemonType2 = currentPokemon['types']['1']['type']['name'];
        document.getElementById('pokemonSecondType').innerHTML = currentPokemonType2;
        document.getElementById('pokemonSecondType').style = 'display:block;'
    } // Yes? Show it!
}

function getPokemonNumber() {
    if (currentPokemon['id'] < 10) { //Pokemon Number is one Digit 
        currentPokemonNumber = `#00${currentPokemon['id']}`;
    } else {
        if (currentPokemon['id'] >= 10 && currentPokemon['id'] < 100) { //Pokemon Number are two Digits 
            currentPokemonNumber = `#0${currentPokemon['id']}`;
        } else {
            if (currentPokemon['id'] >= 100) { //Pokemon Number are three Digits
                currentPokemonNumber = `#${currentPokemon['id']}`;
            }
        }
    }
}