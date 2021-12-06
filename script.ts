
const debug: boolean = false;

let allMembers: string[] = [
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

let listOfNamesLeftToSpeak: string[] = [];
let listOfNamesAlreadySpoken: string[] = [];
let currentSpeakingMember: string;


const nameElm = <HTMLInputElement> document.getElementById("name");
const prevBtn = <HTMLInputElement> document.getElementById("prev");
const nextBtn = <HTMLInputElement> document.getElementById("next");
const resetBtn = <HTMLInputElement> document.getElementById("resetbtn");

const imSureBtn = <HTMLInputElement> document.getElementById("im-sure");
const notSureBtn = <HTMLInputElement> document.getElementById("not-sure");
const sure = <HTMLInputElement> document.getElementById("sure");
const debugElm = <HTMLInputElement> document.getElementById("debug");


const speachTime: number = 120;
let speachInterval: number;

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

function onNextBtnClick() {
    timing();
    removeClass(nameElm, 'done');
    resetBtn.disabled = false;

    // Spara undan föregående talare
    currentSpeakingMember = lStore.getCurrrentSpeakingMemberInLocalStorage();
    if (currentSpeakingMember !== undefined && currentSpeakingMember !== null) {
        listOfNamesAlreadySpoken.push(currentSpeakingMember);
        lStore.setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken);
    }

    if (listOfNamesAlreadySpoken.length < 1) {
        prevBtn.disabled = true;
    }
    else {
        prevBtn.disabled = false;
    }

    // Hämta ut ett random name från listan
    currentSpeakingMember = shiftNextFromList();
    if (currentSpeakingMember !== undefined) {

        lStore.setCurrrentSpeakingMemberInLocalStorage(currentSpeakingMember);
        setNameInDiv(currentSpeakingMember);
    }
    if (debug) {
        debugElm.innerHTML = listOfNamesLeftToSpeak.join(',');
    }
}


function onResetbtnClick() {
    removeClass(sure, 'hide');
    removeClass(imSureBtn, 'hide');
    removeClass(notSureBtn, 'hide');
    addClass(resetBtn, 'hide');
    addClass(prevBtn, 'hide');
    addClass(nextBtn, 'hide');
}

function onImSureClick() {
    addClass(sure, 'hide');
    addClass(imSureBtn, 'hide');
    addClass(notSureBtn, 'hide');
    removeClass(resetBtn, 'hide');
    removeClass(prevBtn, 'hide');
    removeClass(nextBtn, 'hide');
    reset();
}

function onImNotSuretClick() {
    addClass(sure, 'hide');
    addClass(imSureBtn, 'hide');
    addClass(notSureBtn, 'hide');
    removeClass(resetBtn, 'hide');
    removeClass(prevBtn, 'hide');
    removeClass(nextBtn, 'hide');
}


function onPreviusBtnClick() {
    clearInterval(speachInterval);
    timing();

    if (listOfNamesAlreadySpoken.length < 1) {
        prevBtn.disabled = true;
    }
    else {
        prevBtn.disabled = false;
    }

    if (listOfNamesAlreadySpoken.length > 0) {
        listOfNamesLeftToSpeak.unshift(currentSpeakingMember);
        lStore.setListOfNamesLeftToSpeakInLocalStorage(listOfNamesLeftToSpeak);

        currentSpeakingMember = listOfNamesAlreadySpoken.pop();
        lStore.setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken);
        setNameInDiv(currentSpeakingMember);
        lStore.setCurrrentSpeakingMemberInLocalStorage(currentSpeakingMember);
    }
    if (listOfNamesAlreadySpoken.length === 0) {
        prevBtn.disabled = true;
    }
}

function reset() {
    clearInterval(speachInterval);
    removeClass(nameElm, 'timesUp');
    removeClass(nameElm, 'done');
    nextBtn.disabled = false;
    prevBtn.disabled = true;
    resetBtn.disabled = true;

    // Hämta ut ett random name från listan
    lStore.setListOfNamesLeftToSpeakInLocalStorage(allMembers);
    listOfNamesAlreadySpoken = []
    lStore.setPrevousSpeakingMemberInLocalStorage(null);
    lStore.setCurrrentSpeakingMemberInLocalStorage(null);
    setNameInDiv('Tryck för att börja');
    if (!debug) {
        debugElm.innerHTML = '';
    }
    else {
        debugElm.innerHTML = allMembers.join(',');
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



/*
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
*/

function setNameInDiv(name) {
    nameElm.textContent = name;
}


function shiftNextFromList() {
    const nrOfPeopleLeftToSpeak = listOfNamesLeftToSpeak.length;

    if (nrOfPeopleLeftToSpeak) {

        currentSpeakingMember = listOfNamesLeftToSpeak.shift();

        listOfNamesLeftToSpeak = listOfNamesLeftToSpeak.filter(x => x !== currentSpeakingMember);
        lStore.setListOfNamesLeftToSpeakInLocalStorage(listOfNamesLeftToSpeak);


        return currentSpeakingMember;

    } else {
        // Vi är klara
        reset();
        addClass(nameElm, 'done');
        clearInterval(speachInterval);
        setNameInDiv('Klar');
        nextBtn.disabled = true;
        resetBtn.disabled = false;
    }
}

const onInit = (): void => {
    // Kommer köras när domen är klar
    listOfNamesLeftToSpeak = lStore.getListOfNamesLeftToSpeakInLocalStorage() || [];
    listOfNamesAlreadySpoken = lStore.getPrevousSpeakingMembersInLocalStorage() || [];
    if (listOfNamesLeftToSpeak.length < 1) {
        // Finns inget sparat i localstorage

        // Shuffla om listan så det är slumpmässigt vem som ska prata men 
        shuffle(allMembers);

        // Spara hela listan
        lStore.setListOfNamesLeftToSpeakInLocalStorage(allMembers);
        //currentSpeakingMember = null;
    }
    else {
        // Hämta ut currentSpeakingMember
        currentSpeakingMember = lStore.getCurrrentSpeakingMemberInLocalStorage();

        if (currentSpeakingMember === null) {
            
            // Mötet har precis börjat, ingen har börjat prata
            // Visa statiskt Text
            setNameInDiv('Tryck nästa för att börja');
        }
        else {
            timing();
            // Det finns en person som 'pratar', skriv ut det till namn divven
            setNameInDiv(currentSpeakingMember);
        }
    }

    if (listOfNamesAlreadySpoken.length < 1) {
        prevBtn.disabled = true;
        resetBtn.disabled = true;
        listOfNamesAlreadySpoken = [];
    }

    
let lStore = new LStore();
    
};
import { LStore } from './modules/lStore';

document.addEventListener('DOMContentLoaded', onInit);


