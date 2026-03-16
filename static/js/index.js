window.HELP_IMPROVE_VIDEOJS = false;
const MOBILE_BREAKPOINT = 768;
let carouselInstances = [];

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}
document.addEventListener("DOMContentLoaded", () => {
    // 1. Define 12 aesthetic, modern hex colors
    const aestheticColors = [
        "#FF9A9E", // Soft Rose
        "#A18CD1", // Muted Purple
        "#8FD3F4", // Baby Blue
        "#84FAB0", // Mint Green
        "#FCCB90", // Peach
        "#FF7E5F", // Coral
        "#6A11CB", // Deep Purple
        "#2575FC", // Bright Blue
        "#00C9FF", // Cyan
        "#FA709A", // Vibrant Pink
        "#F6D365", // Warm Yellow
        "#FDA085"  // Warm Orange
    ];

    const randomButtons = document.querySelectorAll('.button.is-random-color');

    randomButtons.forEach(button => {
        // 2. Pick a random color for the first stop
        let index1 = Math.floor(Math.random() * aestheticColors.length);

        // 3. Pick a second random color, ensuring it's not the same as the first
        let index2 = Math.floor(Math.random() * aestheticColors.length);
        while (index1 === index2) {
            index2 = Math.floor(Math.random() * aestheticColors.length);
        }

        const color1 = aestheticColors[index1];
        const color2 = aestheticColors[index2];

        // 4. Generate a random angle for the gradient direction
        const angle = Math.floor(Math.random() * 360);

        // 5. Combine them into the CSS gradient string
        const randomGradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

        // 6. Inject the gradient into the button's CSS variable
        button.style.setProperty('--random-grad', randomGradient);
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function () {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';

            setTimeout(function () {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function (err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function () {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function () {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');

    if (carouselVideos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

function cleanupCarouselDOMForMobile() {
    document.querySelectorAll('.results-carousel').forEach(carousel => {
        carousel.classList.add('plain-carousel');

        carousel.querySelectorAll('.slider-navigation-previous, .slider-navigation-next, .slider-pagination').forEach(el => {
            el.remove();
        });

        carousel.removeAttribute('tabindex');
        carousel.style.removeProperty('height');
        carousel.style.removeProperty('overflow');

        carousel.querySelectorAll('.item').forEach(item => {
            item.style.removeProperty('left');
            item.style.removeProperty('width');
            item.style.removeProperty('transform');
        });
    });
}

function initDesktopCarousels() {
    if (carouselInstances.length > 0) return;

    const options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    carouselInstances = bulmaCarousel.attach('.carousel', options) || [];
    document.querySelectorAll('.results-carousel').forEach(carousel => {
        carousel.classList.remove('plain-carousel');
    });
}

function destroyDesktopCarousels() {
    if (carouselInstances.length > 0) {
        carouselInstances.forEach(instance => {
            if (instance && typeof instance.destroy === 'function') {
                instance.destroy();
            }
        });
        carouselInstances = [];
    }

    cleanupCarouselDOMForMobile();
}

function applyResponsiveCarouselMode() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
        destroyDesktopCarousels();
    } else {
        initDesktopCarousels();
    }
}

$(document).ready(function () {
    bulmaSlider.attach();
    applyResponsiveCarouselMode();
    window.addEventListener('resize', applyResponsiveCarouselMode);

    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

})
