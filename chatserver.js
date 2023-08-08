self.addEventListener("install", event =>{
    console.log("Service Worker se esta instalando...");
})

self.addEventListener("activate",()=>{
    console.log("Service Worker instalado correctamente")
})

self.addEventListener("error",()=>{
    console.log("nose que mierda paso pero hubo un error")
})

self.addEventListener("fetch",()=>{
    console.log("El Service Worker ha interceptado una solicitud entrante o saliente")
})

let window1 = undefined;
let window2 = undefined;

self.addEventListener("message",(e)=>{  // al recibir en msj, mostramos el msj en consola y enviamos una respuesta con e.source.postMessage
    if(window1==undefined) window1 = e.source;
    if(window1.id!=e.source.id) window2 = e.source;
    if(window1 !=undefined && window2 != undefined && window1.id!=window2.id){
        if(e.source.id==window1.id) window2.postMessage(e.data)
        if(e.source.id==window2.id) window1.postMessage(e.data)
        }
    }
)

