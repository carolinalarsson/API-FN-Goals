/*
1.  När en användare går in på sidan ska alla FN:s hållbarhetsmål hämtas från API:et och visas på sidan.
2.	Jag ska kunna klicka på ett mål och få mer information om dess sub-mål (s.k. targets).
3.	Visa upp i ett snyggt gränssnitt

Godkänd
·	Alla krav på funktionalitet är uppfyllda och följs.
·	Att fetch används och detta API https://unstats.un.org/SDGAPI/swagger/#/
·	Vettiga namn på variabler och funktioner på engelska.

Väl godkänd
·	Allt i godkänt.
·	Att du har delat upp din kod i ES6 moduler och skrivit några rader som en kommentar varför du delat upp din kod som du gjort.
·	Din sida är responsiv (d.v.s fungerar både i mobil och desktop).

Syfte
·	Kunna applicera datalogiskt tänkande och gå från idé till kod
·	Visa förståelse och kunna använda sig av programmeringens byggstenar (variabler, villkor, funktioner, loopar etc)
·	Visa förståelse för API:er och hur dessa kan användas*/

//URL:S for use
let base_url = 'https://unstats.un.org/SDGAPI';
let list_url = '/v1/sdg/Goal/List?';

// Function start starts when loading the page
document.querySelector("body").onload = showFNGoals();

// Function  - GETS the FN Goals when loading the page
async function showFNGoals() {
    const url = `${base_url + list_url}`;
    const response = await fetch(url);
    const data = await response.json();
    displayGoals(data);
}

// Function that DISPLAYS the FN Goals when loading the page
function displayGoals(goals) {

    const goalsWrapperElem = document.querySelector('#showGoalsHere');
    goalsWrapperElem.innerHTML = ''; 

    // Go through all of the FN Goals
    for (let goal of goals) {

        // Creates the code, title and description elements
        const codeDiv = document.createElement('div');
        codeDiv.setAttribute('class', 'goalDiv')
        const codeElem = document.createElement('h2');
        codeElem.innerHTML = 'Code: ' + goal.code;
        let goalCode = goal.code;
        codeDiv.appendChild(codeElem);
        //goalsWrapperElem.append(codeDiv);

        const goalElem = document.createElement('h3');
        goalElem.innerHTML = 'Title: ' + goal.title;
        codeDiv.appendChild(goalElem);
        //goalsWrapperElem.append(goalElem);

        const descriptionElem = document.createElement('p');
        descriptionElem.innerHTML = 'Description: ' + goal.description;
        codeDiv.appendChild(descriptionElem);
        goalsWrapperElem.append(codeDiv);

        //An eventlistener on every goal I click on

        goalElem.addEventListener('click', function () {
            console.log('Du klickade på: ', goal);
            document.getElementById("overlay").style.display = "block";
            showTargetsOfTheGoal(goalCode);
        });
    }
}

// Function that GETS the targets of the clicked goal
async function showTargetsOfTheGoal(goalCode) {

    const url = `https://unstats.un.org/SDGAPI/v1/sdg/Goal/${goalCode}/Target/List?&includechildren=true`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('array with targets: ', data);
    displayTargets(data);
}

import {displayTargets} from './FNtargets.js';

/* Used JS ES6 modules to divide the JS code into one main (FNindex.js) and one (FNtargets.js) where the targets are shown and can be closed
therefore 1 main (FNIndex) which is the "base" and (FNtargets) is the additional one, the one you can interact with and shows, hence my moduling*/