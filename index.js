let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".rst-btn")
let newGamebtn = document.querySelector(".btn")
let msgContainer = document.querySelector(".msg-container")
let wrapper = document.querySelector(".wrapper")
let msg = document.querySelector(".msg")
let danceImage = document.querySelector('.imgbox').getElementsByTagName('img')[0]
let music = new Audio("./asset/music.mp3")
let audioTurn = new Audio("./asset/ting.mp3")
let gameover = new Audio("./asset/gameover.mp3")
let turn0 = true;
let count =0 ;
let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [6, 7, 8],
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("The box is clicked");
        if (turn0) {
            box.style.color="cadetblue"
            box.innerText = "O";
            audioTurn.play();
            turn0 = false;
        } else {
            box.style.color="burlywood"
            box.innerText = "X";
            audioTurn.play();
            turn0 = true;
        }
        box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if(count == 9 && !isWinner){
        gameDraw()
    }
});
});


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide")
    music.pause();
}

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`
    msgContainer.classList.remove("hide")
    danceImage.style.width = "200px";
    music.play()
    disableBoxes();
    
}

const gameDraw = () => {
    gameover.play();
    msg.innerText='Game was a Draw'
    msgContainer.classList.remove("hide")
    danceImage.style.width = "0px"
    disableBoxes()
}

const checkWinner = () => {
    for (pattern of winningPattern) {
        let pos1 = boxes[pattern[0]].innerText
        let pos2 = boxes[pattern[1]].innerText
        let pos3 = boxes[pattern[2]].innerText
        if(pos1!="" && pos2!="" && pos3!=""){
        if(pos1==pos2 && pos2==pos3){
            showWinner(pos1)
        }
     }
    }
};

newGamebtn.addEventListener("click", resetGame)
resetbtn.addEventListener("click", resetGame)

