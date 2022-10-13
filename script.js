let currentPokemon;
let currentPokemonName;
let currentPokemonArtwork;
let currentPokemonNumber;
let currentPokemonType1;
let currentPokemonType2;
let currentPokemonGerman;

let pokemonSpeciesAsJson;
let pokemonEvolutionAsJson;

let backgroundColors1 = [{ 'normal': '#BBBBAA', 'fire': '#F4563A', 'water': '#3399FF', 'grass': '#77CC55', 'flying': '#6699FF', 'fighting': '#BB5544', 'poison': '#AA5599', 'electric': '#FFCC33', 'ground': '#DDBB55', 'rock': '#BBAA66', 'psychic': '#FF5599', 'ice': '#83D4EF', 'bug': '#AABB22', 'ghost': '#6666BB', 'steel': '#AAAABB', 'dragon': '#7766EE', 'dark': '#775544', 'fairy': '#FFAAFF' }];
let backgroundColors2 = [{ 'normal': '#a7a7a7', 'fire': '#fa8975', 'water': '#7bbdff', 'grass': '#a8f888', 'flying': '#c3d7ff', 'fighting': '#e99687', 'poison': '#eb8ed8', 'electric': '#694f00', 'ground': '#775f15', 'rock': '#817647', 'psychic': '#ffadce', 'ice': '#daf6ff', 'bug': '#dce97d', 'ghost': '#31315e', 'steel': '#d6d6d6', 'dragon': '#411692', 'dark': '#1f130d', 'fairy': '#fde4fd' }];

/*********************************************GENERAL v***********************************************/

function renderPokemon() {
    renderPokemonInfo();
    renderPokemonDescription();
}

function upperCaseFirstLetter(someWord) {
    let firstLetter = String(someWord.charAt(0)).toLocaleUpperCase();
    upperCaseWord = firstLetter + someWord.slice(1);
    return upperCaseWord;
}

function likePokemon() {
    let currentHeart = document.getElementById('heart').src;
    if (currentHeart == 'http://127.0.0.1:5500/icons/herz.png') {
        document.getElementById('heart').src = 'icons/herz-ausgefüllt.png';
    } else {
        document.getElementById('heart').src = 'icons/herz.png';
    }
}

async function renderPokemonEntrie(ID) {
    renderPokemonEntrieHTML();

    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${ID}/`;                /////////////////////////////
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    pokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // Species API              /////////////////////////////

    let currentPokemonName = pokemonSpeciesAsJson['name'];                                  // FUNKTION LÄSST SICH NICHT KÜRZEN
    document.title = `Pokedex || ${currentPokemonName}`;
    /////////////////////////////
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemonName}`;
    let response = await fetch(url);                                                        /////////////////////////////
    currentPokemon = await response.json(); //General API

    loadPokemonEvolutions();
    renderPokemon();
}

function renderPokemonEntrieHTML() {
    document.getElementById('body').innerHTML = '';
    document.getElementById('body').innerHTML = `
    
    <header id="certain-pokemon">

    <div class="pokemon-header-text">

        <div class="pokemon-header-text-left">
                <img onclick="renderAllPokemon()" style="cursor: pointer;" src="icons/pfeil-links.png">
            <h1 id="pokemonName"></h1>
            <div class="pokemon-header-types">
                <p id="pokemonFirstType" class="pokemon-header-type"></p>
                <p id="pokemonSecondType" style="display:none;" class="pokemon-header-type"></p>
            </div>
        </div>

        <div class="pokemon-header-text-right">
            <img onclick="likePokemon()" id="heart" src="icons/herz.png">
            <p id="pokemonNumber" class="pokemon-header-number"></p>
            <p id="germanPokemonName" class="pokemon-header-animal"></p>
        </div>

    </div>

    <img id="pokemonArtwork" src="">

</header>

<div class="info-container">

    <div class="nav-bar">
        <p id="about-link" class="nav-bar-link nav-bar-link-active" onclick="renderPokemonDescription()">About</p>
        <p id="base-stats-link" class="nav-bar-link" onclick="renderBaseStats()">Base Stats</p>
        <p id="evolution-link" class="nav-bar-link" onclick="renderPokemonEvolutions()">Evolution</p>
        <p id="moves-link" class="nav-bar-link" onclick="renderPokemonMoves()">Moves</p>
    </div>

    <div id="content-container"></div>

</div>
`;
}

