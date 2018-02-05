"use strict"
const mylink = "http://kea-alt-del.dk/t5/api/productlist";
const imagePath = "http://kea-alt-del.dk/t5/site/imgs/";
const catNames = "http://kea-alt-del.dk/t5/api/categories";
const main = document.querySelector("main");
const template = document.querySelector("template").content;

fetch(catNames).then(result => result.json()).then(data => createCatContainers(data));

function createCatContainers(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        const h2 = document.createElement("h2");
        section.id = category;
        h2.textContent = category;
        section.appendChild(h2);
        main.appendChild(section);
    });
    fetch(mylink).then(result => result.json()).then(data => show(data));
}

function show(data) {
    data.forEach(element => {
        const section = document.querySelector("#" + element.category);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + element.image + "-sm.jpg";
        if (element.name == "Russisk salatRussian salad") {
            element.name = "Russian salad";


        }
        clone.querySelector(".name").textContent = element.name;

        clone.querySelector(".short-description").textContent = element.shortdescription;
        clone.querySelector(".price span").textContent = element.price;


        if (element.alcohol) {

            clone.querySelector(".alcohol").textContent = "Contains alcohol " + element.alcohol + "%";
        }
        section.appendChild(clone);
    })
}
