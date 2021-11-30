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

let listOfNamesAlreadySpoken = [];
let listOfNamesLeftToSpeak = [];
let currentSpeakingMember;
let previusSpeakingMember;

const nameElm = document.getElementById('name');
const prevElm = document.getElementById('prev');
const nextElm = document.getElementById('next');
const resetElm = document.getElementById('resetbtn');
const imSureElm = document.getElementById('im-sure');
const notSureElm = document.getElementById('not-sure');
const sure = document.getElementById('sure');

const debugElm = document.getElementById('debug');

const speachTime = 120;
let speachInterval;

document.addEventListener('DOMContentLoaded', onInit);

function onInit() {
    // Kommer köras när domen är klar
    listOfNamesLeftToSpeak = getListOfNamesLeftToSpeakInLocalStorage() || [];
    listOfNamesAlreadySpoken = getPrevousSpeakingMembersInLocalStorage() || [];
    if (listOfNamesLeftToSpeak.length < 1) {
        // Finns inget sparat i localstorage

        // Shuffla om listan så det är slumpmässigt vem som ska prata men 
        shuffle(allMembers);

        // Spara hela listan
        setListOfNamesLeftToSpeakInLocalStorage(allMembers);
        //currentSpeakingMember = null;
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
        //previusSpeakingMember = getPrevousSpeakingMembersInLocalStorage();
    }

    if (listOfNamesAlreadySpoken.length < 1) {
        prevElm.disabled = true;
        resetElm.disabled = true;
        listOfNamesAlreadySpoken = [];
    }
}


function onNextBtnClick() {
    timing();
    removeClass(nameElm, 'done');
    resetElm.disabled = false;

    // Spara undan föregående talare
    speakingMember = getCurrrentSpeakingMemberInLocalStorage();
    if (speakingMember !== undefined && speakingMember !== null) {
        listOfNamesAlreadySpoken.push(speakingMember);
        setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken);
    }

    if (listOfNamesAlreadySpoken.length < 1) {
        prevElm.disabled = true;
    }
    else {
        prevElm.disabled = false;
    }

    // Hämta ut ett random name från listan
    currentSpeakingMember = shiftNextFromList();
    if (currentSpeakingMember !== undefined) {

        setCurrrentSpeakingMemberInLocalStorage(currentSpeakingMember);
        setNameInDiv(currentSpeakingMember);
    }
    if (debug) {
        debugElm.innerHTML = listOfNamesLeftToSpeak;
    }

    if (listOfNamesLeftToSpeak.length < 1) {
        nextElm.disabled = true;
    }
    else {
        nextElm.disabled = false;
    }
}


function onResetbtnClick() {
    removeClass(sure, 'hide');
    removeClass(imSureElm, 'hide');
    removeClass(notSureElm, 'hide');
    addClass(resetElm, 'hide');
    addClass(prevElm, 'hide');
    addClass(nextElm, 'hide');
}

function onImSureClick() {
    addClass(sure, 'hide');
    addClass(imSureElm, 'hide');
    addClass(notSureElm, 'hide');
    removeClass(resetElm, 'hide');
    removeClass(prevElm, 'hide');
    removeClass(nextElm, 'hide');
    reset();
}

function onImNotSuretClick() {
    addClass(sure, 'hide');
    addClass(imSureElm, 'hide');
    addClass(notSureElm, 'hide');
    removeClass(resetElm, 'hide');
    removeClass(prevElm, 'hide');
    removeClass(nextElm, 'hide');
}


function onPreviusBtnClick() {
    clearInterval(speachInterval);
    timing();

    if (listOfNamesAlreadySpoken.length < 1) {
        prevElm.disabled = true;
    }
    else {
        prevElm.disabled = false;
    }

    if (listOfNamesAlreadySpoken.length > 0) {
        listOfNamesLeftToSpeak.unshift(currentSpeakingMember);
        setListOfNamesLeftToSpeakInLocalStorage(listOfNamesLeftToSpeak);

        currentSpeakingMember = listOfNamesAlreadySpoken.pop();
        setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken);
        setNameInDiv(currentSpeakingMember);
        setCurrrentSpeakingMemberInLocalStorage(currentSpeakingMember);
    }
    if (listOfNamesAlreadySpoken.length === 0) {
        prevElm.disabled = true;
    }
}

function reset() {
    clearInterval(speachInterval);
    removeClass(nameElm, 'timesUp');
    nextElm.disabled = false;
    prev.disabled = true;
    resetElm.disabled = true;

    // Hämta ut ett random name från listan
    setListOfNamesLeftToSpeakInLocalStorage(allMembers);
    listOfNamesAlreadySpoken = []
    setPrevousSpeakingMemberInLocalStorage(null);
    setCurrrentSpeakingMemberInLocalStorage(null);
    setNameInDiv('Tryck för att börja');
    if (!debug) {
        debugElm.innerHTML = '';
    }
    else {
        debugElm.innerHTML = allMembers;
    }
}

function timing() {
    removeClass(nameElm, 'timesUp');
    clearInterval(speachInterval);
    speachInterval = setInterval(function () {
        //console.log('times up');
        addClass(nameElm, 'timesUp');
        clearInterval(speachInterval);
    }, speachTime * 1000);
}




function getListOfNamesLeftToSpeakInLocalStorage() {
    return JSON.parse(localStorage.getItem('listOfNamesLeftToSpeak'));
}
function setListOfNamesLeftToSpeakInLocalStorage(names) {
    listOfNamesLeftToSpeak = names;
    localStorage.setItem('listOfNamesLeftToSpeak', JSON.stringify(names));
}


function getCurrrentSpeakingMemberInLocalStorage() {
    return JSON.parse(localStorage.getItem('currentSpeakingMember'));
}

function getPrevousSpeakingMembersInLocalStorage() {
    return JSON.parse(localStorage.getItem('previusSpeakingMembers'));
}
function setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken) {
    if (listOfNamesAlreadySpoken === null) {
        localStorage.removeItem('previusSpeakingMembers');
    }
    else {
        localStorage.setItem('previusSpeakingMembers', JSON.stringify(listOfNamesAlreadySpoken));
    }


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


function shiftNextFromList() {
    const nrOfPeopleLeftToSpeak = listOfNamesLeftToSpeak.length;

    if (nrOfPeopleLeftToSpeak) {

        currentSpeakingMember = listOfNamesLeftToSpeak.shift();

        listOfNamesLeftToSpeak = listOfNamesLeftToSpeak.filter(x => x !== currentSpeakingMember);
        setListOfNamesLeftToSpeakInLocalStorage(listOfNamesLeftToSpeak);


        return currentSpeakingMember;

    } else {
        // Vi är klara
        reset();
        addClass(nameElm, 'done');
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


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}