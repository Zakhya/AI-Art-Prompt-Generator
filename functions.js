export const addPlusAndShuffletoDetailsButton = (target) => {
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