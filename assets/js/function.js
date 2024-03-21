const fightsection = document.getElementById('fight');
const fightmsg = document.getElementById('fight-msg');
const payerattack = document.getElementById('player-attack');
const pcattack = document.getElementById('pc-attack');
const Piedra = document.getElementById('piedra');
const Papel = document.getElementById('papel');
const Tijera = document.getElementById('tijeras');

let playerOption;
let pcOption;
let playerAttack;
let pcAttack;


const images = [
    {
        name: "Piedra",
        url: "../../assets/img/piedra2.png" 
    },
    {
        name: "Papel",
        url: "../../assets/img/papel2.png" 
    },
    {
        name: "Tijera",
        url: "../../assets/img/tijera2.png" 
    }
];



function start(){
    battleSection.style.display = 'none';
};

Piedra.addEventListener('click', function(){
    playerOption = "Piedra";
    PCop();
});

Papel.addEventListener('click', function(){
    playerOption = "Papel";
    PCop();
});

Tijera.addEventListener('click', function(){
    playerOption = "Tijera";
    PCop();
})


function PCop(){
    var random = nRandom();

    if(random == 0){
        pcOption = "Piedra";
    }else if(random == 1){
        pcOption = "Papel";
    }else if(random == 2){
        pcOption = "Tijera"
    };

    fight();

};

function fight(){
    if(playerOption == pcOption){
        fightmsg.innerHTML = "<p class=text-warning h3>¡Han empatado!</p>";
    }else if(playerOption == "Piedra" && pcOption == "Tijera"){
        fightmsg.innerHTML = "<p class=text-success h3>¡¡Has ganado!!</p>";
    }else if(playerOption == "Papel" && pcOption == "Piedra"){
        fightmsg.innerHTML = "<p class=text-success h3>¡¡Has ganado!!</p>";
    }else if(playerOption == "Tijera" && pcOption == "Papel"){
        fightmsg.innerHTML = "<p class=text-success h3>¡¡Has ganado!!</p>";
    }else{
        fightmsg.innerHTML = "<p class=text-danger h3>¡¡No!! Has pedido!</p>";
    };

    addImages();

}


function nRandom(){
    let n = Math.floor(Math.random() * 3);
    return n;
}


function addImages(){
    for(let i=0;i<images.length;i++){
        if(playerOption == images[i].name){
            playerImg = images[i].url;
            var inserta = `<img class="fight-img" src=${playerImg} alt="">`;
            payerattack.innerHTML = inserta;
        };
        
        if(pcOption == images[i].name){
            pcImg = images[i].url;
            var inserta = `<img class="fight-img" src=${pcImg} alt="">`;
            pcattack.innerHTML = inserta;
        };
        
    };


    seccionBatalla.style.display = 'flex';
};

window.addEventListener('load', start);