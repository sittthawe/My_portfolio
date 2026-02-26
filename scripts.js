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