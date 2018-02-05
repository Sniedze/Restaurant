let mylink = "http://kea-alt-del.dk/t5/api/productlist";
let imagePath = "http://kea-alt-del.dk/t5/site/imgs/small/";
const main = document.querySelector("#menu");
const template = document.querySelector(".course");

function loadData(link) {
    fetch(link).then(e => e.json()).then(data => show(data));
}

function show(data) {
    data.forEach(element => {
        let clone = template.cloneNode(true).content;
        clone.querySelector(".product-small-image").src = imagePath + element.image + "-sm.jpg";
        clone.querySelector(".name").textContent = element.name;
        clone.querySelector(".category").textContent = element.category;
        clone.querySelector(".short-description").textContent = element.shortdescription;
        clone.querySelector(".price span").textContent = element.price;
        main.appendChild(clone);
    });
}
loadData(mylink);