/*********************************************GENERAL ^***********************************************/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*********************************************ALL POKEMON v***********************************************/

let pokemonRenderd = 31;
let renderedPokemonNames = [];


function renderAllPokemon() {
    renderAllPokemonHTML();
    document.getElementById('all-pokemon').innerHTML = '';
    for (let i = 1; i < pokemonRenderd; i++) {
        let ii = i + 1000;
        renderPokemonCardHTML(i, ii);
        loadPokemonSpecies(i, ii);
    }
    document.getElementById('load-more-btn').style = "display:block;"
}

function render50MorePokemon() {
    let pokemonAmount = pokemonRenderd;
    pokemonRenderd = pokemonAmount + 50;
    if (pokemonRenderd < 807) {
        renderMorePokemon(pokemonAmount);
    } else { }
}

function renderMorePokemon(pokemonAmount) {
    for (let i = pokemonAmount; i < pokemonRenderd; i++) {
        let ii = i + 1000;
        renderPokemonCardHTML(i, ii);
        loadPokemonSpecies(i, ii);
    }
}

async function loadPokemonSpecies(i, ii) {
    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    let allPokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // Species API
    loadPokemonCardImgAndTypes(allPokemonSpeciesAsJson, i, ii);
}

async function loadPokemonCardImgAndTypes(allPokemonSpeciesAsJson, i, ii) {
    let onePokemon = allPokemonSpeciesAsJson['name'];
    renderedPokemonNames.push({ onePokemon, i });
    let onePokemonUpperCase = upperCaseFirstLetter(onePokemon)
    document.getElementById(`pokemon-card-name${i}`).innerHTML = onePokemonUpperCase;
    let url = `https://pokeapi.co/api/v2/pokemon/${onePokemon}`;
    let response = await fetch(url);
    let onePokemonApi = await response.json(); //General API
    let onePokemonImg = onePokemonApi['sprites']['other']['official-artwork']['front_default'];
    document.getElementById(`pokemon-crad-img${i}`).src = onePokemonImg;
    getPokemonCardTypes(onePokemonApi, i, ii)
}

function getPokemonCardTypes(onePokemonApi, i, ii) {
    if (onePokemonApi['types'].length == 2) {
        PokemonWithCardTwoTypes(onePokemonApi, i, ii);
    } else {
        PokemonWithCardOneType(onePokemonApi, i, ii);
    }
}

function PokemonWithCardTwoTypes(onePokemonApi, i, ii) {
    let onePokemonType1 = onePokemonApi['types']['0']['type']['name'];
    document.getElementById(`${i}pokemon-card-type1`).innerHTML = onePokemonType1;

    let onePokemonType2 = onePokemonApi['types']['1']['type']['name'];
    document.getElementById(`${ii}pokemon-card-type2`).innerHTML = onePokemonType2;
    let backgroundColor1 = backgroundColors1[0][onePokemonType1];
    let backgroundColor2 = backgroundColors2[0][onePokemonType2];
    document.getElementById(`pokemon-card${i}`).style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}

function PokemonWithCardOneType(onePokemonApi, i, ii) {
    let onePokemonType1 = onePokemonApi['types']['0']['type']['name'];
    document.getElementById(`${i}pokemon-card-type1`).innerHTML = onePokemonType1;

    document.getElementById(`${ii}pokemon-card-type2`).style = "display:none;";
    let backgroundColor1 = backgroundColors1[0][onePokemonType1];
    let backgroundColor2 = backgroundColors2[0][onePokemonType1];
    document.getElementById(`pokemon-card${i}`).style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}

