let recomendationSentence = document.getElementById('recommendationSentence')

const updateFinalSentence = function(){
    recomendationSentence.innerHTML = ''
    Object.keys(currentRecomendationObject).forEach(key => {
        if(currentRecomendationObject[key]=== '') return
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
    media:['Photo of', 'Picture of', 'Painting of', 'drone shot of'],
    adjective:[' angry', ' cute', ' fluffy'],
    subject: [' man', ' woman', ' bird', ' dog'],
    looksLike: [' Selena Gomez', ' Chris Pratt'],
    clothing: [' cape', ' hat', ' armor'],
    action: [' fighting', ' running'],
    scene: [' city streets', ' meadow', ' moutains', ' sunset'],
    details: [' reflections', ' metal', ' action packed'],
    composition: [' 8K', ' high detail', ' realistic'],
    artistStyle: [' Dr. Suess']
}

Object.keys(data).forEach(key => {
    const dropdown = document.getElementById(`${key}`);
    dropdown.addEventListener('change', e => {
        currentRecomendationObject[key] = e.target.value
        console.log(currentRecomendationObject)
        updateFinalSentence()
    })
    data[key].forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        dropdown.appendChild(option);
    });
});
