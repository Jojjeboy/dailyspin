const debug = false;

let allMembers = [
    'Sandra',
    'Per',
    'Peter',
    'Rune',
    'Glemne',
    'Helena',
    'Alexander',
    'Frej',
    'Sander',
    'Marcus',
    'Andreas',
    'Belkis',
    'Bilal',
    'Kicki',
    'Johan',
    'Fredrik',
    'Rickard'
];


let listOfusers = [];
let currentSpeakingMember;
const nameElm = document.getElementById('name');
const debugElm = document.getElementById('debug');

const speachTime = 90;
let speachInterval;


document.addEventListener('DOMContentLoaded', onInit);



// 1. Först kolla om det finns en inläst lista i local storage
// 1a. Gör det det, ta den listan och använd den som lista
// 1b. Gör det inte det, spara ner listan med alla namn i local storage 
// 2. Plocka upp ett namn ur listan 
// 2a. Spara det i localstorage som currentSpeakingmember och läs in det i en variabel typ currentName och  och skriv ut de till html 
// 3. Ta bort det från listan och spara om listan i local storage


function onInit() {
    // Kommer köras när domen är klar
    listOfusers = getListOfNamesLeftToSpeakInLocalStorage();
    if (listOfusers === null || listOfusers.length < 1) {
        // Finns inget sparat i localstorage
        // Spara hela listan
        setListOfNamesLeftToSpeakInLocalStorage(allMembers);

    }
    else {
        // Finns namn i localstorage
        let currentSpeakingmember = getCurrrentSpeakingMemberInLocalStorage();
        // Hämta ut currentSpeakingMember

        if (currentSpeakingmember === null) {
            // Mötet har precis börjat, ingen har börjat prata
            // Visa statiskt Text
            setNameInDiv('Tryck för att börja');

        }
        else {
            timing();
            // Det finns en person som 'pratar', skriv ut det till namn divven
            setNameInDiv(currentSpeakingmember);
        }

    }

}


function onNameClick(evt) {


    if (evt.detail === 2) {
        onNextBtnClick();
    }
    else if (evt.detail === 3) {
        if (window.confirm('Starta om?')) {
            reset();
        }
    }
}



function onNextBtnClick() {
    timing();
    // Hämta ut ett random name från listan
    let currentSpeakingMember = popRandomNameFromLocalStorage();

    if (currentSpeakingMember !== undefined) {

        setCurrrentSpeakingMemberInLocalStorage(currentSpeakingMember);
        setNameInDiv(currentSpeakingMember);

    }
    if (debug) {
        debugElm.innerHTML = listOfusers;
    }
}

function timing(){
    removeClass(nameElm,'timesUp');
    clearInterval(speachInterval);
    speachInterval = setInterval(function () {
        console.log('times up');
        addClass(nameElm,'timesUp');
        clearInterval(speachInterval);
    }, speachTime * 1000);
}

function reset() {
    // Hämta ut ett random name från listan
    setListOfNamesLeftToSpeakInLocalStorage(allMembers);
    setCurrrentSpeakingMemberInLocalStorage(null);
    setNameInDiv('Tryck för att börja');
    if (!debug) {
        debugElm.innerHTML = '';
    }
    else {
        debugElm.innerHTML = allMembers;
    }
}


function getListOfNamesLeftToSpeakInLocalStorage() {
    return JSON.parse(localStorage.getItem('listOfNamesLeftToSpeak'));
}
function setListOfNamesLeftToSpeakInLocalStorage(names) {
    listOfusers = names;
    localStorage.setItem('listOfNamesLeftToSpeak', JSON.stringify(names));
}


function getCurrrentSpeakingMemberInLocalStorage() {
    return JSON.parse(localStorage.getItem('currentSpeakingMember'));
}
function setCurrrentSpeakingMemberInLocalStorage(name) {
    if (name === null) {
        localStorage.removeItem('currentSpeakingMember');
    }
    else {
        localStorage.setItem('currentSpeakingMember', JSON.stringify(name));
    }
}


function setNameInDiv(name) {
    nameElm.textContent = name;
}


function popRandomNameFromLocalStorage() {
    const l = listOfusers.length;

    if (l) {
        const current = Math.floor(Math.random() * l);

        const currentMember = listOfusers[current];

        listOfusers = listOfusers.filter(x => x !== currentMember);
        setListOfNamesLeftToSpeakInLocalStorage(listOfusers);


        return currentMember;

    } else {
        // Vi är klara
        reset();
        setNameInDiv('Klar');

        // Visa en starta om knapp
    }
}


function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}
