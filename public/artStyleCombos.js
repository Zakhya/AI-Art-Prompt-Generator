import { data } from "./data.js"
import { removeActiveButtonClass } from "./functions.js"
const sentenceBuilderButton = document.querySelector('#sentenceBuilderButton')
const randomSentenceButton = document.querySelector('#randomSentenceButton')
const materialAndPatternsButton = document.querySelector('#materialAndPatternsButton')
const recommendationSentence = document.querySelector('#recommendationSentence')
const artStyleComboButton = document.querySelector('#artStyleComboButton')
const fullSentenceShuffleButton = document.querySelector('.fullSentenceShuffle')
artStyleComboButton.classList.add('activeButton')

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
materialAndPatternsButton.addEventListener('click', e => {
    const location = window.location
    removeActiveButtonClass(location)
    window.location.href = 'matsAndPats.html'
})
randomSentenceButton.addEventListener('click', e => {
    const location = window.location
    removeActiveButtonClass(location)
    window.location.href = 'index.html'
})

let artStyleObject = {
    subject: {
        enabled: true,
        value: '',
        isLocked: false,
    },
    designer1: {
        enabled: true,
        value: '',
        isLocked: false,
    },
    artist1: {
        enabled: true,
        value: '',
        isLocked: false,
    },
    artist2: {
        enabled: true,
        value: '',
        isLocked: false,
    },
    movie1: {
        enabled: true,
        value: '',
        isLocked: false,
    },
    musicVideo1: {
        enabled: false,
        value: '',
        isLocked: false,
    },
}

