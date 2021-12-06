export class LStore {
    
    getListOfNamesLeftToSpeakInLocalStorage = function() {
        return JSON.parse(localStorage.getItem('listOfNamesLeftToSpeak'));
    }

    setListOfNamesLeftToSpeakInLocalStorage = function(names) {
        localStorage.setItem('listOfNamesLeftToSpeak', JSON.stringify(names));
    }

    getCurrrentSpeakingMemberInLocalStorage = function() {
        return JSON.parse(localStorage.getItem('currentSpeakingMember'));
    }

    getPrevousSpeakingMembersInLocalStorage = function() {
        return JSON.parse(localStorage.getItem('previusSpeakingMembers'));
    }

    setPrevousSpeakingMemberInLocalStorage = function(listOfNamesAlreadySpoken) {
        if (listOfNamesAlreadySpoken === null) {
            localStorage.removeItem('previusSpeakingMembers');
        }
        else {
            localStorage.setItem('previusSpeakingMembers', JSON.stringify(listOfNamesAlreadySpoken));
        }
    }
    setCurrrentSpeakingMemberInLocalStorage = function(name) {
        if (name === null) {
            localStorage.removeItem('currentSpeakingMember');
        }
        else {
            localStorage.setItem('currentSpeakingMember', JSON.stringify(name));
        }
    }

}