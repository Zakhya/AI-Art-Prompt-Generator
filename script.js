import { data } from "./data.js"
let recomendationSentence = document.getElementById('recommendationSentence')
let adjustmentListContainer = document.getElementById('adjustmentListContainer')
let topButtonContainer = document.querySelector('.topButtonContainer')
let iconPlusContainer = document.querySelector('.iconPlusContainer')
let iconShuffleContainer = document.querySelector('.iconShuffleContainer')
const shuffleButton = document.querySelector('.fullSentenceShuffle')
let detailsButtonClickableIcons = false

iconPlusContainer.addEventListener('mouseenter', e => {
    if(!detailsButtonClickableIcons) return 
    const icon = e.target.querySelector('i')
    icon.classList.remove('buttonPressedTextColor')
    e.stopPropagation()
})
iconPlusContainer.addEventListener('mouseleave', e => {
    if(!detailsButtonClickableIcons) return 
    const icon = e.target.querySelector('i')
    icon.classList.add('buttonPressedTextColor')
    e.stopPropagation()
})

iconPlusContainer.addEventListener('click', e => {
    if(!detailsButtonClickableIcons) return 
    e.stopPropagation()
    const icon = e.target.querySelector('i')
})
iconShuffleContainer.addEventListener('click', e => {
    if(!detailsButtonClickableIcons) return 
    e.stopPropagation()
    const icon = e.target.querySelector('i')
})
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
const shuffleSelectedValues = function(){
    const bottomButtonList = adjustmentListContainer.querySelectorAll('button.enableButton')
    const topButtonList = topButtonContainer.querySelectorAll('.topRandomButton, .topRandomButtonDetails')
    console.log(topButtonList)
    Object.keys(currentRecomendationObject).forEach((key, i )=> {
        if(currentRecomendationObject[key].enabled === false) return
        const length = data[key].length
        const randomInx = Math.floor(Math.random() * length)
        const randomVal = data[key][randomInx]
        currentRecomendationObject[key][key] = randomVal
        currentRecomendationObject[key].enabled = true
        bottomButtonList[i].textContent = 'disable'
        bottomButtonList[i].setAttribute('class', 'enableButton enableButtonPressed')
        if(topButtonList[i].id !== 'details'){
            topButtonList[i].classList.add('topRandomButtonPressed')
            console.log('not details ran')
        } else {
            let plusIcon = topButtonList[i].querySelector('.fa-plus')
            plusIcon.classList.add('buttonPressedTextColor')
            let randomIcon = topButtonList[i].querySelector('.fa-shuffle')
            randomIcon.classList.add('buttonPressedTextColor')
            topButtonList[i].setAttribute('class', 'topRandomButtonDetails topRandomButtonPressed')

        }
        
    })
    updateFinalSentence()
    updateAdjustmentList()
    console.log(currentRecomendationObject)
}
shuffleButton.addEventListener('click', e => {
    shuffleSelectedValues()
    
})
let currentRecomendationObject = {

    shotType: {shotType: '', enabled: false},
    shotStyle: {shotStyle: '', enabled: false},
    media: {media: '', enabled: true},
    adjective: {adjective: '', enabled: true},
    emotion: {emotion: '', enabled: false},
    subject: {subject: '', enabled: true},
    clothing: {clothing: '', enabled: false},
    action: {action: '', enabled: true},
    scene: {scene: '', enabled: true},
    lighting: {lighting: '', enabled: false},
    details: {details: [], enabled: false},
    artistStyle: {artistStyle: '', enabled: true}
}
let topButtons = topButtonContainer.querySelectorAll('.topRandomButton, .topRandomButtonDetails')
topButtons.forEach((e, i) => {
    e.addEventListener('click', (a, i) => {
        let id = a.currentTarget.id
        console.log(id)
        if(currentRecomendationObject[id]){
            let bottomButtonList = adjustmentListContainer.querySelectorAll('button.enableButton')
            currentRecomendationObject[id].enabled = !currentRecomendationObject[id].enabled
            if(currentRecomendationObject[id].enabled === true){
                bottomButtonList.forEach(subE => {
                    if(subE.id === id + 'EnableButton'){
                        subE.textContent = 'disable'
                        subE.setAttribute('class', 'enableButton enableButtonPressed')
                    }
                })
                if(id === 'details'){
                    console.log('running')
                    const detailsButton = document.getElementById('details');
                    let plusIcon = detailsButton.querySelector('.fa-plus')
                    let shuffleIcon = detailsButton.querySelector('.fa-shuffle')
                    plusIcon.style.opacity = '1.0';
                    shuffleIcon.style.opacity = '1.0';
                    plusIcon.style.pointerEvents = 'auto';
                    shuffleIcon.style.pointerEvents = 'auto';
                    shuffleIcon.classList.add('buttonPressedTextColor')
                    plusIcon.classList.add('buttonPressedTextColor')
                    detailsButtonClickableIcons = true
                    a.currentTarget.classList.add('topRandomButtonPressed')
                }
                e.setAttribute('class', 'topRandomButton topRandomButtonPressed')
                const length = data[id].length
                const randomInx = Math.floor(Math.random() * length)
                const randomVal = data[id][randomInx]
                currentRecomendationObject[id][id] = randomVal
            } else {
                e.setAttribute('class', 'topRandomButton')
                bottomButtonList.forEach(subE => {
                    if(subE.id === id + 'EnableButton'){
                        subE.textContent = 'enable'
                        subE.setAttribute('class', 'enableButton')
                    }
                })
                if(id === 'details'){
                    console.log('running')
                    const detailsButton = document.getElementById('details');
                    let plusIcon = detailsButton.querySelector('.fa-plus')
                    let shuffleIcon = detailsButton.querySelector('.fa-shuffle')
                    plusIcon.style.opacity = '0.0';
                    shuffleIcon.style.opacity = '0.0';
                    plusIcon.style.pointerEvents = 'none';
                    shuffleIcon.style.pointerEvents = 'none';
                    detailsButtonClickableIcons = false
                    a.currentTarget.classList.remove('class', 'topRandomButtonPressed')
                }
            }
        }
        updateFinalSentence()
        updateAdjustmentList()
    })
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


Object.keys(data).forEach((key, i) => {
    const topButtonList = topButtonContainer.querySelectorAll('.topRandomButton, .topRandomButtonDetails')
    // const dropdown = document.getElementById(`${key}`);
    let enableButton = document.createElement('button')
    enableButton.setAttribute('class','enableButton')
    enableButton.setAttribute('id',`${[key]}EnableButton`)
    enableButton.textContent = 'enable'
    enableButton.isPressed = false
    enableButton.addEventListener('click', e => {
    if(e.target.textContent === 'enable'){
        console.log(topButtonList[i])
        topButtonList[i].setAttribute('class', 'topRandomButton topRandomButtonPressed')
        const detailsButton = document.getElementById('details');
        let plusIcon = detailsButton.querySelector('.fa-plus')
        let shuffleIcon = detailsButton.querySelector('.fa-shuffle')
        plusIcon.style.opacity = '1.0';
        shuffleIcon.style.opacity = '1.0';
        plusIcon.style.pointerEvents = 'auto';
        shuffleIcon.style.pointerEvents = 'auto';
        shuffleIcon.classList.add('buttonPressedTextColor')
        plusIcon.classList.add('buttonPressedTextColor')
        e.target.textContent = 'disable'
        e.target.setAttribute('class', 'enableButton enableButtonPressed')
        currentRecomendationObject[key].enabled = true
        updateFinalSentence()
        updateAdjustmentList()
    }else if(e.target.textContent === 'disable'){
        console.log(topButtonList[i])
        topButtonList[i].setAttribute('class', 'topRandomButton')
        const detailsButton = document.getElementById('details');
        let plusIcon = detailsButton.querySelector('.fa-plus')
        let shuffleIcon = detailsButton.querySelector('.fa-shuffle')
        plusIcon.style.opacity = '0.0';
        shuffleIcon.style.opacity = '0.0';
        plusIcon.style.pointerEvents = 'none';
        shuffleIcon.style.pointerEvents = 'none';
        detailsButtonClickableIcons = false
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
shuffleSelectedValues()