import { data } from "./data.js"
import { removeActiveButtonClass } from "./functions.js"
const sentenceBuilderButton = document.querySelector('#sentenceBuilderButton')
const randomSentenceButton = document.querySelector('#randomSentenceButton')
const materialAndPatternsButton = document.querySelector('#materialAndPatternsButton')
const artStyleComboButton = document.querySelector('#artStyleComboButton')
materialAndPatternsButton.classList.add('activeButton')
const fullSentenceShuffleButton = document.querySelector('.fullSentenceShuffle')

fullSentenceShuffleButton.addEventListener('click', e => {
    shuffleSelectedValues()
    updateAdjustmentList()
    updateDisplaySentence()
})


sentenceBuilderButton.addEventListener('click', e => {
    const location = window.location
    removeActiveButtonClass(location)
    window.location.href = 'sentenceBuilder.html'
})
randomSentenceButton.addEventListener('click', e => {
    const location = window.location
    removeActiveButtonClass(location)
    window.location.href = 'index.html'
})
artStyleComboButton.addEventListener('click', e => {
    const location = window.location
    removeActiveButtonClass(location)
    window.location.href = 'artStyleCombos.html'
})

let matsAndPatsObject = {
    pattern1: {
        enabled: true,
        value: '',
        isLocked: false,
    },
    material1: {
        enabled: true,
        value: '',
        isLocked: false,
    },
}

let sortedMatsAndPatsObject
function sortArr () {
    const orderArray = ['pattern', 'material']
    const sortKeys = (a, b) => {
        const baseA = a.replace(/\d+$/, '')
        const baseB = b.replace(/\d+$/, '')
        const indexA = orderArray.indexOf(baseA)
        const indexB = orderArray.indexOf(baseB)
        if (indexA === indexB) {
            return parseInt(a.replace(/^\D+/g, '') || 0) - parseInt(b.replace(/^\D+/g, '') || 0)
        }
        return indexA - indexB; 
    };
    
    sortedMatsAndPatsObject = Object.keys(matsAndPatsObject)
    .sort(sortKeys)
    .reduce((acc, key) => {
        acc[key] = matsAndPatsObject[key];
        return acc;
    }, {});
}
sortArr()


document.addEventListener('DOMContentLoaded', (event) => { // for navigator 
    const copyButton = document.querySelector('.fa-copy')
    copyButton.addEventListener('click', e => {
        const wordList = recommendationSentence.querySelectorAll('p.word')
        console.log("wordList:", wordList)
        let sentenceArray = []
        Object.keys(sortedMatsAndPatsObject).forEach(key => {
            console.log(key)
                if(sortedMatsAndPatsObject[key].value !== '' && sortedMatsAndPatsObject[key].value !== 'none' && sortedMatsAndPatsObject[key].enabled === true){
                    sentenceArray.push(sortedMatsAndPatsObject[key].value)
                }  
        })
        navigator.clipboard.writeText(sentenceArray.join(' '))
        .then(function() {
            console.log('Text successfully copied to clipboard!');
        }).catch(function(err) {
            console.error('Unable to copy text to clipboard:', err);
        });
        console.log(sentenceArray)
    })                                                
});

function shuffleSelectedValues() {
    const enabledKeys = Object.keys(sortedMatsAndPatsObject).filter(key => sortedMatsAndPatsObject[key].enabled)
    const patternKeys = enabledKeys.filter(k => k.startsWith('pattern'))
    const materialKeys = enabledKeys.filter(k => k.startsWith('material'))

    let patternCatagoryIndex = 0
    let materialCatagoryIndex = 0

    for (let i = 0; i < enabledKeys.length; i++) {
        const key = enabledKeys[i];
        const isLastPatternKey = (patternCatagoryIndex === patternKeys.length - 1) 
        
        if (key.startsWith('pattern') && sortedMatsAndPatsObject[key].isLocked === false) {
            patternCatagoryIndex++
            let value
            if(patternKeys.length === patternCatagoryIndex){
                value = data.pattern[Math.floor(Math.random() * data.pattern.length)];
                value += ' pattern made of'
            } else {
                value = data.pattern[Math.floor(Math.random() * data.pattern.length)];
            }
            if(patternKeys.length !== patternCatagoryIndex && value.endsWith('s')){
                value = value.replace(/s$/, '');
            }
            sortedMatsAndPatsObject[key].value = value

        } else if(key.startsWith('material') && sortedMatsAndPatsObject[key].isLocked == false){
            materialCatagoryIndex++
            const trimmedKey = key.replace(/[^a-zA-Z]+.*/, "")
            const randomCatArray = data[trimmedKey]
            let randomVal = randomCatArray[Math.floor(Math.random() * randomCatArray.length)]
            if(materialCatagoryIndex >= 1 && materialKeys.length > 2 && materialCatagoryIndex < materialKeys.length - 1){
                randomVal += ','
                sortedMatsAndPatsObject[key].value = randomVal;
            }else if(materialCatagoryIndex === 1 && materialKeys.length === 1){
                sortedMatsAndPatsObject[key].value = randomVal;
            } else if(materialCatagoryIndex === 1 && materialKeys.length > 1){               
                randomVal += ' and'
                sortedMatsAndPatsObject[key].value = randomVal;                
            } else if(materialCatagoryIndex === materialKeys.length) {
                sortedMatsAndPatsObject[key].value = randomVal;                
            } else if(materialCatagoryIndex === materialKeys.length - 1){
                randomVal += ' and'
                sortedMatsAndPatsObject[key].value = randomVal;                
            } else {
                sortedMatsAndPatsObject[key].value = randomVal;                
                randomVal += ','
                
            }
        }
    }
}

