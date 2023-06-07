function autoScrollSlider() {
    var radioButtons = document.querySelectorAll('.slider input[type="radio"]');
    var currentIndex = Array.from(radioButtons).findIndex(function(radioButton) {
        return radioButton.checked;
    });
    var nextIndex = (currentIndex + 1) % radioButtons.length;
    radioButtons[nextIndex].click();
}
var interval = 7000;
var intervalId = setInterval(autoScrollSlider, interval);
var carouselButtons = document.querySelectorAll('.slider input[type="radio"]');
carouselButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        clearInterval(intervalId);
        intervalId = setInterval(autoScrollSlider, interval);
    });
});