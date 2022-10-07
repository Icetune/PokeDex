let currentPokemon;
let currentPokemonName;
let currentPokemonArtwork;
let currentPokemonNumber;
let currentPokemonType1;
let currentPokemonType2;
let currentPokemonAnimal;

let backgroundColors1 = [{ 'normal': '#BBBBAA', 'fire': '#F4563A', 'water': '#3399FF', 'grass': '#77CC55', 'flying': '#6699FF', 'fighting': '#BB5544', 'poison': '#AA5599', 'electric': '#FFCC33', 'ground': '#DDBB55', 'rock': '#BBAA66', 'psychic': '#FF5599', 'ice': '#83D4EF', 'bug': '#AABB22', 'ghost': '#6666BB', 'steel': '#AAAABB', 'dragon': '#7766EE', 'dark': '#775544', 'fairy': '#FFAAFF' }];
let backgroundColors2 = [{ 'normal': '#a7a7a7', 'fire': '#fa8975', 'water': '#7bbdff', 'grass': '#a8f888', 'flying': '#c3d7ff', 'fighting': '#e99687', 'poison': '#eb8ed8', 'electric': '#694f00', 'ground': '#775f15', 'rock': '#817647', 'psychic': '#ffadce', 'ice': '#daf6ff', 'bug': '#dce97d', 'ghost': '#31315e', 'steel': '#d6d6d6', 'dragon': '#411692', 'dark': '#1f130d', 'fairy': '#fde4fd' }];



async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/torterra`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    let evolutions = `https://pokeapi.co/api/v2/evolution-chain/{id}/`;
    







    renderPokemonInfo();

    console.log('Loaded Pokemon:', currentPokemon);
}

function renderPokemonInfo() {
    getPokemonArtwork();
    getPokemonTypes();
    getPokemonName();
    getPokemonNumber();
}









/*********************************************POKEMON INFO***********************************************/

function getPokemonArtwork() {
    currentPokemonArtwork = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonArtwork').src = currentPokemonArtwork;
}

function getPokemonName() {
    let firstLetter = String(currentPokemon['name'].charAt(0)).toLocaleUpperCase();
    currentPokemonName = firstLetter + currentPokemon['name'].slice(1);
    document.getElementById('pokemonName').innerHTML = currentPokemonName;
}

function getPokemonTypes() {
    currentPokemonType1 = currentPokemon['types']['0']['type']['name'];
    if (currentPokemon['types'].length == 1) {  // Pokemon has not more then one type?
        document.getElementById('pokemonFirstType').innerHTML = currentPokemonType1;
        setBackgroundForOneType();
    } else {
        document.getElementById('pokemonFirstType').innerHTML = currentPokemonType1;
        currentPokemonType2 = currentPokemon['types']['1']['type']['name'];
        document.getElementById('pokemonSecondType').innerHTML = currentPokemonType2;
        document.getElementById('pokemonSecondType').style = 'display:block;'
        setBackgroundForTwoTypes();
    } 
}

function setBackgroundForTwoTypes() {
    let backgroundColor1 = backgroundColors1[0][currentPokemonType1];
    let backgroundColor2 = backgroundColors1[0][currentPokemonType2];
    document.getElementById('pokedex').style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}

function setBackgroundForOneType() {
    let backgroundColor1 = backgroundColors1[0][currentPokemonType1];
    let backgroundColor2 = backgroundColors2[0][currentPokemonType1];
    document.getElementById('pokedex').style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
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
    document.getElementById('pokemonNumber').innerHTML = currentPokemonNumber;
}

/*********************************************POKEMON INFO***********************************************/