function addNewEntry(type) {
    const relatedKeys = Object.keys(matsAndPatsObject).filter(key => key.startsWith(type));
    
    const nextKeyNumber = relatedKeys.length + 1;

    const newKey = `${type}${nextKeyNumber}`;

    matsAndPatsObject[newKey] = {
        enabled: true,
        value: '',
        isLocked: false,
    };
    sortArr()
    shuffleSelectedValues()
    createAdjustmentList()
    updateAdjustmentList()
    updateDisplaySentence()
    console.log(sortedMatsAndPatsObject);
}

function updateDisplaySentence(){
    recommendationSentence.innerHTML = '';

    const enabledKeys = Object.keys(sortedMatsAndPatsObject).filter(key => sortedMatsAndPatsObject[key].enabled);

    enabledKeys.forEach((key, i) => {
        let container = document.createElement('div');
        container.setAttribute('class', 'wordContainer');
        
        let label = document.createElement('p');
        label.setAttribute('class', 'wordLabel');

        let word = document.createElement('p');
        word.setAttribute('class', 'word');
        let wordValue = sortedMatsAndPatsObject[key].value;
        word.textContent = wordValue;
        label.textContent = key;
        container.appendChild(word);
        container.appendChild(label);
        recommendationSentence.appendChild(container);
    });
}

function updateAdjustmentList(){
    Object.keys(sortedMatsAndPatsObject).forEach(key => {
        if(sortedMatsAndPatsObject[key].enabled === true){
            let targetButton = adjustmentListContainer.querySelector(`button#${key}EnableButton`)
            const targetInput = adjustmentListContainer.querySelector(`input#${key}AdjustmentInput`);
            targetInput.value = sortedMatsAndPatsObject[key].value
            targetButton.textContent = 'disable'
            targetButton.setAttribute('class', 'enableButton enableButtonPressed')
        } else {
            let targetButton = adjustmentListContainer.querySelector(`button#${key}EnableButton`)
            const targetInput = adjustmentListContainer.querySelector(`input#${key}AdjustmentInput`);
            targetInput.value = sortedMatsAndPatsObject[key].value
            targetButton.textContent = 'enable'
            targetButton.setAttribute('class', 'enableButton')
            
        }
    })
}

