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
    },
    designer1: {
        enabled: true,
        value: '',
    },
    artist1: {
        enabled: true,
        value: '',
    },
    artist2: {
        enabled: true,
        value: '',
    },
    movie1: {
        enabled: false,
        value: '',
    },
    musicVideo1: {
        enabled: false,
        value: '',
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
    const keys = Object.keys(artStyleObject);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (artStyleObject[key].enabled) {
            if (key === 'subject') {
                artStyleObject[key].value = data.subject[Math.floor(Math.random() * data.subject.length)];
            } else {
                const trimmedKey = key.replace(/[^a-zA-Z]+.*/, "");
                const randomCatArray = data.artistStyle[trimmedKey];
                let randomVal = randomCatArray[Math.floor(Math.random() * randomCatArray.length)]

                if (key.startsWith('designer')) {
                    randomVal = randomVal.replace('in the style of', 'wearing').trim();
                    randomVal += ' style clothing';
                } else if (randomVal.startsWith('in the style of')) {
                    if (key !== trimmedKey + '1') {
                        randomVal = randomVal.replace('in the style of', '').trim();
                        randomVal = 'and ' + randomVal;
                    }
                }

                artStyleObject[key].value = randomVal;
            }
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
        // if (key === 'designer1' && wordValue.startsWith('in the style of')) {
        //     wordValue = wordValue.replace('in the style of', 'wearing').trim();
        //     wordValue += ' style clothing'
        // } else if(wordValue.startsWith('in the style of') && key !== `${key}1`){
        //     wordValue = wordValue.replace('in the style of', '').trim();
        //     wordValue = 'and ' + wordValue
        // }
        // if (i !== enabledKeys.length - 1 && i !== 0) {
        //     wordValue += ',';
        // }
       

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
        const length = data['artistStyle'][key].length
        const randomInx = Math.floor(Math.random() * length)
        const randomVal = data['artistStyle'][key][randomInx]
        artStyleObject[key].value = randomVal
        input.value = randomVal
    }
    updateDisplaySentence()
    // updateAdjustmentList()
}else if(e.target.textContent === 'disable'){
    e.target.textContent = 'enable'
    e.target.setAttribute('class', 'enableButton')
    artStyleObject[key].enabled = false
    updateDisplaySentence()
    // updateAdjustmentList()
}
})
// enableButton.setAttribute('class', 'enableButton')
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
itemContainerDiv.appendChild(itemLabelDiv)
itemContainerDiv.appendChild(dropdown)
itemContainerDiv.appendChild(itemInput)
itemContainer.appendChild(itemContainerDiv)
itemDetailsFilter.appendChild(p)
itemContainer.appendChild(itemDetailsFilter)

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