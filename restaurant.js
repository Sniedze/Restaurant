"use strict"
const productlink = "http://kea-alt-del.dk/t5/api/productlist";
const plink = "http://kea-alt-del.dk/t5/api/product?id=";
const imagePath = "http://kea-alt-del.dk/t5/site/imgs/";
const catNames = "http://kea-alt-del.dk/t5/api/categories";
const main = document.querySelector("main");
const template = document.querySelector("template").content;
const nav = document.querySelector("#menu_nav");
const all = document.querySelector("#menu_nav a");
const modal = document.querySelector(".modal_background");
let h2 = document.querySelector("section h2");

all.addEventListener("click", () => filter("all"));


fetch(catNames).then(result => result.json()).then(data => createCatContainers(data));

function createCatContainers(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        const h2 = document.createElement("h2");
        section.id = category;

        h2.textContent = category;
        section.appendChild(h2);
        main.appendChild(section);

        const a = document.createElement("a");
        a.textContent = category;
        if ((a, h2).textContent == "starter" || (a, h2).textContent == "main" || (a, h2).textContent == "dessert") {
            a.append("s");
            h2.append("s");
        }
        a.href = "#";
        a.addEventListener("click", () => filter(category));
        nav.appendChild(a);
    });
    fetch(productlink).then(result => result.json()).then(data => show(data));
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
        clone.querySelector(".price span").textContent = "Price " + element.price;
        clone.querySelector("button").addEventListener("click", () => {
            fetch(plink + element.id).then(result => result.json()).then(product => showDetails(product));
        })


        if (element.soldout) {
            clone.querySelector("article img").style.filter = "grayscale()";
            clone.querySelector("h5").classList.remove("hidden");
        }
        if (element.vegetarian) {

            clone.querySelector(".veg").textContent = "Suitable for Vegetarians";
        }
        if (element.alcohol) {

            clone.querySelector(".alcohol").textContent = "Contains alcohol " + element.alcohol + "%";
        }
        if (element.discount) {
            const newPrice = Math.ceil(element.price - element.price * element.discount / 100);
            clone.querySelector(".discountprice span").textContent = "New Price " + newPrice;
            clone.querySelector(".discountprice").classList.remove("hidden");
            clone.querySelector(".price").classList.add("strike");
        }
        section.appendChild(clone);

    })
}


function showDetails(product) {
    modal.querySelector(".modal_name").textContent = product.name;
    modal.querySelector(".modal_image").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + product.image + "-sm.jpg";
    modal.querySelector(".modal_description").textContent = product.longdescription;
    let price = modal.querySelector(".modal_price");
    if (product.discount) {
        const newPrice = Math.floor(product.price - (product.price * product.discount / 100));
        price.textContent = "Now " + newPrice + " kr.";
    } else {
        price.textContent = "Price " + product.price + " kr.";
    }

    modal.classList.remove("hidden");
}
modal.addEventListener("click", hideModal);

function hideModal() {
    modal.classList.add("hidden");
}