document.addEventListener('DOMContentLoaded', (event) => { // for navigator 
    const copyButton = document.querySelector('.fa-copy')
    copyButton.addEventListener('click', e => {
        const wordList = recommendationSentence.querySelectorAll('p.word')
        console.log("wordList:", wordList)
        let sentenceArray = []
        Object.keys(artStyleObject).forEach(key => {
            console.log(key)
                if(artStyleObject[key].value !== '' && artStyleObject[key].value !== 'none' && artStyleObject[key].enabled === true){
                    sentenceArray.push(artStyleObject[key].value)
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
    const enabledKeys = Object.keys(artStyleObject).filter(key => artStyleObject[key].enabled);
    const styleKeys = enabledKeys.filter(k => k.startsWith('artist') || k.startsWith('movie') || k.startsWith('musicVideo'));
    let styleCategoryIndex = 0;

    for (let i = 0; i < enabledKeys.length; i++) {
        const key = enabledKeys[i];
        const isLastStyleKey = (styleCategoryIndex === styleKeys.length - 1);
        

        if (key === 'subject' && artStyleObject[key].isLocked === false) {
            artStyleObject[key].value = data.subject[Math.floor(Math.random() * data.subject.length)];
        } else {
            if(artStyleObject[key].isLocked === true && (key.startsWith('artist') || key.startsWith('movie') || key.startsWith('musicVideo'))){
                styleCategoryIndex++;
                continue
            } else if (artStyleObject[key].isLocked === true){
                continue
            }
            const trimmedKey = key.replace(/[^a-zA-Z]+.*/, "");
            const randomCatArray = data.artistStyle[trimmedKey];
            let randomVal = randomCatArray[Math.floor(Math.random() * randomCatArray.length)];
            if (key.startsWith('designer') && artStyleObject[key].isLocked === false) {
                randomVal = randomVal.replace('in the style of', 'wearing').trim();
                randomVal += ' style clothing';

                // Add a comma after the designer if there's any other subsequent key (not only style keys).
                if (i < enabledKeys.length - 1) {
                    randomVal += ',';
                }
            } else if (randomVal.startsWith('in the style of') && (key.startsWith('artist') || key.startsWith('movie') || key.startsWith('musicVideo'))) {
                styleCategoryIndex++;
                if(artStyleObject[key].isLocked === true) return

                if (styleCategoryIndex === 1 && !isLastStyleKey) {
                    randomVal += ',';
                } else if (isLastStyleKey && styleCategoryIndex === 1) {
                    artStyleObject[key].value = randomVal;
                    return
                } else if(isLastStyleKey) {
                    randomVal = randomVal.replace('in the style of', 'and').trim();
                }else {
                    randomVal = randomVal.replace('in the style of', '').trim() + ',';
                }
            }
            if(artStyleObject[key].isLocked === true) return
            artStyleObject[key].value = randomVal;
        }
    }
}



function updateDisplaySentence(){
    recommendationSentence.innerHTML = '';

    const enabledKeys = Object.keys(artStyleObject).filter(key => artStyleObject[key].enabled);

    enabledKeys.forEach((key, i) => {
        let container = document.createElement('div');
        container.setAttribute('class', 'wordContainer');
        
        let label = document.createElement('p');
        label.setAttribute('class', 'wordLabel');

        let word = document.createElement('p');
        word.setAttribute('class', 'word');
        let wordValue = artStyleObject[key].value;
        word.textContent = wordValue;
        label.textContent = key;
        container.appendChild(word);
        container.appendChild(label);
        recommendationSentence.appendChild(container);
    });
}

function updateAdjustmentList(){
    Object.keys(artStyleObject).forEach(key => {
        if(artStyleObject[key].enabled === true){
            let targetButton = adjustmentListContainer.querySelector(`button#${key}EnableButton`)
            const targetInput = adjustmentListContainer.querySelector(`input#${key}AdjustmentInput`);
            targetInput.value = artStyleObject[key].value
            targetButton.textContent = 'disable'
            targetButton.setAttribute('class', 'enableButton enableButtonPressed')
        } else {
            let targetButton = adjustmentListContainer.querySelector(`button#${key}EnableButton`)
            const targetInput = adjustmentListContainer.querySelector(`input#${key}AdjustmentInput`);
            targetInput.value = artStyleObject[key].value
            targetButton.textContent = 'enable'
            targetButton.setAttribute('class', 'enableButton')
            
        }
    })
}

function createAdjustmentList() {
Object.keys(artStyleObject).forEach(key => {

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
    artStyleObject[key].enabled = true
    const input = document.querySelector(`input#${key}AdjustmentInput`)
    if(input.value === ''){
        const trimmedKey = key.replace(/[^a-zA-Z]+.*/, "");
        const length = data['artistStyle'][trimmedKey].length
        const randomInx = Math.floor(Math.random() * length)
        const randomVal = data['artistStyle'][trimmedKey][randomInx]
        artStyleObject[key].value = randomVal
        input.value = randomVal
        console.log(artStyleObject)
    }
    shuffleSelectedValues()
    updateDisplaySentence()
    updateAdjustmentList()
}else if(e.target.textContent === 'disable'){
    e.target.textContent = 'enable'
    e.target.setAttribute('class', 'enableButton')
    artStyleObject[key].enabled = false
    console.log(artStyleObject)
    shuffleSelectedValues()
    updateDisplaySentence()
    updateAdjustmentList()
}
})
const unlockButton = document.createElement('i')
const unlockButtonContainer = document.createElement('div')
const lockButton = document.createElement('i')
const plusButton = document.createElement('i')
plusButton.setAttribute('class', 'fa-solid fa-plus')
unlockButtonContainer.setAttribute('class', 'unlockButtonContainer')
unlockButton.setAttribute('class', 'fa-solid fa-lock-open artComboUnlock')
unlockButton.addEventListener('click', e => {
    artStyleObject[key].isLocked = true
    unlockButtonContainer.innerHTML = ''
    lockButton.setAttribute('class', 'fa-solid fa-lock artComboLock')
    if(key === 'subject'){
        lockButton.setAttribute('class', 'fa-solid fa-lock subjectartCombolock')
        unlockButtonContainer.appendChild(lockButton)
    } else {
        unlockButtonContainer.appendChild(lockButton)
        unlockButtonContainer.appendChild(plusButton)
    }
})
lockButton.addEventListener('click', e => {
    artStyleObject[key].isLocked = false
    unlockButtonContainer.innerHTML = ''
    unlockButton.setAttribute('class', 'fa-solid fa-lock-open artComboUnlock')
    if(key === 'subject'){
        unlockButton.setAttribute('class', 'fa-solid fa-lock-open subjectartComboUnlock')
        unlockButtonContainer.appendChild(unlockButton)
    } else {
        unlockButtonContainer.appendChild(unlockButton)
        unlockButtonContainer.appendChild(plusButton)
    }
})
if(key === 'subject'){
    unlockButton.setAttribute('class', 'fa-solid fa-lock-open subjectartComboUnlock')
    unlockButtonContainer.appendChild(unlockButton)
} else {
    unlockButtonContainer.appendChild(unlockButton)
    unlockButtonContainer.appendChild(plusButton)
}
const dropdown = document.createElement('select')
dropdown.setAttribute('class', 'dropdown')
dropdown.addEventListener('change', e => {
    if(e.target.value === 'none'){
    artStyleObject[key].value = ''
    } else {
    if(typeof value === 'object'){
        console.log('isObject', 'true')
    }

    artStyleObject[key].value = e.target.value
    artStyleObject[key].enabled = true
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
    artStyleObject[key].value = ''
    dropdown.value = 'none'
    enableButton.textContent = 'enable'
    enableButton.setAttribute('class', 'enableButton')
    artStyleObject[key].enabled = false
} else {
    artStyleObject[key].value = e.target.value 
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
if (key === 'subject'){
    Object.values(data['subject']).forEach(e => {
            const option = document.createElement('option');
            option.value = e;
            option.textContent = e;
            dropdown.appendChild(option);
    })
} else {
    const trimmedKey = key.replace(/[^a-zA-Z]+.*/, "");
    Object.values(data['artistStyle'][trimmedKey]).forEach(e => {
        const option = document.createElement('option');
        option.value = e;
        option.textContent = e;
        dropdown.appendChild(option);
    })
}
})
}

createAdjustmentList()
shuffleSelectedValues()
updateAdjustmentList()
updateDisplaySentence()
console.log(artStyleObject)