function searchPokemon() {
    document.getElementById('load-more-btn').style = "display:none;"
    search = getInputValue();
    if (search == '') {
        renderAllPokemon();
    } else {
        renderPokemonWithInputValue();
    }
}

function getInputValue() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    return search
}

function renderPokemonWithInputValue() {
    document.getElementById('all-pokemon').innerHTML = '';
    for (let j = 0; j < renderedPokemonNames.length; j++) {
        if (renderedPokemonNames[`${j}`]['onePokemon'].includes(search)) {
            let i = renderedPokemonNames[`${j}`]['i'];
            let ii = i + 1000;
            renderSearchedPokemon(i, ii)
        } else { }
    }
}

function renderSearchedPokemon(i, ii) {
    renderPokemonCardHTML(i, ii);
    loadSearchedPokemonSpecies(i, ii);
}

async function loadSearchedPokemonSpecies(i, ii) {
    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    let allPokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // Species API
    loadSearchedPokemonCardImgAndTypes(allPokemonSpeciesAsJson, i, ii);
}

async function loadSearchedPokemonCardImgAndTypes(allPokemonSpeciesAsJson, i, ii) {
    let onePokemon = allPokemonSpeciesAsJson['name'];
    let onePokemonUpperCase = upperCaseFirstLetter(onePokemon)
    document.getElementById(`pokemon-card-name${i}`).innerHTML = onePokemonUpperCase;
    let url = `https://pokeapi.co/api/v2/pokemon/${onePokemon}`;
    let response = await fetch(url);
    let onePokemonApi = await response.json(); //General API
    let onePokemonImg = onePokemonApi['sprites']['other']['official-artwork']['front_default'];
    document.getElementById(`pokemon-crad-img${i}`).src = onePokemonImg;
    getPokemonCardTypes(onePokemonApi, i, ii)
}

function renderAllPokemonHTML() {
    document.getElementById('body').innerHTML = '';
    document.getElementById('body').innerHTML = `
    
    <screen id="screen">

        <div class="head-btn">
            <input placeholder="Search a Pokemon..." type="text" id="search" oninput="searchPokemon()">
            <img class="pokeball" src="icons/pokeball.png">
            <img src="icons/menu.png">
        </div>

        <div class="h1-container">
            <h1>Pokedex</h1>
        </div>

        <div id="all-pokemon" class="pokemon"></div>

        <button id="load-more-btn" class="load-more-btn" onclick="render50MorePokemon()">Render 50 more Pokemon!</button>

    </screen>
    
    `;
}

function renderPokemonCardHTML(i, ii) {
    document.getElementById('all-pokemon').innerHTML += `
        
    <div onclick="renderPokemonEntrie(${i})" id="pokemon-card${i}" class="pokemon-card">

        <span id="pokemon-card-name${i}" class="pokemon-card-name"></span>

        <div class="pokemon-card-content">

            <div class="pokemon-card-text">
                <span id="${i}pokemon-card-type1" class="pokemon-card-type"></span>
                <span id="${ii}pokemon-card-type2" class="pokemon-card-type"></span>
            </div>

            <img id="pokemon-crad-img${i}" class="pokemon-card-img" src="">

        </div>

        <img class="pokemon-card-pokeball" src="icons/pokeball.png">

    </div>`;
}

/*********************************************ALL POKEMON ^***********************************************/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*********************************************POKEMON INFO v***********************************************/

function renderPokemonInfo() {
    getMainPokemonArtwork();
    getPokemonName();
    getPokemonTypes();
    getPokemonNumber();
    getGermanName();
}

function getMainPokemonArtwork() {
    currentPokemonArtwork = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonArtwork').src = currentPokemonArtwork;
}

function getPokemonName() {
    document.getElementById('pokemonName').innerHTML = upperCaseFirstLetter(currentPokemon['name']);
}

function getPokemonTypes() {
    currentPokemonType1 = currentPokemon['types']['0']['type']['name'];
    if (pokemonHasOnlyOneType()) {
        renderpokemonWithOneType();
    } else {
        renderpokemonWithTwoTypes();
    }
}

