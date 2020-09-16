const link =
    "https://spreadsheets.google.com/feeds/list/1eCMfGSpIylwq83kYmOGm6OkiDgJRlqHCrMDuH1qG5D0/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

//init=getData
//data=handleData
function getData() {
    fetch(link)
        .then((res) => res.json())
        .then(dataRecieved);
}

function dataRecieved(regions) {
    console.log(regions);
    const data = regions.feed.entry;
    createSections(data);
    createNavigation(data);
    showProducts(data);
}

function createNavigation(data) {
    let regions = [];
    data.forEach((location) => {
        if (!regions.includes(location.gsx$region.$t)) {
            regions.push(location.gsx$region.$t);
        }
    });
    regions.forEach((location) => {
        const a = document.createElement("a");
        a.textContent = location;
        a.setAttribute("href", `#${location}`);
        document.querySelector("nav").appendChild(a);
    });
}

function createSections(data) {
    let regions = [];
    data.forEach((location) => {
        if (!regions.includes(location.gsx$region.$t)) {
            regions.push(location.gsx$region.$t);
        }
    });
    regions.forEach((location) => {
        const section = document.createElement("section");
        section.setAttribute("id", location);
        const h2 = document.createElement("h2");
        h2.textContent = location;
        section.appendChild(h2);
        document.querySelector(".productlist").appendChild(section);
    });
}

function showProducts(products) {
    //loop through products
    products.forEach(showData);
}

function showData(singleRowData) {
    console.log("singleRowData - console");
    console.log(singleRowData.gsx$name.$t);

    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    const h3 = clone.querySelector("h3");
    h3.textContent = singleRowData.gsx$name.$t;
    const h4 = clone.querySelector("h4");
    h4.textContent = singleRowData.gsx$address.$t;

    //adding click event

    clone.querySelector("button").addEventListener("click", () => {
        showDetails(singleRowData);
    });

    //document.querySelector("main").appendChild(clone);
    document
        .querySelector(`section#${singleRowData.gsx$region.$t}`)
        .appendChild(clone);
}

//adding modal

const modal = document.querySelector(".modal-background");

function showDetails(data) {
    console.log(data)
    modal.querySelector(".modal-name").textContent = data.gsx$name.$t;
    modal.querySelector(".modal-region").textContent = data.gsx$region.$t;
    modal.querySelector(".modal-description").textContent = data.gsx$text.$t;
    modal.querySelector(".modal-activities").textContent = "ACTIVITIES: " + data.gsx$activities.$t;
    modal.querySelector(".modal-price").textContent = "FEE: " + data.gsx$price.$t + " DKK";
    modal.classList.remove("hide");
}

modal.addEventListener("click", () => {
    modal.classList.add("hide");
});
