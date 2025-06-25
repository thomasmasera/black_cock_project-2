console.log("JS game caricato");

const socket = new SockJS('/ws');
const stompClient = Stomp.over(socket);

const playerSymbol = sessionStorage.getItem('this_symbol');
const gameCode = sessionStorage.getItem('lobby_code');
const thisPlayer = sessionStorage.getItem('player');

let isMyTurn = (playerSymbol === "0"); //se è 0 mi restituisce true 
let game_status = "IN_PROGRESS"

document.querySelectorAll('.cella').forEach(cella => {
    cella.addEventListener('click', () => {
        if(!isMyTurn) return;
        if(cella.innerText !== "") return;
        cella.innerText = playerSymbol;
        isMyTurn = false;

        const cellId = cella.id;

        if(checkWin()){
            game_status = "WIN";
        } else if (checkDraw()){
            game_status = "DRAW";
        }
        
        const mossa = {
            cell: parseInt(cellId),
            status: game_status,
            player: thisPlayer
        }

        stompClient.send(`/app/${gameCode}`, {}, JSON.stringify(mossa));
    })
})

stompClient.connect({}, frame => {
  console.log("Connessione STOMP riuscita:", frame);

  stompClient.subscribe(`/topic/game/${gameCode}`, message => {
    const data = JSON.parse(message.body);
    
    const cellaId = data.cell;          
    const status = data.status; 
    const movePlayer = data.player;
    
    switch (status) {
        case "WIN":
            if (thisPlayer === movePlayer){
                alert("Hai vinto! 🎉");
            } else {
                alert("Hai perso 😢");
            }
            
        break;
        case "DRAW":
            alert("Pareggio 🤝");
        break;
    }

    if(status === "IN_PROGRESS"){
        console.log("messaggio ricevuto");
        isMyTurn = (function(){
            if (thisPlayer !== movePlayer){
                return true;
            } else {
                return false;
            }
        })();
        const cella = document.getElementById(cellaId);
        if (cella && cella.innerText === "") {
            // cella.innerText = playerSymbol === "0" ? "1" : "0"; //questo è tipo un if, mi guarda il mio simbolo e mi riempie la cella con un altro
            cella.innerText = (function(){
                if (playerSymbol === "0") {
                    return "1";
                } else {
                    return "0";
                }
            })();
        }
    } else {
        isMyTurn = false;

        // switch (status) {
        //     case "WIN":
        //         alert("Hai vinto! 🎉");
        //     break;
        //     case "LOSE":
        //         alert("Hai perso 😢");
        //     break;
        //     case "DRAW":
        //         alert("Pareggio 🤝");
        //     break;
        // }
    }
  
    });
});

function checkWin() {
  const board = Array.from(document.querySelectorAll('.cella'))
                     .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                     .map(cella => cella.innerText);

  const wins = [
    [0,1,2], [3,4,5], [6,7,8], // righe  cambiare i numeri partendo da 1
    [0,3,6], [1,4,7], [2,5,8], // colonne
    [0,4,8], [2,4,6]           // diagonali
  ];

  return wins.some(comb => comb.every(i => board[i] === playerSymbol));
}

function checkDraw() {
  return Array.from(document.querySelectorAll('.cella'))
              .every(cella => cella.innerText !== "");
}

document.getElementById('.restart-btn').addEventListener('reset', function(e){
    location.reload();
});
