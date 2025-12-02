const faceImage = document.getElementById("face-image");
const panels = document.querySelectorAll(".panel");
const moon = document.getElementById("moon");
const clouds = document.querySelectorAll(".cloud");
const faceWrapper = document.getElementById("face-wrapper");
const verticalLine = document.getElementById("vertical-line");
const summaryPanel = document.getElementById("summary-panel");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Calculate the exact center of the current view
    const centerOfView = scrollY + (viewportHeight / 2);

    // --- 0. FACE VISIBILITY ---
    // Hide face at top so it doesn't block Intro. Show after 100px scroll.
    if (scrollY > 100) {
        faceWrapper.classList.add("visible");
    } else {
        faceWrapper.classList.remove("visible");
    }

    // --- 1. ACTIVE PANEL DETECTION ---
    panels.forEach(panel => {
        const rect = panel.getBoundingClientRect();
        // Active Zone: Middle 40% of screen
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
    // We get the absolute position of the bottom of the summary panel
    const summaryRect = summaryPanel.getBoundingClientRect();
    const summaryBottomAbsolute = summaryRect.bottom + scrollY;
    
    // Determine the stop point: Bottom of summary minus half the face height
    // This makes the face "sit" at the end of the summary section
    const faceHeight = faceWrapper.offsetHeight;
    const stopPoint = summaryBottomAbsolute - (faceHeight / 2);

    if (centerOfView >= stopPoint) {
        // --- LOCKED STATE (End of Timeline) ---
        
        // 1. Position Face Absolutely at the stop point
        faceWrapper.style.position = "absolute";
        faceWrapper.style.top = stopPoint + "px";
        
        // 2. Cut off the Vertical Line
        // The line should end exactly where the center of the face is
        verticalLine.style.height = stopPoint + "px"; 
    } else {
        // --- SCROLLING STATE ---
        
        // 1. Face is Fixed in Center
        faceWrapper.style.position = "fixed";
        faceWrapper.style.top = "50%";
        
        // 2. Vertical Line spans full height
        verticalLine.style.height = "100%";
    }
});

// FAQ Accordion Logic
document.querySelectorAll(".faq-header").forEach(header => {
    header.addEventListener("click", () => {
        header.parentElement.classList.toggle("active");
    });
});