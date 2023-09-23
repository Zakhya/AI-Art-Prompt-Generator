import { data } from "./data.js"
import { addPlusAndShuffletoDetailsButton, activateUnlockIcon, hideLockIcon, hideUnlockIcon, removeActiveButtonClass } from "./functions.js"
let recomendationSentence = document.getElementById('recommendationSentence')
let adjustmentListContainer = document.getElementById('adjustmentListContainer')
let topButtonContainer = document.querySelector('.topButtonContainer')
let iconPlusContainer = document.querySelector('.iconPlusContainer')
let iconShuffleContainer = document.querySelector('.iconShuffleContainer')
const shuffleButton = document.querySelector('.fullSentenceShuffle')
const adjustmentInputContainer = document.querySelector('#adjustmentListContainer')
const sentenceBuilderButton = document.querySelector('#sentenceBuilderButton')
const randomSentenceButton = document.querySelector('#randomSentenceButton')
const materialAndPatternsButton = document.querySelector('#materialAndPatternsButton')
const artStyleComboButton = document.querySelector('#artStyleComboButton')
randomSentenceButton.classList.add('activeButton')
let detailsButtonClickableIcons = false

let unlockIconList = document.querySelectorAll('.fa-lock-open')
let lockIconList = document.querySelectorAll('.fa-lock')

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
artStyleComboButton.addEventListener('click', e => {
    const location = window.location
    removeActiveButtonClass(location)
    window.location.href = 'artStyleCombos.html'
})

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

unlockIconList.forEach((e, i) => {
    e.addEventListener('click', (subE) => {
    if(subE.target.classList.contains('clickable')){
        lockIconList[i].classList.add('clickable')
        lockIconList[i].style.opacity = '1.0'
        lockIconList[i].style.pointerEvents = 'auto'
        lockIconList[i].classList.add('buttonPressedTextColor')
        subE.target.style.opacity = '0.0'
        subE.target.style.pointerEvents = 'none'
        subE.target.classList.remove('clickable')
        console.log('lock Clicked')
        subE.stopPropagation()
    } else {
        console.log('Click propagated')
        subE.target.parentElement.parentElement.classList.add('topRandomButtonPressed');
    } 
})
})
lockIconList.forEach((e, i) => {
    e.addEventListener('click', subE => {
        if(subE.target.classList.contains('clickable')){
            unlockIconList[i].classList.add('clickable')
            unlockIconList[i].style.opacity = '1.0'
            unlockIconList[i].style.pointerEvents = 'auto'
            subE.target.style.opacity = '0.0'
            subE.target.style.pointerEvents = 'none'
        console.log('lock Clicked')
        subE.stopPropagation()
        } else {
            console.log('Click propagated')
            subE.target.parentElement.parentElement.classList.add('topRandomButtonPressed');
        } 
    })
})
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
    console.log('lock Clicked') 
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
        if(currentRecomendationObject[key][key] === '' || currentRecomendationObject[key][key] === [] 
        || currentRecomendationObject[key].enabled === false) return

        let container = document.createElement('div')
        container.setAttribute('class', 'wordContainer')
        let label = document.createElement('p')
        label.setAttribute('class', 'wordLabel')
        let word = document.createElement('p')
        word.setAttribute('class', 'word')
        if(currentRecomendationObject[key].value === undefined){
            Object.keys(currentRecomendationObject[key]).forEach(subKey => {
                if(subKey === 'value' || subKey === 'enabled') return
                if(currentRecomendationObject[key][subKey].value === '' || currentRecomendationObject[key][subKey].value === [] 
        || currentRecomendationObject[key][subKey].enabled === false) return
                if(subKey === 'enabled')return
                    let container = document.createElement('div')
                    container.setAttribute('class', 'wordContainer')
                    let label = document.createElement('p')
                    label.setAttribute('class', 'wordLabel')
                    let word = document.createElement('p')
                    word.setAttribute('class', 'word')
                    word.textContent = currentRecomendationObject[key][subKey].value
                    label.textContent = subKey
                    container.appendChild(word)
                    container.appendChild(label)
                    recomendationSentence.appendChild(container)
                })
            } else {
            word.textContent = currentRecomendationObject[key].value
            label.textContent = key
            container.appendChild(word)
            container.appendChild(label)
            recomendationSentence.appendChild(container)
        }
    })
}

