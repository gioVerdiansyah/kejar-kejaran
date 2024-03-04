const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = 500;


const createCircle = (x, y, radius, startAngle, endAngle, fillStyle = "white", img = null) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.closePath();
}

const drawBackground = () => {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 500);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

const drawScore = () => {
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.font = "20px sans-serif";
    who === "white" ? ctx.fillStyle = "red" : ctx.fillStyle = "white";

    ctx.fillText(`White: `, canvas.width / 2 - 50, 23);
    ctx.fillStyle = "white";
    ctx.fillText(score.white, (canvas.width / 2) - 18, 25);

    who === "red" ? ctx.fillStyle = "red" : ctx.fillStyle = "white";
    ctx.fillText(`Red:  `, canvas.width / 2 + 50, 23);
    ctx.fillStyle = "white";
    ctx.fillText(score.red, canvas.width / 2 + 71, 25);
    ctx.closePath();
}

const drawTime = () => {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, 30);
    ctx.lineTo(canvas.width / 2 + 100, 30);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.fillText(score.time, canvas.width / 2, 50);
    ctx.closePath();
}

const score = {
    red: 0,
    white: 0,
    time: 30
};

let who = "red";

const dBtn = {
    KeyD: false,
    KeyA: false,
    KeyW: false,
    KeyS: false,

    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

let c1x = 60;
let c1y = canvas.height / 2;

let c2x = canvas.width - 85;
let c2y = canvas.height / 2;

let redSpeed = 3;
let whiteSpeed = 5;

const setTime = setInterval(() => {
    score.time > 0 && score.time--;
}, 1000);

addEventListener('keydown', function(e) {
    if (dBtn.hasOwnProperty(e.code)) dBtn[e.code] = true;
});

addEventListener('keyup', function(e) {
    if (dBtn.hasOwnProperty(e.code)) dBtn[e.code] = false;
});

const core = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    controller();

    createCircle(c1x, c1y, 35, 0, Math.PI * 2);
    createCircle(c2x, c2y, 35, 0, Math.PI * 2, "red");

    drawScore();
    drawTime();
}, 1);

const reset = () => {
    c1x = 60;
    c1y = canvas.height / 2;
    c2x = canvas.width - 85;
    c2y = canvas.height / 2;

    score.time = 30;
}

const controller = () => {
    if (score.time <= 0) {
        if (who === "red") {
            score.white++;
        } else {
            score.red++;
        }
        reset();
    }

    if (calculateDistance(c2x, c2y, c1x, c1y) <= 70) {
        if (who === "red") {
            who = "white";
            score.red++;
            redSpeed = 5;
            whiteSpeed = 3;
        } else {
            who = "red";
            score.white++;
            redSpeed = 3;
            whiteSpeed = 5;
        }
        reset();
    }

    if (dBtn.KeyW && c1y >= 52) {
        c1y -= whiteSpeed;
    }
    if (dBtn.KeyS && c1y <= canvas.height - 54) {
        c1y += whiteSpeed;
    }
    if (dBtn.KeyD && c1x <= canvas.width - 54) {
        c1x += whiteSpeed;
    }
    if (dBtn.KeyA && c1x >= 54) {
        c1x -= whiteSpeed;
    }

    if (dBtn.ArrowUp && c2y >= 52) {
        c2y -= redSpeed;
    }
    if (dBtn.ArrowDown && c2y <= canvas.height - 54) {
        c2y += redSpeed;
    }
    if (dBtn.ArrowRight && c2x <= canvas.width - 54) {
        c2x += redSpeed;
    }
    if (dBtn.ArrowLeft && c2x >= 54) {
        c2x -= redSpeed;
    }
}

const calculateDistance = (mx, my, nx, ny) => {
    const rsx = Math.pow((nx - mx), 2);
    const rsy = Math.pow((ny - my), 2);
    const rsxy = Math.sqrt(rsx + rsy);
    return rsxy;
}

// const indo = new Image();
// indo.src = './img/indonesia-flag.png';

// indo.addEventListener('load', function() {
//     createCircle(50 + 10, canvas.height / 2, 50, 0, Math.PI * 2, "white", {
//         image: indo,
//         sx: 50,
//         sy: canvas.height / 2,
//         sw: 50,
//         sy: 50,
//     });
// })

// const aust = new Image();
// aust.src = "./img/australia-flag.jpg";

// aust.addEventListener('load', function() {
//     createCircle(canvas.width - 85, canvas.height / 2, 50, 0, Math.PI * 2, "white", {
//         image: aust,
//         sx: canvas.width - 80,
//         sy: canvas.height / 2,
//         sw: 50,
//         sy: 50,
//     });
// })