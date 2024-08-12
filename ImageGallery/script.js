const images = document.querySelectorAll('.gallery-image');
let currentIndex = 0;

function showImage(index) {
    images.forEach((image, i) => {
        image.classList.toggle('active', i === index);
    });
}

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

// Show the first image initially
showImage(currentIndex);