function pokemonHasOnlyOneType() {
    return currentPokemon['types'].length == 1
}

function renderpokemonWithOneType() {
    document.getElementById('pokemonFirstType').innerHTML = currentPokemonType1;
    setBackgroundForOneType();
}

function renderpokemonWithTwoTypes() {
    document.getElementById('pokemonFirstType').innerHTML = currentPokemonType1;
    currentPokemonType2 = currentPokemon['types']['1']['type']['name'];
    document.getElementById('pokemonSecondType').innerHTML = currentPokemonType2;
    document.getElementById('pokemonSecondType').style = 'display:block;'
    setBackgroundForTwoTypes();
}

function setBackgroundForOneType() {
    let backgroundColor1 = backgroundColors1[0][currentPokemonType1];
    let backgroundColor2 = backgroundColors2[0][currentPokemonType1];
    document.getElementById('certain-pokemon').style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}

function setBackgroundForTwoTypes() {
    let backgroundColor1 = backgroundColors1[0][currentPokemonType1];
    let backgroundColor2 = backgroundColors1[0][currentPokemonType2];
    document.getElementById('certain-pokemon').style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
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
    currentPokemonGerman = pokemonSpeciesAsJson['names'][5]['name'];
    document.getElementById('germanPokemonName').innerHTML = currentPokemonGerman;
}

/*********************************************POKEMON INFO ^***********************************************/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*********************************************POKEMON ABOUT v***********************************************/

/*********************************************IMPORTANT PART v**************************************************/


async function renderPokemonDescription() {
    renderAboutHTML();
    renderEnglishDescription();
    renderGeneralInfos();
}

function renderEnglishDescription() {
    for (let i = 10; i < 25; i++) { // 15 descriptions will be checked to find an english one
        if (descriptionIsInEnglish(i)) {
            displayEnglishDescription(i);
        } else { }
    }
}

function renderGeneralInfos() {
    renderAbilities();
    renderPokemonWeight();
    checkAndRenderIfLegendary();
    renderGenera();
    renderShape();
}

/*********************************************IMPORTANT PART ^**************************************************/



/*********************************************HELP FUNCTIONS v**************************************************/


function descriptionIsInEnglish(i) {
    return pokemonSpeciesAsJson['flavor_text_entries'][`${i}`]['language']['name'] == 'en'
}

function displayEnglishDescription(i) {
    let pokemonDescription = pokemonSpeciesAsJson['flavor_text_entries'][`${i}`]['flavor_text'];
    document.getElementById('pokemon-description').innerHTML = pokemonDescription;
}

function renderAbilities() {

    // get first ability
    let firstAbility = upperCaseFirstLetter(currentPokemon['abilities']['0']['ability']['name'])
    document.getElementById('ability-1').innerHTML = firstAbility;

    // if there is a second ability, get that too
    if (currentPokemon['abilities']['1']) {
        let secondAbility = upperCaseFirstLetter(currentPokemon['abilities']['1']['ability']['name'])
        document.getElementById('ability-2').innerHTML = secondAbility;
    } else {
        document.getElementById('ability-2').innerHTML = '';
    }

}

function renderPokemonWeight() {
    let pokemonWeight = + (currentPokemon['weight'] / 10)
    document.getElementById('weight').innerHTML = `${pokemonWeight} Kg`;
}

function checkAndRenderIfLegendary() {
    if (pokemonSpeciesAsJson['is_legendary'] == true) {
        document.getElementById('legendary').innerHTML = 'Yes';
    } else {
        document.getElementById('legendary').innerHTML = 'No';
    }
}

function renderGenera() {
    document.getElementById('genera').innerHTML = pokemonSpeciesAsJson['genera']['7']['genus'];
}

function renderShape() {
    let shape = upperCaseFirstLetter(pokemonSpeciesAsJson['shape']['name'])
    document.getElementById('shape').innerHTML = shape;
}

