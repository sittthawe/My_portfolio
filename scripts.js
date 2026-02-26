// Typing Effect
const textArray = [
    "Backend Specialist",
    "Django & Docker Developer",
    "Cloud Deployment Engineer",
    "Machine Learning Enthusiast"
];

let typingIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
    if (typingIndex >= textArray.length) typingIndex = 0;

    currentText = textArray[typingIndex];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex === 0) {
            isDeleting = false;
            typingIndex++;
        }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// Active Navbar Highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Scroll Reveal Animation
const revealTargets = document.querySelectorAll(
    ".section, .skill, .project-card, .certificate-card, .certificate-image-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.transitionDelay = `${(index % 4) * 70}ms`;
        revealObserver.observe(element);
    });
} else {
    revealTargets.forEach(element => {
        element.classList.add("reveal", "is-visible");
    });
}

// Tap-to-View Image Modal
const previewImages = document.querySelectorAll(".hero-image img, .certificate-image");
const imageModal = document.getElementById("imageModal");
const imageModalContent = document.getElementById("imageModalContent");
const imageModalClose = document.getElementById("imageModalClose");

function openImageModal(image) {
    imageModalContent.src = image.src;
    imageModalContent.alt = image.alt || "Expanded image preview";
    imageModal.classList.add("is-open");
    imageModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeImageModal() {
    imageModal.classList.remove("is-open");
    imageModal.setAttribute("aria-hidden", "true");
    imageModalContent.src = "";
    document.body.style.overflow = "";
}

previewImages.forEach(image => {
    image.addEventListener("click", () => openImageModal(image));
});

imageModalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", event => {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && imageModal.classList.contains("is-open")) {
        closeImageModal();
    }
});