const updateAdjustmentList = function() {
    let inputList = adjustmentListContainer.querySelectorAll('input.adjustmentInput');
    let bottomButtonList = adjustmentListContainer.querySelectorAll('button.enableButton')
    Object.keys(currentRecomendationObject).forEach(key => {
        const item = currentRecomendationObject[key];

        // If the item is an object and has a value property (like shotType, shotStyle, etc.)
        if (key !== 'clothing') {
            const targetInput = adjustmentListContainer.querySelector(`input#${key}AdjustmentInput`);
            if (targetInput) {
                targetInput.value = item.value || ''; // Set the value or default to an empty string
            }
        } else {  // If it's an object without a value property (like clothing)
            let clothingCombinedValue = "";
            Object.keys(item).forEach(subKey => {
                if (item[subKey] !== 'enabled' && item[subKey] !== 'disabled' && item[subKey] !== 'value' && item[subKey] !== undefined && typeof item[subKey] !== 'boolean') {  // To avoid the 'enabled' property in clothing
                    const subItem = item[subKey];
                    if(currentRecomendationObject[key][subKey].enabled === true){
                        let targetButton = adjustmentListContainer.querySelector(`button#${subKey}EnableButton`)
                        const targetInput = adjustmentListContainer.querySelector(`input#${subKey}AdjustmentInput`);
                        targetInput.value = currentRecomendationObject[key][subKey].value
                        targetButton.textContent = 'disable'
                        targetButton.setAttribute('class', 'enableButton enableButtonPressed')
                    } else {
                        let targetButton = adjustmentListContainer.querySelector(`button#${subKey}EnableButton`)
                        const targetInput = adjustmentListContainer.querySelector(`input#${subKey}AdjustmentInput`);
                        targetInput.value = currentRecomendationObject[key][subKey].value
                        targetButton.textContent = 'enable'
                        targetButton.setAttribute('class', 'enableButton')
                        
                    }

                    // Combine the values for clothing
                    clothingCombinedValue += subItem.value;
                }
            });

            // Assuming the combined clothing input has an ID of 'clothingAdjustmentInput'
            const clothingInput = adjustmentListContainer.querySelector(`input#clothingAdjustmentInput`);
            if (clothingInput) {
                clothingInput.value = clothingCombinedValue;
            }
        }
    });
}






