import { data } from "./data.js"
import { removeActiveButtonClass } from "./functions.js"
const sentenceBuilderButton = document.querySelector('#sentenceBuilderButton')
const randomSentenceButton = document.querySelector('#randomSentenceButton')
const materialAndPatternsButton = document.querySelector('#materialAndPatternsButton')
const recommendationSentence = document.querySelector('#recommendationSentence')
const artStyleComboButton = document.querySelector('#artStyleComboButton')
const topButtonContainer = document.querySelector('.topButtonContainer')

artStyleComboButton.classList.add('activeButton')

const buttonList = topButtonContainer.querySelectorAll('button.topRandomButton')
console.log(buttonList)
buttonList.forEach(button => {
    button.addEventListener('click', e => {
        if(button.classList.contains('topRandomButtonPressed')){
            Object.keys(artStyleObject).forEach(key => {
                console.log(key)
                if(key === button.id){
                    artStyleObject[key].enabled = false
                    artStyleObject[key].value = ''
                    button.classList.remove('topRandomButtonPressed')
                    shuffleSelectedValues()
                    updateDisplaySentence()
                }
            })
        } else {
            Object.keys(artStyleObject).forEach(key => {
                console.log(key)
                if(key === button.id){
                    artStyleObject[key].enabled = true
                    button.classList.add('topRandomButtonPressed')
                    shuffleSelectedValues()
                    updateDisplaySentence()
                }
            })
        }
    })
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
    artStyle1: {
        enabled: true,
        value: '',
    },
    artStyle2: {
        enabled: true,
        value: '',
    },
    artStyle3: {
        enabled: false,
        value: '',
    },
    artStyle4: {
        enabled: false,
        value: '',
    },
    artStyle5: {
        enabled: false,
        value: '',
    },
}


function shuffleSelectedValues(){
    const keys = Object.keys(artStyleObject);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (artStyleObject[key].enabled === true && artStyleObject[key].value === ''){
            const categoryKeys = Object.keys(data['artistStyle']);  
            const randomCatKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)]; 

            const randomCatArray = data['artistStyle'][randomCatKey]; 
            let randomVal = randomCatArray[Math.floor(Math.random() * randomCatArray.length)];

            // if (i !== 0 && randomVal.startsWith('in the style of')) {
            //     randomVal = randomVal.replace('in the style of', '').trim();
            // }
            // if (artStyleObject[keys[i + 1]]) {
            //     randomVal += ',';
            // }

            artStyleObject[key].value = randomVal;
        }
    }
}

function updateTopButtons(){
    Object.keys(artStyleObject).forEach(key => {
        if(artStyleObject[key].enabled === true){
            console.log(key)
            let button = document.querySelector(`#${key}`)
            button.classList.add('topRandomButtonPressed')
        }
    })
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
        if (i !== 0 && wordValue.startsWith('in the style of')) {
            wordValue = wordValue.replace('in the style of', '').trim();
        }
        if (i !== enabledKeys.length - 1) {
            wordValue += ',';
        }
        if(i !== 0){
            wordValue = 'and ' + wordValue  
        }

        word.textContent = wordValue;
        label.textContent = key;
        container.appendChild(word);
        container.appendChild(label);
        recommendationSentence.appendChild(container);
    });
}







shuffleSelectedValues()
updateDisplaySentence()
updateTopButtons()
console.log(artStyleObject)