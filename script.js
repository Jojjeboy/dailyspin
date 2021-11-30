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
let previusSpeakingMember;

const nameElm = document.getElementById('name');
const prevElm = document.getElementById('prev');
const nextElm = document.getElementById('next');

const debugElm = document.getElementById('debug');

const speachTime = 3;
let speachInterval;


document.addEventListener('DOMContentLoaded', onInit);



function onInit() {
    // Kommer köras när domen är klar
    listOfusers = getListOfNamesLeftToSpeakInLocalStorage();
    if (listOfusers === null || listOfusers.length < 1) {
        // Finns inget sparat i localstorage
        // Spara hela listan
        setListOfNamesLeftToSpeakInLocalStorage(allMembers);
        currentSpeakingMember = null;
    }
    else {
        // Hämta ut currentSpeakingMember
        currentSpeakingmember = getCurrrentSpeakingMemberInLocalStorage();
         
        if (currentSpeakingmember === null) {
            // Mötet har precis börjat, ingen har börjat prata
            // Visa statiskt Text
            setNameInDiv('Tryck nästa för att börja');
        }
        else {
            timing();
            // Det finns en person som 'pratar', skriv ut det till namn divven
            setNameInDiv(currentSpeakingmember);
        }

        // Hämta ut förra talaren
        previusSpeakingMember = getPreviusSpeakingMemberInLocalStorage();
    }
}


function onNextBtnClick() {
    timing();
    removeClass(nameElm,'done');
    

    // Spara undan föregående talare
    speakingMember = getCurrrentSpeakingMemberInLocalStorage();
    if (speakingMember !== undefined) {
        setPreviusSpeakingMemberInLocalStorage(speakingMember);
    }

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


function previousSpeaker() {
    setNameInDiv(previusSpeakingMember);
    setCurrrentSpeakingMemberInLocalStorage(previusSpeakingMember);
    prevElm.disabled = true;
}

function timing(){
    removeClass(nameElm,'timesUp');
    clearInterval(speachInterval);
    speachInterval = setInterval(function () {
        //console.log('times up');
        addClass(nameElm,'timesUp');
        clearInterval(speachInterval);
    }, speachTime * 1000);
}

function reset() {
    clearInterval(speachInterval);
    nextElm.disabled = false;
    //prevElm.disabled = true;

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
function getPreviusSpeakingMemberInLocalStorage() {
    return JSON.parse(localStorage.getItem('previusSpeakingMember'));
}
function setPreviusSpeakingMemberInLocalStorage(name) {
    localStorage.setItem('previusSpeakingMember', JSON.stringify(name));
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
        addClass(nameElm,'done');
        clearInterval(speachInterval);
        setNameInDiv('Klar');
        nextElm.disabled = true;
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
