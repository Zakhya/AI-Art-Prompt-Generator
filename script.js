import { data } from "./data.js"
let recomendationSentence = document.getElementById('recommendationSentence')
let adjustmentListContainer = document.getElementById('adjustmentListContainer')
const shuffleButton = document.querySelector('.fa-shuffle')
const updateFinalSentence = function(){
    recomendationSentence.innerHTML = ''
    Object.keys(currentRecomendationObject).forEach(key => {
        if(currentRecomendationObject[key][key] === '' || currentRecomendationObject[key][key] === [] || currentRecomendationObject[key].enabled === false) return
        let container = document.createElement('div')
        container.setAttribute('class', 'wordContainer')
        let label = document.createElement('p')
        label.setAttribute('class', 'wordLabel')
        let word = document.createElement('p')
        word.setAttribute('class', 'word')
        word.textContent = currentRecomendationObject[key][key]
        label.textContent = key
        container.appendChild(word)
        container.appendChild(label)
        recomendationSentence.appendChild(container)
        console.log(recomendationSentence)
    })
}
const updateAdjustmentList = function(){
    let inputList = adjustmentListContainer.querySelectorAll('input.adjustmentInput')
    Object.keys(currentRecomendationObject).forEach(key => {
        inputList.forEach(a => {
            if(a.id === `${[key]}AdjustmentInput`){  
                a.value = `${currentRecomendationObject[key][key]}`
            }
        })
    })
}
shuffleButton.addEventListener('click', e => {
    const buttonList = adjustmentListContainer.querySelectorAll('button.enableButton')
    console.log(buttonList)
    Object.keys(currentRecomendationObject).forEach((key, i )=> {
        const length = data[key].length
        const randomInx = Math.floor(Math.random() * length)
        const randomVal = data[key][randomInx]
        currentRecomendationObject[key][key] = randomVal
        currentRecomendationObject[key].enabled = true
        buttonList[i].textContent = 'disable'
        buttonList[i].setAttribute('class', 'enableButton enableButtonPressed')

    })
    updateFinalSentence()
    updateAdjustmentList()
    console.log(currentRecomendationObject)
})
document.addEventListener('DOMContentLoaded', (event) => { // for navigator 
    const copyButton = document.querySelector('.fa-copy')
    copyButton.addEventListener('click', e => {
        const wordList = recomendationSentence.querySelectorAll('p.word')
        console.log("wordList:", wordList)
        let sentenceArray = []
        Object.keys(currentRecomendationObject).forEach(key => {
            if(currentRecomendationObject[key][key] !== '' && currentRecomendationObject[key][key] !== 'none' ){
                sentenceArray.push(currentRecomendationObject[key][key])
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

let currentRecomendationObject = {

    shotType: {shotType: '', enabled: false},
    shotStyle: {shotStyle: '', enabled: false},
    media: {media: '', enabled: false},
    adjective: {adjective: '', enabled: false},
    emotionAdjective: {emotionAdjective: '', enabled: false},
    subject: {subject: '', enabled: false},
    clothing: {clothing: '', enabled: false},
    action: {action: '', enabled: false},
    scene: {scene: '', enabled: false},
    lighting: {lighting: '', enabled: false},
    details: {details: '', enabled: false},
    artistStyle: {artistStyle: '', enabled: false}
}

Object.keys(data).forEach(key => {
    // const dropdown = document.getElementById(`${key}`);
    let enableButton = document.createElement('button')
    enableButton.setAttribute('class','enableButton')
    enableButton.textContent = 'enable'
    enableButton.isPressed = false
    enableButton.addEventListener('click', e => {
    if(e.target.textContent === 'enable'){
        e.target.textContent = 'disable'
        e.target.setAttribute('class', 'enableButton enableButtonPressed')
        currentRecomendationObject[key].enabled = true
        updateFinalSentence()
        updateAdjustmentList()
    }else if(e.target.textContent === 'disable'){
        e.target.textContent = 'enable'
        e.target.setAttribute('class', 'enableButton')
        currentRecomendationObject[key].enabled = false
        updateFinalSentence()
        updateAdjustmentList()
            
        }
    })
    // enableButton.setAttribute('class', 'enableButton')
    const dropdown = document.createElement('select')
    dropdown.setAttribute('class', 'dropdown')
    dropdown.addEventListener('change', e => {
        if(e.target.value === 'none'){
            currentRecomendationObject[key][key] = ''
            
        } else {
            currentRecomendationObject[key][key] = e.target.value
            currentRecomendationObject[key].enabled = true
            enableButton.textContent = 'disable'
            enableButton.setAttribute('class', 'enableButton enableButtonPressed')
            
            
        }
        console.log(currentRecomendationObject)
        updateFinalSentence()
        updateAdjustmentList()
    })
    // create adjustment list
    const itemContainer = document.createElement('div')
    itemContainer.setAttribute('class', 'adjustmentListItemContainer')
    let itemlabel = document.createElement('label') 
    itemlabel.setAttribute('for', `${[key]}AdjustmentInput`)
    itemlabel.setAttribute('class', `adjustmentInputLabel`)
    itemlabel.textContent = key
    
    let itemInput = document.createElement('input')
    itemInput.setAttribute('id', `${[key]}AdjustmentInput`)
    itemInput.setAttribute('class', `adjustmentInput`)
    itemInput.setAttribute('type', 'text')
    
    itemInput.addEventListener('input', e => {
        if(e.target.value  === ''){
            currentRecomendationObject[key][key] = ''
            dropdown.value = 'none'
            enableButton.textContent = 'enable'
            enableButton.setAttribute('class', 'enableButton')
            currentRecomendationObject[key].enabled = false
        } else {
            currentRecomendationObject[key][key] = e.target.value
        }
        updateFinalSentence()
        updateAdjustmentList()

    })
    
    itemContainer.appendChild(enableButton)
    itemContainer.appendChild(itemlabel)
    itemContainer.appendChild(dropdown)
    itemContainer.appendChild(itemInput)
    adjustmentListContainer.appendChild(itemContainer)
    console.log(data)
    let fisrtItem = true 
    if(key === 'clothing'){
        for (let key in data.clothing) {
            for (let subKey in data.clothing[key]){

                const option = document.createElement('option');
                if(fisrtItem === true){
                    const firstOption = document.createElement('option');
                    firstOption.value = 'none'
                    firstOption.textContent = 'none';
                    fisrtItem = false
                    dropdown.appendChild(firstOption);
                }
                option.value = data.clothing[key][subKey];
                option.textContent = data.clothing[key][subKey];
                
                dropdown.appendChild(option);
            }
        }
        return
    }
    data[key].forEach(item => {
        // populate dropdowns
        
        const option = document.createElement('option');
        if(fisrtItem === true){
            const firstOption = document.createElement('option');
            firstOption.value = 'none'
            firstOption.textContent = 'none';
        fisrtItem = false
        dropdown.appendChild(firstOption);
    }
    option.value = item;
    option.textContent = item;
    
    dropdown.appendChild(option);
    });
});
