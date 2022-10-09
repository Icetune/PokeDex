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

async function loadPokemonAPIs() {

    let url = `https://pokeapi.co/api/v2/pokemon/marill`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded Pokemon:', currentPokemon); //General API


    let pokemonID = currentPokemon['id'];
    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`;
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    pokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // Species API

    console.log('Pokemon Spezies:', pokemonSpeciesAsJson);


    let pokemonEvolutionURL = pokemonSpeciesAsJson['evolution_chain']['url'];
    let pokemonEvolution = pokemonEvolutionURL;
    let pokemonEvolutionResponse = await fetch(pokemonEvolution);
    pokemonEvolutionAsJson = await pokemonEvolutionResponse.json(); // Evolution API

    console.log('Pokemon Evolution :', pokemonEvolutionAsJson);

    renderPokemon();
}

function renderPokemon() {
    renderPokemonInfo();
    renderPokemonDescription();
}

function upperCaseFirstLetter(someWord) {
    let firstLetter = String(someWord.charAt(0)).toLocaleUpperCase();
    upperCaseWord = firstLetter + someWord.slice(1);
    return upperCaseWord;
}

/*********************************************GENERAL ^***********************************************/

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
    document.getElementById('pokedex').style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}

function setBackgroundForTwoTypes() {
    let backgroundColor1 = backgroundColors1[0][currentPokemonType1];
    let backgroundColor2 = backgroundColors1[0][currentPokemonType2];
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

async function renderPokemonDescription() {
    renderEnglishDescription();
    renderGeneralInfos();
}

function renderEnglishDescription() {
    renderAboutHTML();
    for (let i = 10; i < 25; i++) { // 15 descriptions will be checked to find an english one
        if (pokemonSpeciesAsJson['flavor_text_entries'][`${i}`]['language']['name'] == 'en') {
            let pokemonDescription = pokemonSpeciesAsJson['flavor_text_entries'][`${i}`]['flavor_text'];
            document.getElementById('pokemon-description').innerHTML = pokemonDescription;
        } else {}
    }
}

function renderGeneralInfos() {
    renderAbilities();
    renderPokemonWeight();
    checkAndRenderIfLegendary();
    renderGenera();
    renderShape();
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
    let pokemonWeight =+ (currentPokemon['weight'] / 10)
    document.getElementById('weight').innerHTML = `${pokemonWeight} Kg`;
}

function checkAndRenderIfLegendary() {
    if(pokemonSpeciesAsJson['is_legendary'] == true) {
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

function renderAboutHTML() {

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
    
    `;

}

/*********************************************POKEMON ABOUT ^***********************************************/

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
            document.getElementById('first-evolution').innerHTML = `Min. Happiness of ${minFriendship}`;
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
            document.getElementById('second-evolution').innerHTML = `Min. Happiness of ${minFriendship}`;
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
    let unnecessaryItems = ['second-ev-trigger','third-evolution-name','third-evolution-container',];
    for (let i = 0; i < unnecessaryItems.length; i++) {
        const id = unnecessaryItems[i];
        document.getElementById(`${id}`).style ='display:none;';
    }
}

function noSecondOrThirdStage() {
    document.getElementById('evolution-2').src = '';
    document.getElementById('evolution-3').src = '';
    let unnecessaryItems = ['first-ev-arrow','second-evolution-name','second-evolution-container','second-ev-trigger','third-evolution-name','third-evolution-container',];
    for (let i = 0; i < unnecessaryItems.length; i++) {
        const id = unnecessaryItems[i];
        document.getElementById(`${id}`).style ='display:none;';
    }
    document.getElementById('first-evolution').innerHTML = 'No Futher Evolution'
}

function loadEvolutionHTML() {
    document.getElementById('content-container').innerHTML = '';
    document.getElementById('content-container').innerHTML = `
    
    <div class="evolution-container">

        <div id="first-evolution-name" class="evolution-name"></div>

        <div class="evolution-img-container">
            <img id="evolution-1" class="evolution-img" src="">
            <img class="evolution-img-background" src="icons/pokeball.png">
        </div>

        <div class="evolution-trigger" style="position: relative; bottom: 55px;">
            <div id="first-evolution"></div>
            <img id="first-ev-arrow" src="icons/pfeil-runter.png">
        </div>

        <div id="second-evolution-name" class="evolution-name" style="position: relative; bottom: 50px;"></div>

        <div id="second-evolution-container" class="evolution-img-container"
            style="position: relative; bottom: 50px;">
            <img id="evolution-2" class="evolution-img" src="">
            <img class="evolution-img-background" src="icons/pokeball.png">

        </div>

        <div id="second-ev-trigger" class="evolution-trigger" style="position: relative; bottom: 100px;">
            <div id="second-evolution"></div>
            <img src="icons/pfeil-runter.png">
        </div>

        <div id="third-evolution-name" class="evolution-name" style="position: relative; bottom: 95px;"></div>

        <div id="third-evolution-container" class="evolution-img-container"
            style="position: relative; bottom: 95px;">
            <img id="evolution-3" class="evolution-img" src="">
            <img class="evolution-img-background" src="icons/pokeball.png">
        </div>

    </div>
    
    `;
}

/*********************************************HELP FUNCTIONS ^**************************************************/

/*********************************************POKEMON EVOLUTION ^***********************************************/