function highlightAbout() {
    document.getElementById('base-stats-link').classList.remove('nav-bar-link-active');
    document.getElementById('about-link').classList.add('nav-bar-link-active');
    document.getElementById('evolution-link').classList.remove('nav-bar-link-active');
    document.getElementById('moves-link').classList.remove('nav-bar-link-active');
}

function renderAboutHTML() {

    highlightAbout();

    document.getElementById('content-container').innerHTML = `
    
    <div id="pokemon-description"></div>

    <table class="about-table">
        <tr>
            <td class="td-left">
                Abilities
            </td>
            <td class="td-right">
                <p id="ability-1"></p>
                <p id="ability-2">Ability2</p>
            </td>
        </tr>
        <tr>
            <td class="td-left">
                Weight
            </td>
            <td class="td-right" id="weight">
            </td>
        </tr>
        <tr>
            <td class="td-left">
                Legendary
            </td>
            <td class="td-right" id="legendary">
            </td>
        </tr>
        <tr>
            <td class="td-left">
                Genera
            </td>
            <td class="td-right" id="genera">
            </td>
        </tr>
        <tr>
            <td class="td-left">
                Shape
            </td>
            <td class="td-right" id="shape">
            </td>
        </tr>
    </table>

    <div class="box"></div>
    
    `;

}

/*********************************************HELP FUNCTIONS ^**************************************************/

/*********************************************POKEMON ABOUT ^***********************************************/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*********************************************POKEMON BASE STATS V***********************************************/

let pokemonStats = [];

const CONFIG_BG_COLOR = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

const CONFIG_BORDER_COLOR = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]

function renderBaseStats() {
    getBaseStatsHTML();
    getAPIData();
    drawChart();

}

function getAPIData() {

    let allPokemonStats = currentPokemon['stats'];
    for (let i = 0; i < 6; i++) {
        let singlePokemonStat = allPokemonStats[`${i}`]['base_stat'];
        pokemonStats.push(singlePokemonStat);
    }

}

