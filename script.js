/* =========================================
   RANDOM STARS
========================================= */

function createStars(){

    const stars=document.querySelector(".stars");

    for(let i=0;i<180;i++){

        const star=document.createElement("div");

        star.className="star";

        const size=Math.random()*3+1;

        star.style.width=size+"px";
        star.style.height=size+"px";

        star.style.left=Math.random()*100+"%";
        star.style.top=Math.random()*100+"%";

        star.style.animationDuration=
            (2+Math.random()*4)+"s";

        star.style.animationDelay=
            Math.random()*5+"s";

        stars.appendChild(star);

    }

}
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const container = document.querySelector(".container");
const celebration = document.getElementById("celebration");
/* ===============================
   INTRO SCREEN
================================ */

const introScreen = document.getElementById("introScreen");
const introText = document.getElementById("introText");

const introLines = [

    "Oi Dellu... ❤️",

    "Every day with you\nfeels a little more special...",

    "Your smile\nmakes even my worst days\nfeel brighter...",

    "I don't know\nwhat the future holds...",

    "But there's one thing\nI know for sure...",

    "I want you\nby my side...",

    "Forever... ❤️",

    "💍"

];

const texts = [
    "Really? 🥺",
    "Don't 🫠",
    "Oi gali aaiduva 😤👺",
    "Don't.....😣",
    "Oiii avalodha unnaa 🤧😞",
    "Vera valiye illa 🤣🙉"
];

let attempts = 0;
let lock = false;

// Move NO button
function moveNo() {

    if (lock) return;
    lock = true;

    message.innerHTML = texts[Math.min(attempts, texts.length - 1)];

    // Grow YES button
    yesBtn.style.transform = `scale(${1 + attempts * 0.08})`;

    attempts++;

    // Hide after 6 escapes
    if (attempts >= 6) {

        noBtn.style.display = "none";
        message.innerHTML = "Oodu unnaku vera valiye illa 🤣❤️";

        lock = false;
        return;
    }

    const rect = noBtn.getBoundingClientRect();

    let x = Math.random() * (window.innerWidth - rect.width - 30);
    let y = Math.random() * (window.innerHeight - rect.height - 30);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.zIndex = "9999";

    setTimeout(() => {
        lock = false;
    }, 500);

}

document.addEventListener("mousemove", (e) => {

    if (lock) return;

    // Don't do anything if NO is already gone
    if (noBtn.style.display === "none") return;

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) +
        Math.pow(e.clientY - centerY, 2)
    );

    // Only move when the mouse gets close
    if (distance < 100) {
        moveNo();
    }

});

// Mobile
noBtn.addEventListener("touchstart", function(e){
    e.preventDefault();
    moveNo();
});

// YES Button
yesBtn.addEventListener("click", () => {

    yesBtn.classList.add("yesClicked");

    const ring = document.querySelector(".ring");

    ring.classList.add("ringCelebrate");

});
/* ===============================
   TYPEWRITER FUNCTIONS
================================ */

let currentLine = 0;

function typeLine(text, callback){

    introText.innerHTML = "";

    let i = 0;

    const timer = setInterval(()=>{

        if(i < text.length){

            if(text[i] === "\n"){

                introText.innerHTML += "<br>";

            }else{

                introText.innerHTML += text[i];

            }

            i++;

        }else{

            clearInterval(timer);

            setTimeout(callback,1500);

        }

    },45);

}
/* =====================================
   CINEMATIC INTRO
=====================================*/

function startIntro() {

    introText.classList.add("showIntro");

    typeLine("Oi Dellu... ❤️", () => {

        typeLine("Every day with you feels magical...", () => {

            typeLine("You make my ordinary days extraordinary.", () => {

                typeLine("There's something I've wanted to ask...", () => {

                    introScreen.classList.add("fadeOut");

                    setTimeout(() => {
introScreen.style.display = "none";
document.querySelector(".background").classList.add("zoomScene");
container.classList.remove("hidden");

// Small pause after the intro
setTimeout(() => {

    requestAnimationFrame(() => {

        container.classList.add("show");

        // Start floating only after the entrance animation finishes
        setTimeout(() => {

            container.style.animation =
                "floatCard 5s ease-in-out infinite";

        },1400);

    });

},600);

// Show hearts & petals after intro
document.querySelector(".hearts").classList.add("show");
document.querySelector(".petals").classList.add("show");

// Start hearts
document.querySelector(".hearts").style.opacity = "1";

// Start petals
document.querySelector(".petals").style.opacity = "1";

                    },1000);

                });

            });

        });

    });

}

window.onload = () => {

    createStars();

    startIntro();

};