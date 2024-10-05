document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.photo-frame img');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src'); // Set the src from data-src
                img.parentElement.classList.add('show'); // Add show class to the frame
                observer.unobserve(img); // Stop observing once loaded
            }
        });
    }, observerOptions);

    images.forEach(img => {
        observer.observe(img); // Start observing each image
    });

    // Create Fullscreen Image Modal
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.classList.add('fullscreen-image');
    fullscreenDiv.innerHTML = `<span class="close-btn">&times;</span><img src="" alt="Enlarged Screenshot">`;
    document.body.appendChild(fullscreenDiv);

    const fullscreenImg = fullscreenDiv.querySelector('img');
    const closeBtn = fullscreenDiv.querySelector('.close-btn');

    // Function to enlarge image
    window.enlargeImage = function(element) {
        const imgSrc = element.querySelector('img').src;
        fullscreenImg.src = imgSrc;
        fullscreenDiv.classList.add('show');
    };

    // Close modal functionality
    closeBtn.addEventListener('click', () => {
        fullscreenDiv.classList.remove('show');
    });

    fullscreenDiv.addEventListener('click', (e) => {
        if (e.target !== fullscreenImg) {
            fullscreenDiv.classList.remove('show');
        }
    });

    // Animate frames as they come into view
    const frames = document.querySelectorAll('.photo-frame');
    frames.forEach((frame, index) => {
        const delay = (index + 1) * 400; // delay for animation
        setTimeout(() => {
            frame.classList.add('show'); // Assuming show class animates visibility
        }, delay);
    });
});
