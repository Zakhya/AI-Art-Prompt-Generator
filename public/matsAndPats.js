import { removeActiveButtonClass } from "./functions.js"
const sentenceBuilderButton = document.querySelector('#sentenceBuilderButton')
const randomSentenceButton = document.querySelector('#randomSentenceButton')
const materialAndPatternsButton = document.querySelector('#materialAndPatternsButton')
const artStyleComboButton = document.querySelector('#artStyleComboButton')
materialAndPatternsButton.classList.add('activeButton')

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