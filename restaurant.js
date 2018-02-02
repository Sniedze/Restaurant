let mylink = "http://kea-alt-del.dk/t5/api/productlist";
let imagePath = "http://kea-alt-del.dk/t5/site/imgs/small";
let main = document.querySelector("main");
let template = document.querySelector(".course");

function loadData(link) {
    fetch(link).then(e => e.json()).then(data => show(data));
}

function show(data) {
    data.forEach(object => console.log(object));
}
