const content = document.querySelector('.content-container');
const slider = document.querySelector('.slider');
const etchActual = document.querySelector('.etch-actual');
const sizeText = document.querySelector('.size-text');
const clearButton = document.querySelector('.clear');
const blackButton = document.querySelector('.black');
const randomButton = document.querySelector('.random');
const eraseButton = document.querySelector('.eraser');
const modes = ['eraser', 'black', 'random'];

let currentMode = 'black';
let rows;
let etchBoxes;

const getSliderValue = () => {
    return slider.value;
}

const removeAllNodes = () => {
    var child = etchActual.lastElementChild;
    while (child) {
        etchActual.removeChild(child);
        child = etchActual.lastElementChild;
    }
}

const changeGrid = (rows = 6) => {
    for (var i = 1; i <= rows*rows; i++) {
        let box = document.createElement('div');
        etchActual.appendChild(box);
    }

    etchActual.style['grid-template-columns'] = `repeat(${rows}, 1fr)`;
}

const clearAllBoxes = () => {
    let boxes = [...etchActual.children];
    boxes.forEach((box) => {
        box.classList.remove('filled');
        box.style['background-color'] = 'white';
    });
}

const activateFillingBlack = (array) => {
    array.forEach((box) => {
        box.addEventListener('mouseover', () => {
            box.classList.add('filled');
            box.style['background-color'] = '';
        });
    });
}

const activateFillingRandom = (array) => {
    array.forEach((box) => {
        box.addEventListener('mouseover', () => {
            box.classList.remove('filled');
            box.style['background-color'] = `rgb(${randomColor()})`;
        });
    });
}

const activateEraser = (array) => {
    array.forEach((box) => {
        box.addEventListener('mouseover', () => {
            box.classList.remove('filled');
            box.style['background-color'] = '';
        });
    });
}

const randomColor = () => {
    let r = Math.trunc(Math.random()*256);
    let g = Math.trunc(Math.random()*256);
    let b = Math.trunc(Math.random()*256);
    let finalColor = `${r}, ${g}, ${b}`;

    return finalColor;
}

const init = () => {
    removeAllNodes();
    changeGrid();
    etchBoxes = Array.from(etchActual.children);
    activateFillingBlack(etchBoxes);    
}

randomButton.addEventListener('click', () => {
    currentMode = modes[2];
    activateFillingRandom(etchBoxes);
});
blackButton.addEventListener('click', () => {
    currentMode = modes[1];
    activateFillingBlack(etchBoxes);
});
eraseButton.addEventListener('click', () => {
    currentMode = modes[0];
    activateEraser(etchBoxes);
});

clearButton.addEventListener('click', clearAllBoxes);
slider.addEventListener("input", () => {
    let value = getSliderValue();                       // calls value function
    sizeText.innerText = `Size: ${value} x ${value}`    // changes value of "Size: X x X"

    removeAllNodes();
    changeGrid(value);
    etchBoxes = Array.from(etchActual.children);
    activateFillingBlack(etchBoxes);    
})

init();