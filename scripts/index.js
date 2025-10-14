function autoScrollSlider() {
    var radioButtons = document.querySelectorAll('.slider input[type="radio"]');
    var currentIndex = Array.from(radioButtons).findIndex(function (radioButton) {
        return radioButton.checked;
    });
    var nextIndex = (currentIndex + 1) % radioButtons.length;
    radioButtons[nextIndex].click();
}
var interval = 7000;
var intervalId = setInterval(autoScrollSlider, interval);
var carouselButtons = document.querySelectorAll('.slider input[type="radio"]');
carouselButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        clearInterval(intervalId);
        intervalId = setInterval(autoScrollSlider, interval);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = Array.from(carousel.children);
    const numItems = items.length;


    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    const updateAnimationDuration = () => {
        const isHorizontal = window.innerWidth <= 768;
        const animationDuration = isHorizontal ? 3 * numItems : 5 * numItems;
        carousel.style.animationDuration = `${animationDuration}s`;
    };

    window.addEventListener('resize', updateAnimationDuration);
    updateAnimationDuration();
});