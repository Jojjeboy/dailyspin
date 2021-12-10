
const debug: boolean = false;
import { LocalStorage } from './classes/LocalStorage.js';
import { DomHelper } from './classes/DomHelper.js';

const lStore = new LocalStorage();
const domHelper = new DomHelper();

const useMembers: string[] = [
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

let allMembers = [...useMembers];
let listOfNamesLeftToSpeak: string[] = [];
let listOfNamesAlreadySpoken: string[] = [];
let currentSpeakingMember: string;


const nameElm = <HTMLInputElement>document.getElementById("name");
const prevBtn = <HTMLInputElement>document.getElementById("prev");
const nextBtn = <HTMLInputElement>document.getElementById("next");
const resetBtn = <HTMLInputElement>document.getElementById("resetbtn");

const imSureBtn = <HTMLInputElement>document.getElementById("im-sure");
const notSureBtn = <HTMLInputElement>document.getElementById("not-sure");
const sure = <HTMLInputElement>document.getElementById("sure");
const debugElm = <HTMLInputElement>document.getElementById("debug");


const speachTime: number = 120;
let speachInterval: any;




function shuffle(array: string[]): string[] {
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


nextBtn.addEventListener("click", function () {
    timing();
    domHelper.removeClass(nameElm, 'done');

    // Spara undan föregående talare
    currentSpeakingMember = lStore.getCurrrentSpeakingMemberInLocalStorage();
    if (currentSpeakingMember !== undefined && currentSpeakingMember !== null) {
        listOfNamesAlreadySpoken.push(currentSpeakingMember);
        lStore.setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken);
    }

    // Hämta ut ett nytt namn från listan
    currentSpeakingMember = shiftNextFromList();
    if (currentSpeakingMember !== undefined) {

        lStore.setCurrrentSpeakingMemberInLocalStorage(currentSpeakingMember);
        domHelper.setNameInDiv(nameElm, currentSpeakingMember);
    }
    if (debug) {
        debugElm.innerHTML = listOfNamesLeftToSpeak.join(',');
    }

    updateBtnState();
});

resetBtn.addEventListener("click", function () {
    domHelper.removeClass(sure, 'hide');
    domHelper.removeClass(imSureBtn, 'hide');
    domHelper.removeClass(notSureBtn, 'hide');
    domHelper.addClass(resetBtn, 'hide');
    domHelper.addClass(prevBtn, 'hide');
    domHelper.addClass(nextBtn, 'hide');
});

imSureBtn.addEventListener("click", function () {
    domHelper.addClass(sure, 'hide');
    domHelper.addClass(imSureBtn, 'hide');
    domHelper.addClass(notSureBtn, 'hide');
    domHelper.removeClass(resetBtn, 'hide');
    domHelper.removeClass(prevBtn, 'hide');
    domHelper.removeClass(nextBtn, 'hide');
    reset();
});

notSureBtn.addEventListener("click", function () {
    domHelper.addClass(sure, 'hide');
    domHelper.addClass(imSureBtn, 'hide');
    domHelper.addClass(notSureBtn, 'hide');
    domHelper.removeClass(resetBtn, 'hide');
    domHelper.removeClass(prevBtn, 'hide');
    domHelper.removeClass(nextBtn, 'hide');
});



prevBtn.addEventListener("click", function () {
    clearInterval(speachInterval);
    domHelper.removeClass(nameElm, 'done');
    timing();

    if (listOfNamesAlreadySpoken.length > 0) {
        // Är null om man går tillbaka när det är redan är klart.
        if (currentSpeakingMember != null) {
            listOfNamesLeftToSpeak.unshift(currentSpeakingMember);
        }

        lStore.setListOfNamesLeftToSpeakInLocalStorage(listOfNamesLeftToSpeak);

        currentSpeakingMember = listOfNamesAlreadySpoken.pop() || '';
        lStore.setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken);
        domHelper.setNameInDiv(nameElm, currentSpeakingMember);
        lStore.setCurrrentSpeakingMemberInLocalStorage(currentSpeakingMember);
    }
    updateBtnState();
});

function reset(){
    lStore.clearAllKeys();
    window.location.reload();
}

function timing() {
    domHelper.removeClass(nameElm, 'timesUp');
    clearInterval(speachInterval);
    speachInterval = setInterval(function () {
        domHelper.addClass(nameElm, 'timesUp');
        clearInterval(speachInterval);
    }, speachTime * 1000);
}


function shiftNextFromList() {
    
    if (listOfNamesLeftToSpeak.length) {

        currentSpeakingMember = listOfNamesLeftToSpeak.shift() || '';
        if(currentSpeakingMember === 'Klar'){
            clearInterval(speachInterval);
            domHelper.addClass(nameElm, 'done');
        }

        listOfNamesLeftToSpeak = listOfNamesLeftToSpeak.filter(x => x !== currentSpeakingMember);
        lStore.setListOfNamesLeftToSpeakInLocalStorage(listOfNamesLeftToSpeak);

    } else {
        // Vi är klara
        //reset();
        domHelper.addClass(nameElm, 'done');

        currentSpeakingMember = 'Klar';

        domHelper.setNameInDiv(nameElm, currentSpeakingMember);
        lStore.setCurrrentSpeakingMemberInLocalStorage(currentSpeakingMember);
        clearInterval(speachInterval);
    }
    return currentSpeakingMember;
}



function updateBtnState(){
    
    // Föregående knapp
    if(listOfNamesAlreadySpoken.length > 0) {
        prevBtn.disabled = false;
    }
    else {
        prevBtn.disabled = true;
    }

    // Reset knapp
    if(listOfNamesAlreadySpoken.length > 0 || currentSpeakingMember !== null){
        resetBtn.disabled = false;
    }
    else {
        resetBtn.disabled = true;
    }


    // Nästa knapp
    if(currentSpeakingMember === 'Klar'){
        nextBtn.disabled = true;
    }
    else {
        nextBtn.disabled = false;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Kommer köras när domen är klar
    listOfNamesLeftToSpeak = lStore.getListOfNamesLeftToSpeakInLocalStorage() || [];
    listOfNamesAlreadySpoken = lStore.getPrevousSpeakingMembersInLocalStorage() || [];
    if (listOfNamesLeftToSpeak.length < 1) {
        // Finns inget sparat i localstorage

        // Shuffla om listan så det är slumpmässigt vem som ska prata  
        listOfNamesLeftToSpeak = allMembers;
        shuffle(listOfNamesLeftToSpeak);
        // Spara hela listan
        lStore.setListOfNamesLeftToSpeakInLocalStorage(listOfNamesLeftToSpeak);
        //currentSpeakingMember = null;
    }
    else {
        // Hämta ut currentSpeakingMember
        currentSpeakingMember = lStore.getCurrrentSpeakingMemberInLocalStorage();

        if (currentSpeakingMember === null) {

            // Mötet har precis börjat, ingen har börjat prata
            // Visa statiskt Text
            domHelper.setNameInDiv(nameElm, 'Tryck för att börja');
        }
        else {
            timing();
            // Det finns en person som 'pratar', skriv ut det till namn divven
            domHelper.setNameInDiv(nameElm, currentSpeakingMember);
        }
    }

    updateBtnState();
});


