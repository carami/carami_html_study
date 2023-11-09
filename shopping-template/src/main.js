//data.json으로 부터 데이터를 받아옴.
function loadItems(){
    return fetch('data/data.json')
    // .then(response => console.log(response))  --  response가 무엇인지 확인
    .then(response => response.json())
    // .then(json => console.log(json))
    .then(json=>json.items);

}

function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item=>createHTMLString(item)).join('');
}

function createHTMLString(item){
    return `
        <li class="item" >
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
    `;
}


function onButtonClick(event, items){
    // console.log('test');
    console.log(items);
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null)
    return;

    displayItems(items.filter(item=>item[key] === value));
}
function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event,items));
}

//main
loadItems()
.then(items =>{
    // console.log(items)
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);