function createAdjustmentList() {
adjustmentListContainer.innerHTML = ''
Object.keys(sortedMatsAndPatsObject).forEach(key => {
const hasNumbers  = /([02-9])/g.test(key)
const trimmedKey = key.replace(/[^a-zA-Z]+.*/, "");
let enableButton = document.createElement('button')
enableButton.setAttribute('class','enableButton')
key === 'subject' ? enableButton.setAttribute('id',`subjectEnableButton`) 
    : enableButton.setAttribute('id',`${key}EnableButton`)
enableButton.textContent = 'enable'
enableButton.isPressed = false
enableButton.addEventListener('click', e => {
if(e.target.textContent === 'enable'){
 
    e.target.textContent = 'disable'
    e.target.setAttribute('class', 'enableButton enableButtonPressed')
    sortedMatsAndPatsObject[key].enabled = true
    const input = document.querySelector(`input#${key}AdjustmentInput`)
    if(input.value === ''){
        const length = data['artistStyle'][trimmedKey].length
        const randomInx = Math.floor(Math.random() * length)
        const randomVal = data['artistStyle'][trimmedKey][randomInx]
        sortedMatsAndPatsObject[key].value = randomVal
        input.value = randomVal
        console.log(sortedMatsAndPatsObject)
    }
    shuffleSelectedValues()
    updateDisplaySentence()
    updateAdjustmentList()
}else if(e.target.textContent === 'disable'){
    e.target.textContent = 'enable'
    e.target.setAttribute('class', 'enableButton')
    sortedMatsAndPatsObject[key].enabled = false
    console.log(sortedMatsAndPatsObject)
    shuffleSelectedValues()
    updateDisplaySentence()
    updateAdjustmentList()
}
})
const unlockButton = document.createElement('i')
const unlockButtonContainer = document.createElement('div')
const lockButton = document.createElement('i')
const plusButton = document.createElement('i')
const minusButton = document.createElement('i')
plusButton.setAttribute('class', 'fa-solid fa-plus')
minusButton.setAttribute('class', 'fa-solid fa-minus')
unlockButtonContainer.setAttribute('class', 'unlockButtonContainer')
unlockButton.setAttribute('class', 'fa-solid fa-lock-open artComboUnlock')
unlockButton.addEventListener('click', e => {
    sortedMatsAndPatsObject[key].isLocked = true
    unlockButtonContainer.innerHTML = ''
    lockButton.setAttribute('class', 'fa-solid fa-lock artComboLock')
    if(key === 'subject'){
        lockButton.setAttribute('class', 'fa-solid fa-lock subjectartCombolock')
        unlockButtonContainer.appendChild(lockButton)
    } else if (hasNumbers){
        unlockButtonContainer.appendChild(lockButton)
        unlockButtonContainer.appendChild(minusButton)
    }else {
        unlockButtonContainer.appendChild(lockButton)
        unlockButtonContainer.appendChild(plusButton)
    }
})
lockButton.addEventListener('click', e => {
    sortedMatsAndPatsObject[key].isLocked = false
    unlockButtonContainer.innerHTML = ''
    unlockButton.setAttribute('class', 'fa-solid fa-lock-open artComboUnlock')
    if(key === 'subject'){
        unlockButton.setAttribute('class', 'fa-solid fa-lock-open subjectartComboUnlock')
        unlockButtonContainer.appendChild(unlockButton)
    } else if (hasNumbers){
        unlockButtonContainer.appendChild(unlockButton)
        unlockButtonContainer.appendChild(minusButton)
    }else {
        unlockButtonContainer.appendChild(unlockButton)
        unlockButtonContainer.appendChild(plusButton)
    }
})
minusButton.addEventListener('click', e => {
    delete matsAndPatsObject[key]
    sortArr()
    shuffleSelectedValues()
    createAdjustmentList()
    updateAdjustmentList()
    updateDisplaySentence()
})
if(key === 'subject'){
    unlockButton.setAttribute('class', 'fa-solid fa-lock-open subjectartComboUnlock')
    unlockButtonContainer.appendChild(unlockButton)
}  else if (hasNumbers){
    unlockButtonContainer.appendChild(unlockButton)
    unlockButtonContainer.appendChild(minusButton)
} else {
    unlockButtonContainer.appendChild(unlockButton)
    unlockButtonContainer.appendChild(plusButton)
}
plusButton.addEventListener('click', e => {
    addNewEntry(trimmedKey)  
})
const dropdown = document.createElement('select')
dropdown.setAttribute('class', 'dropdown')
dropdown.addEventListener('change', e => {
    if(e.target.value === 'none'){
    sortedMatsAndPatsObject[key].value = ''
    } else {
    if(typeof value === 'object'){
        console.log('isObject', 'true')
    }

    sortedMatsAndPatsObject[key].value = e.target.value
    sortedMatsAndPatsObject[key].enabled = true
    enableButton.textContent = 'disable'
    enableButton.setAttribute('class', 'enableButton enableButtonPressed')
    }
    updateDisplaySentence()
})
// create adjustment list
const itemContainer = document.createElement('div')
itemContainer.setAttribute('class', 'adjustmentListItemContainer')
const itemContainerDiv = document.createElement('div')
itemContainerDiv.classList.add('itemContainerDiv')
const itemDetailsFilter = document.createElement('div')
const p = document.createElement('p')
p.textContent = 'something to see'
let itemLabelDiv = document.createElement('div')
itemLabelDiv.setAttribute('class', 'adjustmentInputLabelContainer')
let itemlabel = document.createElement('p') 
itemlabel.setAttribute('for', `${key}AdjustmentInput`)
itemlabel.setAttribute('class', `adjustmentInputLabel`)
itemlabel.textContent = key
itemLabelDiv.appendChild(itemlabel)

let itemInput = document.createElement('input')
itemInput.setAttribute('id', `${key}AdjustmentInput`)
itemInput.setAttribute('class', `adjustmentInput`)
itemInput.setAttribute('type', 'text')

itemInput.addEventListener('input', e => {
if(e.target.value  === ''){
    sortedMatsAndPatsObject[key].value = ''
    dropdown.value = 'none'
    enableButton.textContent = 'enable'
    enableButton.setAttribute('class', 'enableButton')
    sortedMatsAndPatsObject[key].enabled = false
} else {
    sortedMatsAndPatsObject[key].value = e.target.value 
}
updateDisplaySentence()
})

itemContainerDiv.appendChild(enableButton)
itemContainerDiv.appendChild(unlockButtonContainer)
itemContainerDiv.appendChild(itemLabelDiv)
itemContainerDiv.appendChild(dropdown)
itemContainerDiv.appendChild(itemInput)
itemContainer.appendChild(itemContainerDiv)
itemDetailsFilter.appendChild(p)

adjustmentListContainer.appendChild(itemContainer)
let fisrtItem = true 

if(fisrtItem === true){
const firstOption = document.createElement('option');
firstOption.value = 'none'
firstOption.textContent = 'none';
fisrtItem = false
dropdown.appendChild(firstOption);
}
    Object.values(data[trimmedKey]).forEach(e => {
        const option = document.createElement('option');
        option.value = e;
        option.textContent = e;
        dropdown.appendChild(option);
    })
})
}

createAdjustmentList()
shuffleSelectedValues()
updateAdjustmentList()
updateDisplaySentence()
console.log(sortedMatsAndPatsObject)