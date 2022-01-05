
const score = document.querySelector(".score");
const game = document.querySelector(".game");
const gameArea = document.querySelector(".gameArea");
const loader = document.querySelector('.loader');
const hiScore = document.querySelector(".hiScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


let player = {
    speed: 9,
    score: 0
};

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

document.addEventListener("DOMContentLoaded",start,false);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);
hiScore.innerHTML = `Hi-Score : ${highScores[0].score}`;


function moveline() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(function(item) {

        if (item.y > 1500) {
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })

}


function collision(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) || (aRect.left > bRect.right)
    )

}

function moveenemy(car) {
    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function(item) {
        if (collision(car, item)) {
            console.log("Hit");
            endGame();
        }

        if (item.y > 1500) {
            item.y = -1000;
            item.style.left = Math.floor(Math.random() * 450) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";



    })
}

function playgame() {
    let car = document.querySelector(".car");
    moveline();
    moveenemy(car);
    let road = gameArea.getBoundingClientRect();

    if (player.start) {
        if (keys.ArrowDown && player.y < (road.bottom)) {
            player.y += player.speed
        }
        if (keys.ArrowUp && player.y > (road.top)) {
            player.y -= player.speed
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed
        }
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";


        window.requestAnimationFrame(playgame);
        player.score++;
        score.innerText = "Score : " + player.score;

    }
}

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(keys)
}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(keys);
}

function endGame() {
    player.start = false;
    localStorage.setItem('mostRecentScore', player.score);
    return window.location.assign('end.html');
    
    
   

}

function start() {
    loader.classList.add("hide");
  gameArea.classList.remove("hide");
    gameArea.innerHTML = "";
    score.classList.remove("hide");
    hiScore.classList.remove("hide");
    score.style.top = "0 px";
    player.start = true;
    player.score = 0;
    for (let x = 0; x < 10; x++) {
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 450;
        div.style.top = (x * 450) + "px";
        gameArea.appendChild(div);
    }


    window.requestAnimationFrame(playgame);

    let car = document.createElement("div");
    car.setAttribute("class", "car");

    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    console.log(player);


    for (let x = 0; x < 5; x++) {
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = ((x + 1) * 1000) * -1;
        enemy.style.top = enemy.y + "px";
        enemy.style.left = Math.floor(Math.random() * 450) + "px";
        enemy.style.backgroundImage = `url(${randomenemy()})`;
        gameArea.appendChild(enemy);
    }

    function randomenemy() {
        let mypic = new Array("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png");
        let randomnum = Math.floor(Math.random() * mypic.length);
        return mypic[randomnum];
    }




}