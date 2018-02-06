"use strict"
const mylink = "http://kea-alt-del.dk/t5/api/productlist";
const imagePath = "http://kea-alt-del.dk/t5/site/imgs/";
const catNames = "http://kea-alt-del.dk/t5/api/categories";
const main = document.querySelector("main");
const template = document.querySelector("template").content;
const nav = document.querySelector("#menu_nav");
const all = document.querySelector("#menu_nav a");

let h2 = document.querySelector("section h2");
all.addEventListener("click", () => filter("all"));

fetch(catNames).then(result => result.json()).then(data => createCatContainers(data));

function createCatContainers(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        const h2 = document.createElement("h2");
        section.id = category;

        h2.textContent = category;
        if (h2.textContent == "starter") {
            h2.textContent = "Starters";
        }
        if (h2.textContent == "main") {
            h2.textContent = "Main dishes";
        }
        if (h2.textContent == "dessert") {
            h2.textContent = "desserts";
        }

        section.appendChild(h2);
        main.appendChild(section);

        const a = document.createElement("a");
        a.textContent = category;
        if (a.textContent == "starter") {
            a.textContent = "Starters";
        }
        if (a.textContent == "main") {
            a.textContent = "Main dishes";
        }
        if (a.textContent == "dessert") {
            a.textContent = "desserts";
        }
        a.href = "#";
        a.addEventListener("click", () => filter(category));
        nav.appendChild(a);
    });
    fetch(mylink).then(result => result.json()).then(data => show(data));
}


function filter(category) {


    document.querySelectorAll("main section").forEach(section => {

        if (section.id == category || category == "all") {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");

        }
    })
}


function show(data) {
    data.forEach(element => {
        const section = document.querySelector("#" + element.category);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + element.image + "-sm.jpg";
        if (element.name == "Russisk salatRussian salad") {
            element.name = "Russian salad";
        }
        if (element.name == "Stake with vegetables") {
            element.name = "Steak with vegetables";
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
