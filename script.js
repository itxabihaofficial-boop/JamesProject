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
    if (scrollY > 100) {
        faceWrapper.classList.add("visible");
    } else {
        faceWrapper.classList.remove("visible");
    }

    // --- 1. ACTIVE PANEL DETECTION (Triggers Animation) ---
    panels.forEach(panel => {
        const rect = panel.getBoundingClientRect();
        
        // Define an "Active Zone" in the middle of the screen
        // If the panel enters this zone, we trigger the line animation
        if (rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3) {
            
            // Add .active class -> CSS triggers line animation
            panel.classList.add("active");

            // Swap Face Image
            const newFace = panel.getAttribute("data-face");
            if (newFace && faceImage.src !== newFace) {
                faceImage.src = newFace;
            }
        } else {
            // Remove class when scrolling away (Optional: remove this else block if you want lines to stay once shown)
            panel.classList.remove("active");
        }
    });

    // --- 2. BACKGROUND ANIMATION ---
    const maxScroll = document.body.scrollHeight - viewportHeight;
    moon.style.opacity = scrollY > maxScroll * 0.45 ? 1 : 0;
    clouds.forEach(cloud => {
        cloud.style.opacity = scrollY > maxScroll * 0.45 ? 0 : 0.6;
    });

    // --- 3. STOP FACE AT SUMMARY ---
    const summaryBottom = summaryPanel.offsetTop + summaryPanel.offsetHeight;
    const faceHalf = faceWrapper.offsetHeight / 2;

    if (scrollY + faceHalf > summaryBottom) {
        faceWrapper.style.position = "absolute";
        faceWrapper.style.top = (summaryBottom - faceHalf) + "px";
        verticalLine.style.height = (summaryBottom - 350) + "px"; 
    } else {
        faceWrapper.style.position = "fixed";
        faceWrapper.style.top = "50%";
        verticalLine.style.height = "100%";
    }
});

// FAQ Accordion
document.querySelectorAll(".faq-header").forEach(header => {
    header.addEventListener("click", () => {
        header.parentElement.classList.toggle("active");
    });
});