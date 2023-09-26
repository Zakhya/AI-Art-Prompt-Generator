import { data } from "./data.js"
import { removeActiveButtonClass } from "./functions.js"
const sentenceBuilderButton = document.querySelector('#sentenceBuilderButton')
const randomSentenceButton = document.querySelector('#randomSentenceButton')
const materialAndPatternsButton = document.querySelector('#materialAndPatternsButton')
const recommendationSentence = document.querySelector('#recommendationSentence')
const artStyleComboButton = document.querySelector('#artStyleComboButton')
const adjustmentListContainer = document.querySelector('#adjustmentListContainer')
artStyleComboButton.classList.add('activeButton')
const fullSentenceShuffleButton = document.querySelector('.fullSentenceShuffle')

fullSentenceShuffleButton.addEventListener('click', e => {
    shuffleSelectedValues()
    updateAdjustmentList()
    updateDisplaySentence()
})

sentenceBuilderButton.addEventListener('click', e => {
    const location = window.location
    removeActiveButtonClass(location)
    window.location.href = 'animalHybrid.html'
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
    musicVideo1: {
        enabled: false,
        value: '',
        isLocked: false,
    },
    movie1: {
        enabled: true,
        value: '',
        isLocked: false,
    },
}
let sortedArtStyleObject
function sortArr () {
    const orderArray = ['subject', 'designer', 'artist', 'musicVideo', 'movie'];
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
    
    sortedArtStyleObject = Object.keys(artStyleObject)
    .sort(sortKeys)
    .reduce((acc, key) => {
        acc[key] = artStyleObject[key];
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
        Object.keys(sortedArtStyleObject).forEach(key => {
            console.log(key)
                if(sortedArtStyleObject[key].value !== '' && sortedArtStyleObject[key].value !== 'none' && sortedArtStyleObject[key].enabled === true){
                    sentenceArray.push(sortedArtStyleObject[key].value)
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
    const enabledKeys = Object.keys(sortedArtStyleObject).filter(key => sortedArtStyleObject[key].enabled)
    const designerKeys = enabledKeys.filter(k => k.startsWith('designer'))
    const styleKeys = enabledKeys.filter(k => k.startsWith('artist') || k.startsWith('movie') || k.startsWith('musicVideo'))
    const movieKeys = enabledKeys.filter(k => k.startsWith('movie'))
    let styleCategoryIndex = 0
    let movieCatagoryIndex = 0
    let designerCatagoryIndex = 0
    for (let i = 0; i < enabledKeys.length; i++) {
        const key = enabledKeys[i];
        const isLastStyleKey = (styleCategoryIndex === styleKeys.length - 1)
        const isLastDesignerKey = (designerCatagoryIndex === designerKeys.length - 1)
        const isLastMovieKey = (movieCatagoryIndex === movieKeys.length - 1)
        
        if (key === 'subject' && sortedArtStyleObject[key].isLocked === false) {
            sortedArtStyleObject[key].value = data.subject[Math.floor(Math.random() * data.subject.length)];
        } else {
            if(sortedArtStyleObject[key].isLocked === true && (key.startsWith('artist') || key.startsWith('movie') || key.startsWith('musicVideo'))){
                styleCategoryIndex++;
                continue
            } else if (sortedArtStyleObject[key].isLocked === true){
                continue
            }
            const trimmedKey = key.replace(/[^a-zA-Z]+.*/, "")
            const randomCatArray = data.artistStyle[trimmedKey]
            let randomVal = randomCatArray[Math.floor(Math.random() * randomCatArray.length)]
            if (key.startsWith('designer') && sortedArtStyleObject[key].isLocked === false) {
                designerCatagoryIndex++
                if(designerCatagoryIndex === 1 && isLastDesignerKey){
                    randomVal = randomVal.replace('in the style of', 'wearing').trim();
                    randomVal += ' style clothing';
                } else if(designerCatagoryIndex === 1 && !isLastDesignerKey){
                    randomVal = randomVal.replace('in the style of', 'wearing').trim();
                    if(designerKeys.length > 2){
                        randomVal += ','
                    }
                } else if(designerCatagoryIndex > 1 && !isLastDesignerKey){
                    randomVal = randomVal.replace('in the style of', '').trim();
                    randomVal += ',';
                } else if(designerCatagoryIndex > 1 && isLastDesignerKey){
                    randomVal = randomVal.replace('in the style of', '').trim();
                    randomVal = ' and ' + randomVal + ' style clothing';
                }

                if (i < enabledKeys.length - 1) {
                    if (isLastDesignerKey){
                        randomVal += ',';
                    }
                }
            } else if (randomVal.startsWith('in the style of') && (key.startsWith('artist') || key.startsWith('movie') || key.startsWith('musicVideo'))) {
                styleCategoryIndex++;
                if(key.startsWith('artist') || key.startsWith('musicVideo')){

                    if(sortedArtStyleObject[key].isLocked === true) return
                    
                    if (styleCategoryIndex === 1 && !isLastStyleKey) {
                        randomVal = randomVal.replace('in the style of', 'in the art style of').trim();
                        randomVal += ',';
                    } else if (isLastStyleKey && styleCategoryIndex === 1) {
                        randomVal = randomVal.replace('in the style of', 'in the art style of').trim();
                        sortedArtStyleObject[key].value = randomVal;
                    } else if(isLastStyleKey) {
                        randomVal = randomVal.replace('in the style of', 'and').trim();
                    }else {
                        randomVal = randomVal.replace('in the style of', '').trim() + ',';
                    }
                } else if(key.startsWith('movie')){
                    movieCatagoryIndex++
                    if(sortedArtStyleObject[key].isLocked === true) return
                    if (movieCatagoryIndex === 1 && !isLastMovieKey && styleCategoryIndex > 2) {
                        randomVal = randomVal.replace('in the style of', 'and the movies').trim();
                        if(movieKeys.length > 2){
                            randomVal += ','
                        }
                    } else if (movieCatagoryIndex === 1 && !isLastMovieKey) {
                        randomVal = randomVal.replace('in the style of', 'in the style of the movies').trim();
                    } else if (isLastMovieKey && movieCatagoryIndex === 1 && isLastStyleKey) {
                        randomVal = randomVal.replace('in the style of', 'and the movie').trim();
                        sortedArtStyleObject[key].value = randomVal;
                    } else if(isLastMovieKey) {
                        randomVal = randomVal.replace('in the style of', 'and').trim();
                    }else {
                        randomVal = randomVal.replace('in the style of', '').trim() + ',';
                    }

                }
                }
                if(sortedArtStyleObject[key].isLocked === true) return
            sortedArtStyleObject[key].value = randomVal;
        }
    }
}

function addNewEntry(type) {
    const relatedKeys = Object.keys(artStyleObject).filter(key => key.startsWith(type));
    
    const nextKeyNumber = relatedKeys.length + 1;

    const newKey = `${type}${nextKeyNumber}`;

    artStyleObject[newKey] = {
        enabled: true,
        value: '',
        isLocked: false,
    };
    sortArr()
    shuffleSelectedValues()
    createAdjustmentList()
    updateAdjustmentList()
    updateDisplaySentence()
    console.log(sortedArtStyleObject);
}

function updateDisplaySentence(){
    recommendationSentence.innerHTML = '';

    const enabledKeys = Object.keys(sortedArtStyleObject).filter(key => sortedArtStyleObject[key].enabled);

    enabledKeys.forEach((key, i) => {
        let container = document.createElement('div');
        container.setAttribute('class', 'wordContainer');
        
        let label = document.createElement('p');
        label.setAttribute('class', 'wordLabel');

        let word = document.createElement('p');
        word.setAttribute('class', 'word');
        let wordValue = sortedArtStyleObject[key].value;
        word.textContent = wordValue;
        label.textContent = key;
        container.appendChild(word);
        container.appendChild(label);
        recommendationSentence.appendChild(container);
    });
}

function updateAdjustmentList(){
    Object.keys(sortedArtStyleObject).forEach(key => {
        if(sortedArtStyleObject[key].enabled === true){
            let targetButton = adjustmentListContainer.querySelector(`button#${key}EnableButton`)
            const targetInput = adjustmentListContainer.querySelector(`input#${key}AdjustmentInput`);
            targetInput.value = sortedArtStyleObject[key].value
            targetButton.textContent = 'disable'
            targetButton.setAttribute('class', 'enableButton enableButtonPressed')
        } else {
            let targetButton = adjustmentListContainer.querySelector(`button#${key}EnableButton`)
            const targetInput = adjustmentListContainer.querySelector(`input#${key}AdjustmentInput`);
            targetInput.value = sortedArtStyleObject[key].value
            targetButton.textContent = 'enable'
            targetButton.setAttribute('class', 'enableButton')
            
        }
    })
}

function createAdjustmentList() {
adjustmentListContainer.innerHTML = ''
Object.keys(sortedArtStyleObject).forEach(key => {
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
    sortedArtStyleObject[key].enabled = true
    const input = document.querySelector(`input#${key}AdjustmentInput`)
    if(input.value === ''){
        const length = data['artistStyle'][trimmedKey].length
        const randomInx = Math.floor(Math.random() * length)
        const randomVal = data['artistStyle'][trimmedKey][randomInx]
        sortedArtStyleObject[key].value = randomVal
        input.value = randomVal
        console.log(sortedArtStyleObject)
    }
    shuffleSelectedValues()
    updateDisplaySentence()
    updateAdjustmentList()
}else if(e.target.textContent === 'disable'){
    e.target.textContent = 'enable'
    e.target.setAttribute('class', 'enableButton')
    sortedArtStyleObject[key].enabled = false
    console.log(sortedArtStyleObject)
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
    sortedArtStyleObject[key].isLocked = true
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
    sortedArtStyleObject[key].isLocked = false
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
    delete artStyleObject[key]
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
    sortedArtStyleObject[key].value = ''
    } else {
    if(typeof value === 'object'){
        console.log('isObject', 'true')
    }

    sortedArtStyleObject[key].value = e.target.value
    sortedArtStyleObject[key].enabled = true
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
    sortedArtStyleObject[key].value = ''
    dropdown.value = 'none'
    enableButton.textContent = 'enable'
    enableButton.setAttribute('class', 'enableButton')
    sortedArtStyleObject[key].enabled = false
} else {
    sortedArtStyleObject[key].value = e.target.value 
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