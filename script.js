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
        
        // "Active Zone": If panel is in the middle 40% of the screen
        if (rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3) {
            
            // This triggers the CSS connector line animation
            panel.classList.add("active");

            // Change Face Image
            const newFace = panel.getAttribute("data-face");
            if (newFace && faceImage.src !== newFace) {
                faceImage.src = newFace;
            }
        } else {
            // Remove active class when scrolling away (connector shrinks back)
            panel.classList.remove("active");
        }
    });

    // --- 2. BACKGROUND ANIMATION ---
    const maxScroll = document.body.scrollHeight - viewportHeight;
    moon.style.opacity = scrollY > maxScroll * 0.45 ? 1 : 0;
    clouds.forEach(cloud => {
        cloud.style.opacity = scrollY > maxScroll * 0.45 ? 0 : 0.6;
    });

    // --- 3. STOP LOGIC AT BOTTOM ---
    const summaryBottom = summaryPanel.offsetTop + summaryPanel.offsetHeight;
    const faceHalf = faceWrapper.offsetHeight / 2;

    if (scrollY + faceHalf > summaryBottom) {
        // Stop Face
        faceWrapper.style.position = "absolute";
        faceWrapper.style.top = (summaryBottom - faceHalf) + "px";
        
        // Stop Vertical Line
        // Since top is 0, height = distance to bottom of summary
        verticalLine.style.height = summaryBottom + "px"; 
    } else {
        // Sticky Face
        faceWrapper.style.position = "fixed";
        faceWrapper.style.top = "50%";
        
        // Full Fixed Line
        verticalLine.style.height = "100%";
    }
});

// FAQ Accordion
document.querySelectorAll(".faq-header").forEach(header => {
    header.addEventListener("click", () => {
        header.parentElement.classList.toggle("active");
    });
});