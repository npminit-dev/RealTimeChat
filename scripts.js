"use strict"

caches.keys().then(function(names) {
    for (let name of names)
        caches.delete(name);
});

if(navigator.serviceWorker) navigator.serviceWorker.register("chatserver.js")

const body = document.querySelector("body")
const input = document.querySelector(".writemsg")
const sendbutton = document.querySelector(".sendmsg")
const info = document.querySelector(".info")

addEventListener("load",(e)=> e.preventDefault())

function createMsg(msg,mode){
    let newdiv = document.createElement("DIV")
    newdiv.classList.add("message")
    newdiv.textContent = msg;
    if (mode==1) {
        newdiv.classList.add("sended")
        body.appendChild(newdiv)
    }
    else if (mode==2) {
        newdiv.classList.add("received")
        body.appendChild(newdiv)
    }
    else console.log("mode number incorrect")
}

function isEmpty(msg){
    let response = true;
    for(let i=0;i<msg.length;i++){
        if (msg[i]!=" ") response = false
    }
    return response;
}

function animateInfo(){
    setTimeout(()=>{info.animate([{opacity: "1"},{opacity: "0"}],{duration: 5000})},2000);
    setTimeout( e => {info.style.display = "none"},7000)
}

// document.getElementById("tunnel").animate([
//     // fotogramas clave
//     { transform: 'translateY(0px)' },
//     { transform: 'translateY(-300px)' }
//   ], {
//     // opciones de sincronización
//     duration: 1000,
//     iterations: Infinity
//   });

animateInfo()

sendbutton.addEventListener("click",(event)=>{
    if(!isEmpty(input.value)){
        navigator.serviceWorker.ready.then(res => res.active.postMessage(input.value))
        createMsg(input.value,1)
    }
})

input.addEventListener("keyup",(event)=>{
    if(!isEmpty(input.value) && event.key=="Enter"){
        navigator.serviceWorker.ready.then(res => res.active.postMessage(input.value))
        createMsg(input.value,1)
    }
})

navigator.serviceWorker.addEventListener("message",(e)=>{
    info.textContent = "CONNECTION SUCCESS! dont refresh pages or it won't work anymore"
    info.style.display = "inline-block"
    animateInfo();
    createMsg(e.data,2);
})
