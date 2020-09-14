const link = "https://spreadsheets.google.com/feeds/list/1eCMfGSpIylwq83kYmOGm6OkiDgJRlqHCrMDuH1qG5D0/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

function getData() {
    fetch(link)
    .then(res => res.json())
    .then(handleData);
}

function handleData(data) {
    const myData = data.feed.entry;
    console.log("myData - console");
    console.log(myData);
    myData.forEach(showData);
}

function showData(singleRowData) {
    console.log('singleRowData - console');
    console.log(singleRowData.gsx$name.$t);

    const template = document.querySelector('template').content;
    const clone = template.cloneNode(true);
    const h3 = clone.querySelector('h3');
    h3.textContent = singleRowData.gsx$name.$t;
    const h4 = clone.querySelector('h4');
    h4.textContent = singleRowData.gsx$address.$t;

    document.querySelector('main').appendChild(clone);
}
