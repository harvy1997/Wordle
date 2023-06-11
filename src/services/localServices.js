class localService {
    constructor() {
        this.config={
            method: "get",
            mode: "cors"
        } 
        this.words=[]
    }
    getLocal(name) {
        return JSON.parse(localStorage.getItem(name));
    }
    setLocal(name, objeto) {
        localStorage.setItem(name, JSON.stringify(objeto))
    }
    deleteLocal(name) {
        localStorage.removeItem(name)
    }
    setWords(words){
        this.words=words.split("\n");
    }
    getRandomWord(){
        return this.words[parseInt(Math.random()*this.words.length)];;
    }
    getFirstWord() {
        let word=""
        while(word.length!=5){
            word=this.getRandomWord()
        }
        return word
    }
    async getWords(){
        return fetch("https://gitlab.com/d2945/words/-/raw/main/words.txt",this.config); 
    }
}
export default new localService();