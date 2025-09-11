// below returns the response as json and logging it

// base URL
const baseURL = "https://potterapi-fedeperin.vercel.app";
fetch(baseURL).then(response => response.json()).then(json => console.log(json));

// get language from dropdown's option value - how??
// thank you chat.gpt - did not know how to specifically pull the value of a dropdown, but now know
    // to pull the entire element's ID and then have .value on the end since that is what is returned from the dropdown
const dropdown = document.getElementById("languageDrop");
let lang = document.getElementById("languageDrop").value; 
//let lang = "en";

//SPELLS!!!!
const spellButton = document.getElementById("spellButton");
const printSpell = document.getElementById("printSpell");
const printSpellUse = document.getElementById("printSpellUse");

// found in documentation, just fixed for my purposes
// language not always the same, include that variable
spellButton.addEventListener("click", async () => {
    // erase current spell
    printSpell.innerHTML = "";
    printSpellUse.innerHTML = "";

    //console.log("spell button");
    const response = await fetch(`${baseURL}/${lang}/spells/random`);
    //const response = await fetch('https://potterapi-fedeperin.vercel.app/en/spells/random');

    // show us what the error is if with fetching
    if (!response.ok){
        const text = await response.text();
        throw new Error(text);
    }
    else {
        console.log("response OK");
        //console.log(response);
    }

    const json = await response.json();

    // spells formatted as: {spell: name, use: use, idex: index}
    // since {} use . notaion with the keys
    console.log(json.spell, json.use);

    printSpell.innerHTML = json.spell;
    printSpellUse.innerHTML = json.use;

    return json;
});



//CHARACTERS - shows name and house - edits CSS too!!
const charButton = document.getElementById("charButton");
const printCharName = document.getElementById("charName");
const printCharHouse = document.getElementById("charHouse");
const printCharPic = document.getElementById("charPic");

//css variables
const logo = document.getElementById("logo");

charButton.addEventListener("click", async () => {

    // erase current characters
    printCharName.innerHTML = "";
    printCharHouse.innerHTML = "";


    //console.log("char button");
    const response = await fetch(`${baseURL}/${lang}/characters/random`);

    // show us what the error is if with fetching
    if (!response.ok){
        const text = await response.text();
        throw new Error(text);
    }
    else {
        console.log("response OK");
        //console.log(response);
    }

    const json = await response.json();

    // spells formatted as: {fullName, nickname, hogwartsHouse, interpretedBy, children, image, birthdate, index}
    // since {} use . notaion with the keys
    console.log(json);

    printCharName.innerHTML = `${json.fullName} (AKA ${json.nickname})`;
    printCharHouse.innerHTML = json.hogwartsHouse;
    printCharPic.src = json.image;







    // have house determine background of website

    if(json.hogwartsHouse === "Gryffindor") {
        console.log("gryff");
        logo.style.backgroundColor = "rgb(100,30,30)";
    }
    else if(json.hogwartsHouse === "Hufflepuff") {
        console.log("huff");
        logo.style.backgroundColor = "rgb(195,154,28)";
    }
    else if(json.hogwartsHouse === "Ravenclaw") {
        console.log("raven");
        logo.style.backgroundColor = "rgb(61,47,34)";
    }
    else {
        console.log("slyth");
        logo.style.backgroundColor = "rgb(113,118,121)";
    }



    return json;
});


// when the dropdown changes, so does the lang variable and the buttons' text
// not making API calls, so just regular function
dropdown.addEventListener("change", () => {
    lang = document.getElementById("languageDrop").value; 
    console.log("lang is " + lang);
    
    if (lang == "es") {
        charButton.innerHTML = "¿Qué personaje eres?";
        spellButton.innerHTML = "¡Aprende nuevos hechizos!";
    }
    else if (lang == "fr") {
        charButton.innerHTML = "Quel personnage es-tu ?";
        spellButton.innerHTML = "Apprenez de nouveaux sorts !";
    }
    else if (lang == "it") {
        charButton.innerHTML = "Quale personaggio sei?";
        spellButton.innerHTML = "Impara nuovi incantesimi!";
    }
    else if (lang == "pt") {
        charButton.innerHTML = "Qual personagem você é?";
        spellButton.innerHTML = "Aprenda novos feitiços!";
    }
    else if (lang == "uk") {
        charButton.innerHTML = "Який ти персонаж?";
        spellButton.innerHTML = "Вивчайте нові заклинання!";
    }
    // this just keeps all as english
    else {
        charButton.innerHTML = "Which Character Are You?";
        spellButton.innerHTML = "Learn New Spells!";
    }
})