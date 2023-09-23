import { removeActiveButtonClass } from "./functions.js"
const randomSentenceButton = document.querySelector('#randomSentenceButton')
const sentenceBuilderButton = document.querySelector('#sentenceBuilderButton')
sentenceBuilderButton.classList.add('activeButton')
const wordButtonContainer = document.querySelector('.wordButtonContainer')
const wordButtons = wordButtonContainer.querySelectorAll('.wordButton')

const materialAndPatternsButton = document.querySelector('#materialAndPatternsButton')
const artStyleComboButton = document.querySelector('#artStyleComboButton')

artStyleComboButton.addEventListener('click', e => {
    const location = window.location
    removeActiveButtonClass(location)
    window.location.href = 'artStyleCombos.html'
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


const addWordButton = document.querySelector('#addWordButton')
console.log(addWordButton)
addWordButton.addEventListener('click', async e => {
    const embedding = await getEmbeddingForWord("house");
    console.log(embedding)
    await saveEmbeddingToFile({word: "house", embedding: embedding});
    
})

const API_ENDPOINT = "https://api.openai.com/v1/embeddings";
const API_KEY = "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";  // Replace with your API key

async function getEmbeddingForWord(word) {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-embedding-ada-002",  // Assuming you're using this model
            input: word
        })
    });

    const data = await response.json();
    return data.data[0].embedding;  // This will be the embedding vector for the word "house"
}

async function saveEmbeddingToFile(data) {
    const response = await fetch('/saveEmbedding', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.error("Failed to save embedding:", await response.text());
    }
}