let currentPokemon;
let currentPokemonName;
let currentPokemonArtwork;
let currentPokemonNumber;
let currentPokemonType1;
let currentPokemonType2;
let currentPokemonGerman;

let backgroundColors1 = [{ 'normal': '#BBBBAA', 'fire': '#F4563A', 'water': '#3399FF', 'grass': '#77CC55', 'flying': '#6699FF', 'fighting': '#BB5544', 'poison': '#AA5599', 'electric': '#FFCC33', 'ground': '#DDBB55', 'rock': '#BBAA66', 'psychic': '#FF5599', 'ice': '#83D4EF', 'bug': '#AABB22', 'ghost': '#6666BB', 'steel': '#AAAABB', 'dragon': '#7766EE', 'dark': '#775544', 'fairy': '#FFAAFF' }];
let backgroundColors2 = [{ 'normal': '#a7a7a7', 'fire': '#fa8975', 'water': '#7bbdff', 'grass': '#a8f888', 'flying': '#c3d7ff', 'fighting': '#e99687', 'poison': '#eb8ed8', 'electric': '#694f00', 'ground': '#775f15', 'rock': '#817647', 'psychic': '#ffadce', 'ice': '#daf6ff', 'bug': '#dce97d', 'ghost': '#31315e', 'steel': '#d6d6d6', 'dragon': '#411692', 'dark': '#1f130d', 'fairy': '#fde4fd' }];



async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/aron`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    renderPokemonInfo();
    renderPokemonEvolutions();
    console.log('Loaded Pokemon:', currentPokemon);
}

function renderPokemonInfo() {
    getMainPokemonArtwork();
    getPokemonTypes();
    getPokemonName();
    getPokemonNumber();
    getGermanName();
}









/*********************************************POKEMON INFO***********************************************/

function getMainPokemonArtwork() {
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

async function getGermanName() {
    let pokemonID = currentPokemon['id']; // The ID (Number) of the Pokemon is teh key
    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`;
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    let pokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // This JSON contains the species of the Pokemon(this is necessary to get the evolution-chain)
    currentPokemonGerman = pokemonSpeciesAsJson['names'][5]['name'];
    document.getElementById('germanPokemonName').innerHTML = currentPokemonGerman;
}

/*********************************************POKEMON INFO***********************************************/



















/*********************************************POKEMON EVOLUTION***********************************************/


//////////////////////////////////////////////IMPORTANT PART///////////////////////////////////////////////////

async function renderPokemonEvolutions() {

    let pokemonID = currentPokemon['id']; // The ID (Number) of the Pokemon is teh key
    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`;
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    let pokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // This JSON contains the species of the Pokemon(this is necessary to get the evolution-chain)

    console.log('Pokemon Spezies:', pokemonSpeciesAsJson);

    let pokemonEvolutionURL = pokemonSpeciesAsJson['evolution_chain']['url'];
    let pokemonEvolution = pokemonEvolutionURL;
    let pokemonEvolutionResponse = await fetch(pokemonEvolution);
    let pokemonEvolutionAsJson = await pokemonEvolutionResponse.json(); // This JSON contains the evolution-chain, which means the names of all the pokemons in the ev-chain

    renderPokemonFirstStage(pokemonEvolutionAsJson);
    checkIfThereIsMoreThanOneStage(pokemonEvolutionAsJson);

}


async function checkIfThereIsMoreThanOneStage(pokemonEvolutionAsJson) {
    if (pokemonHasMoreThanOneStage(pokemonEvolutionAsJson)) {
        renderSecondStagePokemon(pokemonEvolutionAsJson);
        if (pokemonHasMoreThanTwoStages(pokemonEvolutionAsJson)) {
            renderThirdStagePokemon(pokemonEvolutionAsJson);
        } else {
            noThirdStage();
        }
    } else {
        noSecondOrThirdStage();
    }
}

//////////////////////////////////////////////IMPORTANT PART///////////////////////////////////////////////////

function pokemonHasMoreThanOneStage(pokemonEvolutionAsJson) {
    return pokemonEvolutionAsJson['chain']['evolves_to'].hasOwnProperty(0)
}

function pokemonHasMoreThanTwoStages(pokemonEvolutionAsJson) {
    return pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to'].hasOwnProperty(0)
}

async function renderPokemonFirstStage(pokemonEvolutionAsJson) {
    let pokemonStage1 = pokemonEvolutionAsJson['chain']['species']['name'];
    let evolution1URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage1}`;
    let evolution1Response = await fetch(evolution1URL);
    evolution1AsJSON = await evolution1Response.json();
    let evolution1Artwork = evolution1AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-1').src = evolution1Artwork;
}

async function renderSecondStagePokemon(pokemonEvolutionAsJson) {
    let pokemonStage2 = pokemonEvolutionAsJson['chain']['evolves_to']['0']['species']['name'];
    let evolution2URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage2}`;
    let evolution2Response = await fetch(evolution2URL);
    evolution2AsJSON = await evolution2Response.json();
    let evolution2Artwork = evolution2AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-2').src = evolution2Artwork;
}

async function renderThirdStagePokemon(pokemonEvolutionAsJson) {
    let pokemonStage3 = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'];
    let evolution3URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage3}`;
    let evolution3Response = await fetch(evolution3URL);
    evolution3AsJSON = await evolution3Response.json();
    let evolution3Artwork = evolution3AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-3').src = evolution3Artwork;
}

function noSecondOrThirdStage() {
    document.getElementById('evolution-2').src = '';
    document.getElementById('evolution-3').src = '';
}

function noThirdStage() {
    document.getElementById('evolution-3').src = '';
}


/*********************************************POKEMON EVOLUTION***********************************************/