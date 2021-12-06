export class LocalStorage {
    
    getListOfNamesLeftToSpeakInLocalStorage(): string[] {
        return JSON.parse(localStorage.getItem('listOfNamesLeftToSpeak'));
    }

    setListOfNamesLeftToSpeakInLocalStorage(listOfNamesLeftToSpeak: string[]) {
        localStorage.setItem('listOfNamesLeftToSpeak', JSON.stringify(listOfNamesLeftToSpeak));
    }

    getCurrrentSpeakingMemberInLocalStorage(): string {
        return JSON.parse(localStorage.getItem('currentSpeakingMember'));
    }

    getPrevousSpeakingMembersInLocalStorage(): string[] {
        return JSON.parse(localStorage.getItem('previusSpeakingMembers'));
    }

    setPrevousSpeakingMemberInLocalStorage(listOfNamesAlreadySpoken: string[]): void {
        if (listOfNamesAlreadySpoken === null) {
            localStorage.removeItem('previusSpeakingMembers');
        }
        else {
            localStorage.setItem('previusSpeakingMembers', JSON.stringify(listOfNamesAlreadySpoken));
        }
    }
    setCurrrentSpeakingMemberInLocalStorage(name: string): void {
        if (name === null) {
            localStorage.removeItem('currentSpeakingMember');
        }
        else {
            localStorage.setItem('currentSpeakingMember', JSON.stringify(name));
        }
    }

}