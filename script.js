let recomendationSentence = document.getElementById('recommendationSentence')
let adjustmentListContainer = document.getElementById('adjustmentListContainer')

const updateFinalSentence = function(){
    recomendationSentence.innerHTML = ''
    Object.keys(currentRecomendationObject).forEach(key => {
        if(currentRecomendationObject[key] === '') return
        let container = document.createElement('div')
        container.setAttribute('class', 'wordContainer')
        let label = document.createElement('p')
        label.setAttribute('class', 'wordLabel')
        let word = document.createElement('p')
        word.setAttribute('class', 'word')
        word.textContent = currentRecomendationObject[key]
        label.textContent = key
        container.appendChild(word)
        container.appendChild(label)
        recomendationSentence.appendChild(container)
        
    })
    console.log(currentRecomendationObject)
    console.log('update ran')
}
const updateAdjustmentList = function(){
    let inputList = adjustmentListContainer.querySelectorAll('input.adjustmentInput')
    Object.keys(currentRecomendationObject).forEach(key => {
        inputList.forEach(a => {
            if(a.id === `${[key]}AdjustmentInput`){  
                    a.value = ` ${currentRecomendationObject[key]}`
            }
        })
    })
    console.log(inputList)
}

let currentRecomendationObject = {
    media: '',
    adjective: '',
    subject: '',
    looksLike: '',
    clothing: '',
    action: '',
    scene: '',
    details: '',
    composition: '',
    artistStyle: ''
}

const data = {
    media:['Photo of a', 'Picture of a', 'Painting of a', 'drone shot of a'],
    adjective:[' angry', ' cute', ' fluffy'],
    subject: [' man', ' woman', ' bird', ' dog'],
    looksLike: ['that looks like Selena Gomez', 'that looks like Chris Pratt'],
    clothing: [' wearing a cape', ' wearing a hat', ' wearing a suit of armor'],
    action: [' fighting', ' running'],
    scene: ['in the city streets,', ' in a meadow,', ' in the moutains,', ' in a sunset,'],
    details: [' reflections,', ' metal,', ' action packed,'],
    composition: [' 8K,', ' high detail,', ' realistic,'],
    artistStyle: ['in the style of Dr. Suess']
}

Object.keys(data).forEach(key => {
    const dropdown = document.getElementById(`${key}`);
    dropdown.addEventListener('change', e => {
        if(e.target.value === 'none'){
            currentRecomendationObject[key] = ''
        } else {
            currentRecomendationObject[key] = e.target.value
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

    itemContainer.appendChild(itemlabel)
    itemContainer.appendChild(itemInput)
    adjustmentListContainer.appendChild(itemContainer)

    data[key].forEach(item => {
        // populate dropdowns
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        dropdown.appendChild(option);
    });
});
