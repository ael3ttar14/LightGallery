let images = Array.from(document.querySelectorAll('.item img'));
let lightbox = document.getElementById('lightbox');
let box = document.getElementById('box');
let nextBtn = document.querySelector('.fa-circle-right');
let prevBtn = document.querySelector('.fa-circle-left');
let closeBtn = document.getElementById('closebtn');
let currentIndex = 0;
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        box.style.backgroundImage = `url(${img.src})`;
        currentIndex = index;

        setTimeout(() => {
            lightbox.classList.add('show');
        }, 10);
    });
});
function showImage(index) {
    box.style.backgroundImage = `url(${images[index].src})`;
}
function next() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
function closeLightbox() {
    lightbox.classList.remove('show');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
}
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') closeLightbox();
});
let startX = 0;
box.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});
box.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;
    if (diff > 50) next();       
    if (diff < -50) prev();    
});
