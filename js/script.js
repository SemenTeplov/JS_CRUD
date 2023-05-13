let inputBox = document.getElementsByClassName("inputItem");
inputBox[0].style.display = "none";

let settingBox = document.getElementsByClassName("setting");
settingBox[0].style.display = "none";

document.querySelector('.list').innerHTML = localStorage.getItem('list');

for (let button of document.getElementsByTagName("span")) {
    button.addEventListener('click', function() {
        if (this.style.color == 'rgb(255, 136, 0)') {
            this.style.color = 'green';
            this.innerHTML = '&#9745';  
        }
        else {
            this.style.color = '#ff8800';
            this.innerHTML = '&#65794';  
        }     
    });
}
for (let task of document.getElementsByClassName("listTasks")) {
    task.children[1].children[1].addEventListener('click', function() {
        task.outerHTML = '';   
    });
}

function openBox() {  
    if (inputBox[0].style.display == "none") {
        inputBox[0].style.display = "block";
    }
    else if (inputBox[0].style.display == "block") {
        inputBox[0].style.display = "none";
    }
}
function openSetting() {
    if (settingBox[0].style.display == "none") {
        settingBox[0].style.display = "block";
    }
    else if (settingBox[0].style.display == "block") {
        settingBox[0].style.display = "none";
    }
}

function clearItems() {
    let elems = document.querySelector('.list');

    elems.innerHTML = '';
}

function createItem() {
    let ok = document.querySelector('.inText');
    let date = document.querySelector('.inDate');

    if (ok.value != '') {
        let listTasks = document.createElement('div');
        listTasks.style.padding = "10px";

        listTasks.classList.add('listTasks');
        listTasks.innerHTML = `<p><span style="color: #ff8800">&#65794</span> ${ok.value}</p><div style="display: flex; justify-content: right"><p>${date.value}</p><p class="buttonDelete">&#128465</p></div>`;

        ok.value = null;
        date.value = null;

        listTasks.children[0].addEventListener('click', function() {
            let elems = listTasks.children;

            if (elems[0].children[0].style.color == 'rgb(255, 136, 0)') {
                elems[0].children[0].style.color = 'green';
                elems[0].children[0].innerHTML = '&#9745';  
            }
            else {
                elems[0].children[0].style.color = '#ff8800';
                elems[0].children[0].innerHTML = '&#65794';  
            }     
        });

        listTasks.children[1].children[1].addEventListener('click', function() {
            listTasks.outerHTML = '';
        });

        document.querySelector('.list').append(listTasks);

        localStorage.clear();
        localStorage.setItem("list", document.querySelector('.list').innerHTML);
    }
}

function rgb2hex(rgb) {
    var rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
};

let bColorList = document.querySelector('.list');
let inColor = document.querySelector('.inColor');
let body = document.querySelector('body');
let inNumber = document.querySelector('.inNumber');
let inputItem = document.querySelector('.inputItem');
let setting = document.querySelector('.setting');
let buttonsMenu = document.getElementsByClassName('addItem');
let buttonsOk = document.getElementsByClassName('okItems');

if (document.cookie != null) {
    let cookColor = document.cookie.slice(7, 15);

    bColorList.style.backgroundColor = cookColor;
    inputItem.style.backgroundColor = cookColor;
    setting.style.backgroundColor = cookColor;

    for (let button of buttonsMenu) {
        button.style.backgroundColor = cookColor;
    }

    for (let button of buttonsOk) {
        button.style.backgroundColor = cookColor;
    }
}

inColor.value = rgb2hex(bColorList.style.backgroundColor);
inNumber.value = body.style.fontSize.slice(0, -2);

function onSetting() {
    bColorList.style.backgroundColor = inColor.value;
    inputItem.style.backgroundColor = inColor.value;
    setting.style.backgroundColor = inColor.value;

    for (let button of buttonsMenu) {
        button.style.backgroundColor = inColor.value;
    }

    for (let button of buttonsOk) {
        button.style.backgroundColor = inColor.value;
    }

    body.style.fontSize = inNumber.value + 'px';
    document.cookie = `bColor=${inColor.value}`;

    let isLight = true;
    for (let i = 1; i < inColor.value.length; i++) {
        if (inColor.value[i] < '6') {
            isLight = false;
            break;
        }
    }

    if (isLight == true) {
        body.style.color = '#000000';
    }
    else if (isLight == false) {
        body.style.color = '#ffffff';
    }
}