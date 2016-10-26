'use strict';

const title = document.createElement('h1');
title.textContent = 'Things To Do.';
title.className = 'title';
document.getElementById('top').appendChild(title);


const btn = document.createElement('button');
btn.textContent = 'Find Something To Do';
btn.className = 'btn';
btn.addEventListener("click", (e) => {
    console.log("clicked")
    navigator.geolocation.getCurrentPosition(sendPosition, error);
});

function sendPosition(pos) {
    console.log("sendPosition", pos)
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/firstdate", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(pos);
}

function error(err) {
  console.warn('ERROR (Code: ' + err.code + '): ' + err.message);
};
document.getElementById('main').appendChild(btn);