const shuffleSelectedValues = function(){
    console.log(currentRecomendationObject)
    const bottomButtonList = adjustmentListContainer.querySelectorAll('button.enableButton')
    const topButtonList = topButtonContainer.querySelectorAll('.topRandomButton, .topRandomButtonDetails')
    Object.keys(currentRecomendationObject).forEach((key, i )=> {
        const topBotton = topButtonContainer.querySelector(`#${key}`)
        const bottomBotton = adjustmentListContainer.querySelector(`#${key}EnableButton`)
        const item = currentRecomendationObject[key]
        if(!item.enabled) return

            if (key === 'clothing') {
                let firstValue = true;
                Object.keys(item).forEach(subKey => {
                    i++
                    if(item[subKey] === true || item[subKey] === undefined) return
                    if(item[subKey].enabled){
                        const button = document.querySelector(`#${subKey}`)
                        let lockIcon = button.querySelector('.fa-lock')
                        if(lockIcon.style.pointerEvents === 'auto') return
                        
                        let unlockIcon = button.querySelector('.fa-lock-open')
                        unlockIcon.style.opacity = '1.0';
                        unlockIcon.style.pointerEvents = 'auto';
                        unlockIcon.classList.add('buttonPressedTextColor')
                        unlockIcon.classList.add('clickable')
                        
                        button.classList.add('topRandomButtonPressed')
                    
                        const length = data[key][subKey].length;
                        const randomInx = Math.floor(Math.random() * length);
                        const randomVal = data[key][subKey][randomInx];
                        if (subKey === 'head') {
                            item[subKey].value = `wearing a ${randomVal},`;
                            firstValue = false;
                        } else if (subKey === 'arms') {
                            item[subKey].value = ` and ${randomVal}`;
                        } else if (subKey === 'legs') {
                            item[subKey].value = ` ${randomVal},`;
                        } else if(subKey === 'body'){
                            item[subKey].value = ` ${randomVal},`;
                        } else if(subKey === 'outfit'){
                            item[subKey].value = ` in a ${randomVal}`
                        }
                    }
            });
            currentRecomendationObject[key].enabled = true
           

            let lockIcon = topBotton.querySelector('.fa-lock')
            if(lockIcon.style.pointerEvents === 'auto') return
            
            let unlockIcon = topBotton.querySelector('.fa-lock-open')
            unlockIcon.style.opacity = '1.0';
            unlockIcon.style.pointerEvents = 'auto';
            unlockIcon.classList.add('buttonPressedTextColor')
            unlockIcon.classList.add('clickable')
            if(topBotton.id !== 'details'){
                topBotton.classList.add('topRandomButtonPressed')
            } else {
                topBotton.classList.add('topRandomButtonPressed')
            let plusIcon = topBotton.querySelector('.fa-plus')
            plusIcon.classList.add('buttonPressedTextColor')
            let randomIcon = topBotton.querySelector('.fa-shuffle')
            randomIcon.classList.add('buttonPressedTextColor')
            topBotton.setAttribute('class', 'topRandomButtonDetails topRandomButtonPressed')
            
        }
            if(key === "artistStyle"){
                const artistStyleCategories = Object.keys(data.artistStyle);
                const randomCategory = getRandomElement(artistStyleCategories);
                
                const categoryValues = data.artistStyle[randomCategory];
                const randomValue = getRandomElement(categoryValues);
                currentRecomendationObject[key].value = randomValue
                bottomBotton.textContent = 'disable'
                bottomBotton.setAttribute('class', 'enableButton enableButtonPressed')

            } else {
                const length = data[key].length
                const randomInx = Math.floor(Math.random() * length)
                const randomVal = data[key][randomInx]
                currentRecomendationObject[key].value = randomVal
                currentRecomendationObject[key].enabled = true
                console.log(bottomBotton)
                console.log(key)
                bottomBotton.textContent = 'disable'
                bottomBotton.setAttribute('class', 'enableButton enableButtonPressed')
            }
        } else {
            let lockIcon = topBotton.querySelector('.fa-lock')
            if(lockIcon.style.pointerEvents === 'auto') return
            
            let unlockIcon = topBotton.querySelector('.fa-lock-open')
            unlockIcon.style.opacity = '1.0';
            unlockIcon.style.pointerEvents = 'auto';
            unlockIcon.classList.add('buttonPressedTextColor')
            unlockIcon.classList.add('clickable')
            if(topBotton.id !== 'details'){
                topBotton.classList.add('topRandomButtonPressed')
            } else {
            addPlusAndShuffletoDetailsButton(topBotton, detailsButtonClickableIcons)
        }
            if(key === "artistStyle"){
                console.log(currentRecomendationObject)
                const artistStyleCategories = Object.keys(data.artistStyle);
                const randomCategory = getRandomElement(artistStyleCategories);
                
                const categoryValues = data.artistStyle[randomCategory];
                const randomValue = getRandomElement(categoryValues);
                console.log(randomValue)
                currentRecomendationObject[key].value = randomValue
                bottomButtonList.forEach(button => {
                    if(button.id === `${key}EnableButton`){
                        button.textContent = 'disable'
                        button.setAttribute('class', 'enableButton enableButtonPressed')
                    }
                })

            } else {
                const length = data[key].length
                const randomInx = Math.floor(Math.random() * length)
                const randomVal = data[key][randomInx]
                currentRecomendationObject[key].value = randomVal
                currentRecomendationObject[key].enabled = true
                bottomButtonList.forEach(button => {
                    if(button.id === `${key}EnableButton`){
                        button.textContent = 'disable'
                        button.setAttribute('class', 'enableButton enableButtonPressed')

                    }
                })
            }
    }
        
    })
    console.log(currentRecomendationObject)
    updateFinalSentence()
    updateAdjustmentList()

}
shuffleButton.addEventListener('click', e => {
    shuffleSelectedValues()
    
})
let currentRecomendationObject = {

    shotType: {value: '', enabled: false},
    shotStyle: {value: '', enabled: false},
    media: {value: '', enabled: true},
    adjective: {value: '', enabled: true},
    emotion: {value: '', enabled: false},
    subject: {value: '', enabled: true},
    clothing: {
        head: {value: '', enabled: true},
        body: {value: '', enabled: false},
        legs: {value: '', enabled: false},
        arms: {value: '', enabled: false},
        outfit: {value: '', enabled: true},
        enabled: true,
        value: ''},
    action: {value: '', enabled: true},
    scene: {value: '', enabled: true},
    lighting: {value: '', enabled: false},
    details: {value: '', enabled: true},
    artistStyle: {value: '', enabled: true}
}
let topButtons = topButtonContainer.querySelectorAll('.topRandomButton, .topRandomButtonDetails')
topButtons.forEach((e, i) => {
    e.addEventListener('click', (a, i) => {

        if(a.target.classList.contains('detailsIcon')) return
        let id = a.currentTarget.id
        console.log('id:', id)
        if(id === 'head' || id === 'arms' || id === 'body' || id === 'legs' || id === 'outfit'){
            currentRecomendationObject['clothing'][id].enabled = !currentRecomendationObject['clothing'][id].enabled
            let bottomButtonList = adjustmentListContainer.querySelectorAll('button.enableButton')
            if(currentRecomendationObject['clothing'][id].enabled === true){
                console.log("enabled = true:", 'ran')
                bottomButtonList.forEach(subE => {
                    if(subE.id === id + 'EnableButton'){
                        subE.textContent = 'disable'
                        subE.setAttribute('class', 'enableButton enableButtonPressed')
                        console.log('enabled hed,body,kelegs,arms')
                    }
                })

                e.setAttribute('class', 'topRandomButton topRandomButtonPressed')
               activateUnlockIcon(a.currentTarget)
                const length = data['clothing'][id].length
                const randomInx = Math.floor(Math.random() * length)
                const randomVal = data['clothing'][id][randomInx]
                currentRecomendationObject['clothing'][id].value = randomVal
            } else {
                hideUnlockIcon(a.currentTarget)
                hideLockIcon(a.currentTarget)
                e.setAttribute('class', 'topRandomButton')
                bottomButtonList.forEach(subE => {
                    if(subE.id === id + 'EnableButton'){
                        subE.textContent = 'enable'
                        subE.setAttribute('class', 'enableButton')
                    }
                })
            }     
        } else {
            console.log('curr[id]:', currentRecomendationObject[id])
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
                    addPlusAndShuffletoDetailsButton(a.currentTarget, detailsButtonClickableIcons)           
                }
                
                e.setAttribute('class', 'topRandomButton topRandomButtonPressed')
                activateUnlockIcon(a.currentTarget)
                if(id === 'artistStyle'){
                    const categories = Object.keys(data[id]);
                    const categoriesLength = categories.length;
                    const randomCatIndex = Math.floor(Math.random() * categoriesLength);
                    const randomCategory = categories[randomCatIndex];
                
                    const length = data[id][randomCategory].length;
                    const randomIndex = Math.floor(Math.random() * length);
                    const randomVal = data[id][randomCategory][randomIndex];
                
                    currentRecomendationObject[id].value = randomVal;
                    console.log(currentRecomendationObject)
                } else {
                    const length = data[id].length
                    const randomInx = Math.floor(Math.random() * length)
                    const randomVal = data[id][randomInx]
                    currentRecomendationObject[id].value = randomVal
                    console.log(currentRecomendationObject)
                }
            } else {
                hideUnlockIcon(a.currentTarget)
                hideLockIcon(a.currentTarget)
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
    }
    console.log(currentRecomendationObject)
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
            console.log(key)
            if(key === 'clothing'){
                Object.keys(currentRecomendationObject[key]).forEach(subKey => {
                console.log(subKey)
                    if(subKey === 'value' || subKey === 'enabled' || subKey === undefined || subKey.enabled === false) return
                    if(currentRecomendationObject[key][subKey].value !== '' && currentRecomendationObject[key][subKey].value !== 'none' && currentRecomendationObject[key][subKey].enabled === true){
                        sentenceArray.push(currentRecomendationObject[key][subKey].value)
                    }
                })
            }else {

                if(currentRecomendationObject[key].value !== '' && currentRecomendationObject[key].value !== 'none' && currentRecomendationObject[key].enabled === true){
                    sentenceArray.push(currentRecomendationObject[key].value)
                }
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

const createUI = () => {
Object.keys(data).forEach((key, i) => {
    const value = data[key]
    const topButtonList = topButtonContainer.querySelectorAll('.topRandomButton, .topRandomButtonDetails')
    // const dropdown = document.getElementById(`${key}`);
    if(!Array.isArray(data[key])){
        console.log('value',value)
        //handle first element
        let enableButton = document.createElement('button')
        enableButton.setAttribute('class','enableButton')
        enableButton.setAttribute('id',`${key}EnableButton`)
        enableButton.textContent = 'enable'
        enableButton.isPressed = false
        enableButton.addEventListener('click', e => {
        if(e.target.textContent === 'enable'){
            topButtonList.forEach(button => {
                if (button.id === key){
                    button.setAttribute('class', 'topRandomButton topRandomButtonPressed')
                    let lock = button.querySelector('.fa-lock-open')
                    lock.style.opacity = '1.0';
                    lock.style.pointerEvents = 'auto';
                    lock.classList.add('buttonPressedTextColor')
                    lock.classList.add('clickable')
                }
            })
            console.log(topButtonList[i])
            // topButtonList[i]
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
            const input = document.querySelector(`input#${key}AdjustmentInput`)
            if(input.value === ''){
                const length = data[key].length
                const randomInx = Math.floor(Math.random() * length)
                const randomVal = data[key][randomInx]
                currentRecomendationObject[key].value = randomVal
            }
            updateFinalSentence()
            updateAdjustmentList()
       }else if(e.target.textContent === 'disable'){
        topButtonList.forEach(button => {
            if (button.id === key){
                button.setAttribute('class', 'topRandomButton')
                let unlockIcon = button.querySelector('.fa-lock-open')
                unlockIcon.style.opacity = '0';
                unlockIcon.style.pointerEvents = 'none';
                unlockIcon.classList.remove('buttonPressedTextColor')
                unlockIcon.classList.remove('clickable')
                console.log(button)
            }
        })
            // topButtonList[i].setAttribute('class', 'topRandomButton')
            const detailsButton = document.getElementById('details');
            // hideUnlockIcon(e.currentTarget)
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
            Object.keys(currentRecomendationObject[key]).forEach(subKey => {
                currentRecomendationObject[key][subKey].value = ''
            })
        } else {
            if(typeof value === 'object'){
                console.log('isObject', 'true')
            }
            console.log('isObject', 'false')
            
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
                currentRecomendationObject[key].value = ''
                dropdown.value = 'none'
                enableButton.textContent = 'enable'
                enableButton.setAttribute('class', 'enableButton')
                currentRecomendationObject[key].enabled = false
            } else {
                currentRecomendationObject[key] = e.target.value
            }
            updateFinalSentence()
            updateAdjustmentList()
            
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

    if(Array.isArray(value)){
        value.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            dropdown.appendChild(option);
        });
    } else {
        Object.values(value).forEach(subValue => {
            subValue.forEach(e => {
                const option = document.createElement('option');
                option.value = e;
                option.textContent = e;
                dropdown.appendChild(option);
            })
        })
    }

        Object.keys(data[key]).forEach(subKey => {
            let enableButton = document.createElement('button')
            enableButton.setAttribute('class','enableButton')
            enableButton.setAttribute('id',`${subKey}EnableButton`)
            enableButton.textContent = 'enable'
            enableButton.isPressed = false
            enableButton.addEventListener('click', e => {
            if(e.target.textContent === 'enable'){
                let button = adjustmentInputContainer.querySelector(`#${subKey}EnableButton`)
                    if(button.id === enableButton.id){
                        let topButton = topButtonContainer.querySelector(`#${key}`)
                        topButton.setAttribute('class', 'topRandomButton topRandomButtonPressed')
                        console.log(e.target)
                        // const detailsButton = document.getElementById('details');
                        // let plusIcon = detailsButton.querySelector('.fa-plus')
                        // let shuffleIcon = detailsButton.querySelector('.fa-shuffle')
                        // plusIcon.style.opacity = '1.0';
                        // shuffleIcon.style.opacity = '1.0';
                        // plusIcon.style.pointerEvents = 'auto';
                        // shuffleIcon.style.pointerEvents = 'auto';
                        // shuffleIcon.classList.add('buttonPressedTextColor')
                        // plusIcon.classList.add('buttonPressedTextColor')
                        // e.target.textContent = 'disable'
                        // e.target.setAttribute('class', 'enableButton enableButtonPressed')
                        // currentRecomendationObject[key][subKey].enabled = true
                        updateFinalSentence()
                        updateAdjustmentList()
                    }
                
            }else if(e.target.textContent === 'disable'){
                console.log(adjustmentInputContainer)
                let button = adjustmentInputContainer.querySelector(`#${subKey}EnableButton`)
                    if(button.id === enableButton.id){
                        let topButton = topButtonContainer.querySelector(`#${key}`)
                        topButton.setAttribute('class', 'topRandomButton')
                        console.log(button)
                        
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
                        currentRecomendationObject[key][subKey].enabled = false
                        console.log(currentRecomendationObject[key][subKey])
                        const input = document.querySelector(`input#${subKey}AdjustmentInput`)
                        if(input.value === ''){
                            const length = data[key][subKey].length
                            const randomInx = Math.floor(Math.random() * length)
                            const randomVal = data[key][subKey][randomInx]
                            currentRecomendationObject[key][subKey].value = randomVal
                        }
                        updateFinalSentence()
                        updateAdjustmentList()
                    }
                }
            })
            // enableButton.setAttribute('class', 'enableButton')
            const dropdown = document.createElement('select')
            dropdown.setAttribute('class', 'dropdown')
            dropdown.addEventListener('change', e => {
                if(e.target.value === 'none'){
                    currentRecomendationObject[key][subKey].value = ''
                } else {
                    if(typeof value === 'object'){
                        console.log('isObject', 'true')
                    }
                    currentRecomendationObject[key][subKey].value = e.target.value
                    currentRecomendationObject[key][subKey].enabled = true
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
            const itemContainerDiv = document.createElement('div')
            itemContainerDiv.classList.add('itemContainerDiv')
            const itemDetailsFilter = document.createElement('div')
            const p = document.createElement('p')
            p.textContent = 'something to see'
            let itemLabelDiv = document.createElement('div')
            itemLabelDiv.setAttribute('class', 'adjustmentInputLabelContainer')
            let itemlabel = document.createElement('p') 
            itemlabel.setAttribute('for', `${subKey}AdjustmentInput`)
            itemlabel.setAttribute('class', `adjustmentInputLabel`)
            itemlabel.textContent = subKey
            itemLabelDiv.appendChild(itemlabel)
        
            let itemInput = document.createElement('input')
            itemInput.setAttribute('id', `${subKey}AdjustmentInput`)
            itemInput.setAttribute('class', `adjustmentInput`)
            itemInput.setAttribute('type', 'text')
            
            itemInput.addEventListener('input', e => {
                if(e.target.value  === ''){
                    currentRecomendationObject[key][subKey].value = ''
                    dropdown.value = 'none'
                    enableButton.textContent = 'enable'
                    enableButton.setAttribute('class', 'enableButton')
                    currentRecomendationObject[subKey].enabled = false
                } else {
                    currentRecomendationObject[key][subKey].value = e.target.value
                }
                updateFinalSentence()
                updateAdjustmentList()

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
        })

        
    } else{

        let enableButton = document.createElement('button')
        enableButton.setAttribute('class','enableButton')
        enableButton.setAttribute('id',`${key}EnableButton`)
        enableButton.textContent = 'enable'
        enableButton.isPressed = false
        enableButton.addEventListener('click', e => {
        if(e.target.textContent === 'enable'){
            let topButton = topButtonContainer.querySelector(`#${key}`)
            topButton.setAttribute('class', 'topRandomButton topRandomButtonPressed')
            let unlockIcon = topButton.querySelector('.fa-lock-open')
            unlockIcon.style.opacity = '1.0';
            unlockIcon.style.pointerEvents = 'auto';
            unlockIcon.classList.add('buttonPressedTextColor')
            unlockIcon.classList.add('clickable')
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
            const input = document.querySelector(`input#${key}AdjustmentInput`)
            if(input.value === ''){
                const length = data[key].length
                const randomInx = Math.floor(Math.random() * length)
                const randomVal = data[key][randomInx]
                currentRecomendationObject[key].value = randomVal
            }
            updateFinalSentence()
            updateAdjustmentList()
    }else if(e.target.textContent === 'disable'){
        let topButton = topButtonContainer.querySelector(`#${key}`)
        topButton.setAttribute('class', 'topRandomButton')
        let unlockIcon = topButton.querySelector('.fa-lock-open')
                unlockIcon.style.opacity = '0';
                unlockIcon.style.pointerEvents = 'none';
                unlockIcon.classList.remove('buttonPressedTextColor')
                unlockIcon.classList.remove('clickable')
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
        if(typeof value === 'object'){
            console.log('isObject', 'true')
        }
        
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
            currentRecomendationObject[key].value = ''
            dropdown.value = 'none'
            enableButton.textContent = 'enable'
            enableButton.setAttribute('class', 'enableButton')
            currentRecomendationObject[key].enabled = false
        } else {
            currentRecomendationObject[key].value = e.target.value
        }
        updateFinalSentence()
        updateAdjustmentList()
        
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

if(Array.isArray(value)){
    value.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        dropdown.appendChild(option);
    });
} else {
    Object.values(value).forEach(subValue => {
        subValue.forEach(e => {
            const option = document.createElement('option');
            option.value = e;
            option.textContent = e;
            dropdown.appendChild(option);
        })
    })
}
}
});
}
createUI()
shuffleSelectedValues()


const obj = {
    dino1: {
        bite: 'ouch',
        weighs: 10000,
    },
    dino2: {
        bite: 'ehh',
        weighs: 10
    }
}

for(const [k,v] of Object.entries(obj)) {
    if(v.bite === 'ouch'){
        console.log('you\'re dead')
    }
}
console.log(Object.keys(obj))
console.log(Object.entries(obj))
console.log(Object.values(obj))