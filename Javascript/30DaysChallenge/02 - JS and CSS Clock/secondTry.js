class Hand{
    constructor(hand, time, modulo){
        this.hand = hand;
        this.modulo = modulo;
        this.time = time%modulo;
        this.refreshHand();
    }

    toDegree() {
        return this.time/this.modulo*360
    }

    refreshHand(){
        console.log(this.time);
        if(this.time != 0){
            this.hand.style.transition = "all 0.5s"
            this.hand.style.transform = `rotate(${this.toDegree()}deg)`;
        } else {
            this.hand.style.transform = "rotate(360deg)";
            this.hand.style.transition = "all 0s"
            this.hand.style.transform = "rotate(0deg)"
        }
    }

    refreshTime(time){
        this.time = time%this.modulo
        this.refreshHand();
    }
}

date = new Date;

const hourHand = new Hand(document.querySelector('.hour-hand'), date.getHours(), 12);
const minHand = new Hand(document.querySelector('.min-hand'), date.getMinutes(), 60);
const secondHand = new Hand(document.querySelector('.second-hand'), date.getSeconds(), 60);
console.log(secondHand);

refresh = setInterval(()=>{
    date = new Date;
    hourHand.refreshTime(date.getHours());
    minHand.refreshTime(date.getMinutes());
    secondHand.refreshTime(date.getSeconds());
}, 100)



/* A ameliorer :
    La transition depuis la seconde 59 vers la seconde 0 fait revenir l'aiguille en arrière au lieu de continuer la rotation
*/