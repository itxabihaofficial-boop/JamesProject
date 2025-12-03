const faceImage = document.getElementById("face-image");
const panels = document.querySelectorAll(".panel");
const moon = document.getElementById("moon");
const clouds = document.querySelectorAll(".cloud");
const faceWrapper = document.getElementById("face-wrapper");
const verticalLine = document.getElementById("vertical-line");
const summaryPanel = document.getElementById("summary-panel");

// 1. Wrap the logic in a function
function handleScroll() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const centerOfView = scrollY + (viewportHeight / 2);

    // --- 0. FACE VISIBILITY ---
    if (scrollY > 300) {
        faceWrapper.classList.add("visible");
    } else {
        faceWrapper.classList.remove("visible");
    }

    // --- 1. ACTIVE PANEL DETECTION ---
    panels.forEach(panel => {
        const rect = panel.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3) {
            panel.classList.add("active");
            const newFace = panel.getAttribute("data-face");
            if (newFace && faceImage.src !== newFace) {
                faceImage.src = newFace;
            }
        } else {
            panel.classList.remove("active");
        }
    });

    // --- 2. BACKGROUND ANIMATION ---
    const maxScroll = document.body.scrollHeight - viewportHeight;
    moon.style.opacity = scrollY > maxScroll * 0.45 ? 1 : 0;
    clouds.forEach(cloud => {
        cloud.style.opacity = scrollY > maxScroll * 0.45 ? 0 : 0.6;
    });

    // --- 3. STOP LOGIC AT SUMMARY ---
    const summaryRect = summaryPanel.getBoundingClientRect();
    const summaryBottomAbsolute = summaryRect.bottom + scrollY;
    const faceHeight = faceWrapper.offsetHeight;
    const stopPoint = summaryBottomAbsolute - (faceHeight / 2);

    if (centerOfView >= stopPoint) {
        faceWrapper.style.position = "absolute";
        faceWrapper.style.top = stopPoint + "px";
        verticalLine.style.height = stopPoint + "px"; 
    } else {
        faceWrapper.style.position = "fixed";
        // Ensure this matches your CSS default
        faceWrapper.style.top = "70%";
        verticalLine.style.height = "100%";
    }
}

// 2. Add Event Listener
window.addEventListener("scroll", handleScroll);

// 3. Trigger once on load to set initial state correctly
handleScroll();

// FAQ Accordion Logic
document.querySelectorAll(".faq-header").forEach(header => {
    header.addEventListener("click", () => {
        header.parentElement.classList.toggle("active");
    });
});