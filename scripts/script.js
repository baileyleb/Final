/*author: Bailey L. last updated: 2024-07-21*/

/*Pop-up*/
const popup = document.getElementById('pop-up');
const closeButton = document.getElementById("close-pop-up");
let opacity = 0;
let popupAnimationFrameHandler;
let popupTimeoutHandler;
let blockPopup = false;

//display pop-up after 3 seconds
popupTimeoutHandler = setTimeout(() => {
    if (!blockPopup) {
        popup.style.display = "block";
        popupAnimationFrameHandler = requestAnimationFrame(fadeIn);
    }
}, 3000);

//close pop-up button
closeButton.addEventListener('click', function () {
    popup.style.display = "none";
});

//fade pop-up in
function fadeIn() {
    opacity += 0.1;
    if (opacity <= 1) {
        popupTimeoutHandler = setTimeout(() => {
            popup.style.opacity = opacity;
            popupAnimationFrameHandler = requestAnimationFrame(fadeIn);
        }, 100);
    }
    else {
        cancelAnimationFrame(popupAnimationFrameHandler);
    }
}

/*Animation*/
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const bike = document.getElementById("bike");
let animationFrameHandler;
let animationTimeoutHandler;
let counter = 1;
let isAnimated = false;

//start animation
start.addEventListener('click', function () {
    blockPopup = true;
    if (!isAnimated) {
        isAnimated = true;
        animationFrameHandler = requestAnimationFrame(cycle);
    }
});

//stop animation
stop.addEventListener('click', function () {
    isAnimated = false;
    cancelAnimationFrame(animationFrameHandler);
    clearTimeout(timeoutHandler);
});

//cycle bike images
function cycle() {
    counter++;
    if (counter > 34) {
        counter = 1;
        bike.src = `../images/product-images/bike-${counter}.jpg`;
        timeoutHandler = setTimeout(() => {
            animationFrameHandler = requestAnimationFrame(cycle);
        }, 100);
    }
    else {
        bike.src = `../images/product-images/bike-${counter}.jpg`;
        timeoutHandler = setTimeout(() => {
            animationFrameHandler = requestAnimationFrame(cycle);
        }, 100);
    }
}