function drawChart() {  // From 'Chart.js'
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP.', 'Atk.', 'Def.', 'Sp-Atk.', 'Sp-Def.', 'Init'],
            datasets: [{
                label: '# of Votes',
                data: pokemonStats,
                backgroundColor: CONFIG_BG_COLOR,
                borderColor: CONFIG_BORDER_COLOR,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function highlightBaseStats() {
    document.getElementById('base-stats-link').classList.add('nav-bar-link-active');
    document.getElementById('about-link').classList.remove('nav-bar-link-active');
    document.getElementById('evolution-link').classList.remove('nav-bar-link-active');
    document.getElementById('moves-link').classList.remove('nav-bar-link-active');
}

function getBaseStatsHTML() {
    highlightBaseStats();
    document.getElementById('content-container').innerHTML = `

    <div id="base-stats">

    <canvas id="myChart" width="400" height="400"></canvas>

    <div class="box"></div>

    </div>

`;
}

/*********************************************POKEMON BASE STATS ^***********************************************/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*********************************************POKEMON EVOLUTION v***********************************************/

/*********************************************IMPORTANT PART v**************************************************/

async function renderPokemonEvolutions() {
    loadEvolutionHTML();
    renderPokemonFirstStage();
    checkIfThereIsMoreThanOneStage();
}

async function checkIfThereIsMoreThanOneStage() {
    if (pokemonHasMoreThanOneStage()) {
        renderSecondStagePokemon();
        if (pokemonHasMoreThanTwoStages()) {
            renderThirdStagePokemon();
        } else {
            noThirdStage();
        }
    } else {
        noSecondOrThirdStage();
    }
}

function renderPokemonFirstStage() {
    renderFirstStageImg();
    getFirstEvolutionName();
}

function renderSecondStagePokemon() {
    renderSecondStageImg();
    getSecondEvolutionName();
    getTriggerForFirstEvolution();
}

function renderThirdStagePokemon() {
    renderThirdStageImg();
    getThirdEvolutionName();
    getTriggerForSecondEvolution();
}

/*********************************************IMPORTANT PART ^**************************************************/



/*********************************************HELP FUNCTIONS v**************************************************/

async function loadPokemonEvolutions() {
    let pokemonEvolutionURL = pokemonSpeciesAsJson['evolution_chain']['url'];
    let pokemonEvolutionResponse = await fetch(pokemonEvolutionURL);
    pokemonEvolutionAsJson = await pokemonEvolutionResponse.json(); // Evolution API
}

async function renderFirstStageImg() {
    let pokemonStage1 = pokemonEvolutionAsJson['chain']['species']['name'];
    let evolution1URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage1}`;
    let evolution1Response = await fetch(evolution1URL);
    evolution1AsJSON = await evolution1Response.json();
    let evolution1Artwork = evolution1AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-1').src = evolution1Artwork;
}

function getFirstEvolutionName() {
    let firstLetter = String(pokemonEvolutionAsJson['chain']['species']['name'].charAt(0)).toLocaleUpperCase();
    firstEvolutionName = firstLetter + pokemonEvolutionAsJson['chain']['species']['name'].slice(1);
    document.getElementById('first-evolution-name').innerHTML = firstEvolutionName;
}

function pokemonHasMoreThanOneStage() {
    return pokemonEvolutionAsJson['chain']['evolves_to'].hasOwnProperty(0)
}

async function renderSecondStageImg() {
    let pokemonStage2 = pokemonEvolutionAsJson['chain']['evolves_to']['0']['species']['name'];
    let evolution2URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage2}`;
    let evolution2Response = await fetch(evolution2URL);
    evolution2AsJSON = await evolution2Response.json();
    let evolution2Artwork = evolution2AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-2').src = evolution2Artwork;
}

function getSecondEvolutionName() {
    let firstLetter = String(pokemonEvolutionAsJson['chain']['evolves_to']['0']['species']['name'].charAt(0)).toLocaleUpperCase();
    secondEvolutionName = firstLetter + pokemonEvolutionAsJson['chain']['evolves_to']['0']['species']['name'].slice(1);
    document.getElementById('second-evolution-name').innerHTML = secondEvolutionName;
}

function getTriggerForFirstEvolution() {
    let evolutionTrigger = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolution_details']['0']['trigger']['name'];
    let evolutionTriggerPoint = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolution_details']['0'];

    if (evolutionTrigger == 'level-up') {
        if (evolutionTriggerPoint['min_level']) {
            let minLvl = evolutionTriggerPoint['min_level'];
            document.getElementById('first-evolution').innerHTML = `Lvl. ${minLvl}`;
        } else {
            let minFriendship = evolutionTriggerPoint['min_happiness'];
            document.getElementById('first-evolution').innerHTML = `Friendship of ${minFriendship}`;
        }
    } else {
        if (evolutionTrigger == 'trade') {
            document.getElementById('first-evolution').innerHTML = `After a Trade`;
        } else {
            if (evolutionTrigger == 'use-item') {
                let neededItem = evolutionTriggerPoint['item']['name'];
                document.getElementById('first-evolution').innerHTML = `Use ${neededItem}`;
            }
        }
    }
}

function pokemonHasMoreThanTwoStages() {
    return pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to'].hasOwnProperty(0)
}

async function renderThirdStageImg() {
    let pokemonStage3 = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'];
    let evolution3URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage3}`;
    let evolution3Response = await fetch(evolution3URL);
    evolution3AsJSON = await evolution3Response.json();
    let evolution3Artwork = evolution3AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-3').src = evolution3Artwork;
}

function getThirdEvolutionName() {
    let firstLetter = String(pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'].charAt(0)).toLocaleUpperCase();
    thirdEvolutionName = firstLetter + pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'].slice(1);
    document.getElementById('third-evolution-name').innerHTML = thirdEvolutionName;
}

function getTriggerForSecondEvolution() {
    let evolutionTrigger = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['evolution_details']['0']['trigger']['name'];
    let evolutionTriggerPoint = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['evolution_details']['0'];

    if (evolutionTrigger == 'level-up') {
        if (evolutionTriggerPoint['min_level']) {
            let minLvl = evolutionTriggerPoint['min_level'];
            document.getElementById('second-evolution').innerHTML = `Lvl. ${minLvl}`;
        } else {
            let minFriendship = evolutionTriggerPoint['min_happiness'];
            document.getElementById('second-evolution').innerHTML = `Friendship of ${minFriendship}`;
        }
    } else {
        if (evolutionTrigger == 'trade') {
            document.getElementById('second-evolution').innerHTML = `After a Trade`;
        } else {
            if (evolutionTrigger == 'use-item') {
                let neededItem = evolutionTriggerPoint['item']['name'];
                document.getElementById('second-evolution').innerHTML = `Use ${neededItem}`;
            }
        }
    }
}

function noThirdStage() {
    document.getElementById('evolution-3').src = '';
    let unnecessaryItems = ['second-ev-trigger', 'third-evolution-name', 'third-evolution-container',];
    for (let i = 0; i < unnecessaryItems.length; i++) {
        const id = unnecessaryItems[i];
        document.getElementById(`${id}`).style = 'display:none;';
    }
}

function noSecondOrThirdStage() {
    document.getElementById('evolution-2').src = '';
    document.getElementById('evolution-3').src = '';
    let unnecessaryItems = ['first-ev-arrow', 'second-evolution-name', 'second-evolution-container', 'second-ev-trigger', 'third-evolution-name', 'third-evolution-container',];
    for (let i = 0; i < unnecessaryItems.length; i++) {
        const id = unnecessaryItems[i];
        document.getElementById(`${id}`).style = 'display:none;';
    }
    document.getElementById('first-evolution').innerHTML = 'No Futher Evolution'
}

function highlightEvolution() {
    document.getElementById('base-stats-link').classList.remove('nav-bar-link-active');
    document.getElementById('about-link').classList.remove('nav-bar-link-active');
    document.getElementById('evolution-link').classList.add('nav-bar-link-active');
    document.getElementById('moves-link').classList.remove('nav-bar-link-active');
}

function loadEvolutionHTML() {

    highlightEvolution();

    document.getElementById('content-container').innerHTML = '';
    document.getElementById('content-container').innerHTML = `
    
    <div class="evolution-container">

        <div style="text-align: center;">
            <div id="first-evolution-name" class="evolution-name"></div>

            <div class="evolution-img-container">
                <img id="evolution-1" class="evolution-img" src="">
                <img class="evolution-img-background" src="icons/pokeball.png">
            </div>
        </div>

        <div class="evolution-trigger evt-1">
            <div id="first-evolution"></div>
            <img id="first-ev-arrow" src="icons/pfeil-runter.png">
            <img id="first-ev-arrow" src="icons/pfeil-rechts.png">
        </div>

        <div style="text-align: center;">

            <div id="second-evolution-name" class="evolution-name sen"></div>

            <div id="second-evolution-container" class="evolution-img-container evic2">
                <img id="evolution-2" class="evolution-img" src="">
                <img class="evolution-img-background" src="icons/pokeball.png">
            </div>

        </div>

        <div id="second-ev-trigger" class="evolution-trigger evt-2">
            <div id="second-evolution"></div>
            <img src="icons/pfeil-runter.png">
        </div>

        <div style="text-align: center;">
            <div id="third-evolution-name" class="evolution-name ten"></div>

            <div id="third-evolution-container" class="evolution-img-container evic3">
                <img id="evolution-3" class="evolution-img" src="">
                <img class="evolution-img-background" src="icons/pokeball.png">
            </div>

        </div>

    </div>
    
    `;
}



















// function loadEvolutionHTML() {

//     highlightEvolution();

//     document.getElementById('content-container').innerHTML = '';
//     document.getElementById('content-container').innerHTML = `

//     <div class="evolution-container">

//         <div id="first-evolution-name" class="evolution-name"></div>

//         <div class="evolution-img-container">
//             <img id="evolution-1" class="evolution-img" src="">
//             <img class="evolution-img-background" src="icons/pokeball.png">
//         </div>

//         <div class="evolution-trigger" style="position: relative; bottom: 55px;">
//             <div id="first-evolution"></div>
//             <img id="first-ev-arrow" src="icons/pfeil-runter.png">
//         </div>

//         <div id="second-evolution-name" class="evolution-name" style="position: relative; bottom: 50px;"></div>

//         <div id="second-evolution-container" class="evolution-img-container"
//             style="position: relative; bottom: 50px;">
//             <img id="evolution-2" class="evolution-img" src="">
//             <img class="evolution-img-background" src="icons/pokeball.png">

//         </div>

//         <div id="second-ev-trigger" class="evolution-trigger" style="position: relative; bottom: 100px;">
//             <div id="second-evolution"></div>
//             <img src="icons/pfeil-runter.png">
//         </div>

//         <div id="third-evolution-name" class="evolution-name" style="position: relative; bottom: 95px;"></div>

//         <div id="third-evolution-container" class="evolution-img-container"
//             style="position: relative; bottom: 95px;">
//             <img id="evolution-3" class="evolution-img" src="">
//             <img class="evolution-img-background" src="icons/pokeball.png">
//         </div>

//     </div>

//     `;
// }



























/*********************************************HELP FUNCTIONS ^**************************************************/

/*********************************************POKEMON EVOLUTION ^***********************************************/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*********************************************POKEMON MOVES v***********************************************/

let pokemonMovesJSON = [];

function renderPokemonMoves() {
    getMovesHTML();
    getAllLvlLearnedMoves();
    sortAllMovesByLvl();
    displayPokemonMoves();
}

function getAllLvlLearnedMoves() {
    let allPokemonMoves = currentPokemon['moves'];
    for (let i = 0; i < allPokemonMoves.length; i++) {
        const oneMoveArray = allPokemonMoves[i];

        let oneMoveLowerCase = oneMoveArray['move']['name'];
        let oneMove = upperCaseFirstLetter(oneMoveLowerCase);
        let learnsOnLvl = oneMoveArray['version_group_details']['0']['level_learned_at'];

        if (learnsOnLvl > 0) {
            pokemonMovesJSON.push({ 'lvl': `${learnsOnLvl}`, 'move': `${oneMove}` });
        } else { }
    }
}

function sortAllMovesByLvl() {
    pokemonMovesJSON.sort(function (a, b) {
        return parseFloat(a.lvl) - parseFloat(b.lvl);
    });
}

function displayPokemonMoves() {
    for (let i = 0; i < pokemonMovesJSON.length; i++) {
        let oneMove = pokemonMovesJSON[`${i}`]['move'];
        let learnsOnLvl = pokemonMovesJSON[`${i}`]['lvl'];
        document.getElementById('lvl-table').innerHTML += `
        <tr>
            <td>
            ${oneMove}
            </td>
            <td>
            ${learnsOnLvl}
            </td>
        </tr>
        `;
    }
    pokemonMovesJSON = [];
}

function highlightMoves() {
    document.getElementById('base-stats-link').classList.remove('nav-bar-link-active');
    document.getElementById('about-link').classList.remove('nav-bar-link-active');
    document.getElementById('evolution-link').classList.remove('nav-bar-link-active');
    document.getElementById('moves-link').classList.add('nav-bar-link-active');
}

function getMovesHTML() {

    highlightMoves();

    document.getElementById('content-container').innerHTML = '';
    document.getElementById('content-container').innerHTML = `
    <div id="moves">

        <h2>Attacks through Lvl-Up</h2>

        <table id="lvl-table">

        </table>

        <div class="box"></div>

    </div>    
    `;
}

/*********************************************POKEMON MOVES ^***********************************************/