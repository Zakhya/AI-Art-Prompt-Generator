export const addPlusAndShuffletoDetailsButton = (target, detailsButtonClickableIcons) => {
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
        target.classList.add('topRandomButtonPressed')
}
export const activateUnlockIcon = (target) => {
    let unlockIcon = target.querySelector('.fa-lock-open')
    unlockIcon.style.opacity = '1.0';
    unlockIcon.style.pointerEvents = 'auto';
    unlockIcon.classList.add('buttonPressedTextColor')
    unlockIcon.classList.add('clickable')
}
export const hideLockIcon = (target) => {
    let lockIcon = target.querySelector('.fa-lock')
    lockIcon.classList.remove('clickable')
    lockIcon.style.opacity = '0';
    lockIcon.style.pointerEvents = 'none';
    lockIcon.classList.remove('buttonPressedTextColor')
}
export const hideUnlockIcon = (target) => {
    let unlockIcon = target.querySelector('.fa-lock-open')
    unlockIcon.style.opacity = '0';
    unlockIcon.style.pointerEvents = 'none';
    unlockIcon.classList.remove('buttonPressedTextColor')
    unlockIcon.classList.remove('clickable')
}

export const removeActiveButtonClass = (location) => {
    if(location === 'index.html'){
        randomSentenceButton.classList.remove('activeButton')
    } else if (location === 'matsAndPats.html'){
        materialAndPatternsButton.classList.remove('activeButton')
    } else if(location === 'artStyleCombos.html') {
        artStyleComboButton.classList.remove('activeButton')
    } else if(location === 'sentenceBuilderButton.html'){
        sentenceBuilderButton.classList.remove('activeButton')
    }
}