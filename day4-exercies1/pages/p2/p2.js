let sharedText = "";


export function initP2(){
    console.log("In initP2()")
    document.querySelector("#btn-save-text").onclick = readtext;
    document.querySelector("#text").innerText = sharedText;
    document.querySelector("#input-text").value = "";
}

export function getText(){
    return sharedText;
}


export function readtext(){
    sharedText = document.querySelector("#input-text").value;
    document.querySelector("#text").innerText = sharedText;
}
