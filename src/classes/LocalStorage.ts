export class LocalStorage {
    
    getListOfNamesLeftToSpeakInLocalStorage() {
        return JSON.parse(localStorage.getItem('listOfNamesLeftToSpeak'));
    }

    setListOfNamesLeftToSpeakInLocalStorage(names) {
        localStorage.setItem('listOfNamesLeftToSpeak', JSON.stringify(names));
    }

    getCurrrentSpeakingMemberInLocalStorage() {
        return JSON.parse(localStorage.getItem('currentSpeakingMember'));
    }

    getPrevousSpeakingMembersInLocalStorage() {
        return JSON.parse(localStorage.getItem('previusSpeakingMembers'));
    }

    setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken) {
        if (listOfNamesAlreadySpoken === null) {
            localStorage.removeItem('previusSpeakingMembers');
        }
        else {
            localStorage.setItem('previusSpeakingMembers', JSON.stringify(listOfNamesAlreadySpoken));
        }
    }
    setCurrrentSpeakingMemberInLocalStorage(name) {
        if (name === null) {
            localStorage.removeItem('currentSpeakingMember');
        }
        else {
            localStorage.setItem('currentSpeakingMember', JSON.stringify(name));
        }
    }

}