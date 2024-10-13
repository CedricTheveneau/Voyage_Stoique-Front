const sections = document.querySelectorAll(".toAnimate");
const options = { rootMargin: "-50%" };

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const intersecting = entry.isIntersecting;
    if (intersecting) {
      entry.target.classList.add("animated");
    }
  });
}, options);

// loop
sections.forEach((section) => {
  observer.observe(section);
});


//! ---------- NAVBAR ---------- !//

//* Changes the navbar bg on scroll
window.addEventListener("scroll", () => {
  if (scrollY > 10) {
    document.querySelector("header").style.backgroundColor =
      "var(--themeLight)";
  } else {
    document.querySelector("header").style.backgroundColor = "transparent";
  }
});

//! ---------- SCROll ARROWS ---------- !//

//* Turns arrows 180deg once you've reached the bottom of the screen
window.onscroll = function (ev) {
  if (
    window.innerHeight + Math.round(window.scrollY) >=
    document.body.offsetHeight - 50
  ) {
    document.querySelector(".overflay svg").style.transform =
      "rotateZ(180deg)";
  } else if (
    window.innerHeight + Math.round(window.scrollY) <= window.innerHeight &&
    document.querySelector(".carousel") == null &&
    document.querySelector(".hero") == null
  ) {
    document.querySelector(".overflay svg").style.transform =
      "translateX(-48vw) scale(0.5)";
  } else if (
    window.innerHeight + Math.round(window.scrollY) <=
    window.innerHeight
  ) {
    document.querySelector(".overflay svg").style.transform = "rotateZ(0deg)";
  } else if (
    window.innerHeight + Math.round(window.scrollY) >
    window.innerHeight + 50
  ) {
    document.querySelector(".overflay svg").style.transform =
      "translateX(-48vw) scale(0.5)";
  } else if (
    window.innerHeight + Math.round(window.scrollY) >= window.innerHeight &&
    document.querySelector(".carousel") == null &&
    document.querySelector(".hero") == null
  ) {
    document.querySelector(".overflay svg").style.transform =
      "translateX(-48vw) scale(0.5)";
  }
};

  if (
    window.innerHeight + Math.round(window.scrollY) >= window.innerHeight &&
    document.querySelector(".carousel") == null &&
    document.querySelector(".hero") == null
  ) {
    document.querySelector(".overflay svg").style.transform =
      "translateX(-48vw) scale(0.5)";
  }

//! ---------- PROGRESS BAR ---------- //

const articleCore = document.querySelector('.content.fit.articleCore');
const header = document.querySelector('header');

const updateProgressBar = () => {
    const articleHeight = articleCore.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const articleTop = articleCore.offsetTop;

    const headerHeight = header.offsetHeight; 

    const maxScroll = articleHeight - windowHeight;

    let scrollPercentage = (scrollTop - articleTop + headerHeight) / maxScroll * 100;

    scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 100);

    if (scrollTop >= (window.innerHeight - headerHeight)) {
        header.style.setProperty('--progressBarValue', `${scrollPercentage}%`);
    } else {
        header.style.setProperty('--progressBarValue', `0%`);
    }
}
if (articleCore && header) {
  window.addEventListener('scroll', updateProgressBar);
}

//! ---------- SUMMARY INTERSECTION OBSERVER ---------- //

const anchors = document.querySelectorAll('.heroSummary a');
const headings = document.querySelectorAll('h2[id], h3[id]');

let activeId = null;

  const setActiveAnchor = (entries) => {
    let currentActiveId = null;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            currentActiveId = id;
        }
    });

    if (currentActiveId) {
        activeId = currentActiveId;
    }

    anchors.forEach(anchor => {
        const anchorId = anchor.getAttribute('href').substring(1);

        if (anchorId === activeId) {
            anchor.classList.add('active');
        } else {
            anchor.classList.remove('active');
        }
    });
}

// Créez un nouvel Intersection Observer
const summaryObserver = new IntersectionObserver(setActiveAnchor, {
    root: null, // Utilise la fenêtre comme racine
    rootMargin: '0px', // Aucun décalage
    threshold: 0.1 // 10% de visibilité
});

// Observer tous les headings
headings.forEach(heading => {
  summaryObserver.observe(heading);
});

//! ---------- MOVE ARTICLE CONTENT INFO ---------- //

const articleContentInfo = document.querySelector('.articleContentInfo');
const articleAside = document.querySelector('.articleAside');
let originalParent;
if (articleContentInfo) {
  originalParent = articleContentInfo.parentElement;
}
const moveContentInfo = () => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    const threshold = viewportHeight - 58;

    if (scrollPosition > threshold) {
        if (!articleAside.contains(articleContentInfo)) {
            articleAside.insertBefore(articleContentInfo, articleAside.firstChild);
        }
    } else {
        if (!originalParent.contains(articleContentInfo)) {
            originalParent.appendChild(articleContentInfo);
        }
    }
}
if (articleContentInfo && articleAside && originalParent) {
  window.addEventListener('scroll', moveContentInfo); 
}

//! ---------- RESPONSIVE TEXT AREA ---------- //

const commentArea = document.querySelectorAll("textarea");

if (commentArea) {
  commentArea.forEach(e => {
  e.addEventListener("input", () => {
  e.style.height = "auto";
  e.style.height = e.scrollHeight + "px";
});
});
}

//! ---------- RESPONSIVE MENU TOGGLE ---------- !//

//* Set needed variables
const menuToggle = document.querySelector(".navbarToggle");
const toggleSvgs = document.querySelectorAll(".navbarToggleSVG");
const navbar = document.querySelectorAll(".navbar")[0];

//* Detects click on menuToggle and changes the displayed SVG and saves in local storage the theme preference
if (menuToggle && toggleSvgs) {
  menuToggle.addEventListener("click", () => {
    toggleSvgs.forEach((e) => {
      e.classList.toggle("toggle");
    });
    if (toggleSvgs[0].classList.contains("toggle")) {
      navbar.classList.remove("active");
    } else {
      navbar.classList.add("active");
    }
  });
}

//* Prevents the keyframe on page load
setTimeout(function () {
  document.body.classList.remove("preload");
}, 500);

//! ---------- DARK/LIGHT MODE ---------- !//

//* Set needed variables
const button = document.querySelector(".darkModeToggle");
const svgs = document.querySelectorAll(".darkModeToggleSVG");
const body = document.getElementsByTagName("body")[0];

//* Detects click on button and changes the displayed SVG and saves in local storage the theme preference
button.addEventListener("click", () => {
svgs.forEach((e) => {
  e.classList.toggle("toggle");
});
if (svgs[1].classList.contains("toggle")) {
  localStorage.setItem("LightningUI-Theme", "Light");
  body.classList.remove("dark");
} else {
  localStorage.setItem("LightningUI-Theme", "Dark");
  body.classList.add("dark");
}
});

//* Fetches if a prefered theme is defined in local storage, if yes, uses it
const autoDarkTheme = () => {
const preferedTheme = localStorage.getItem("LightningUI-Theme");
if (preferedTheme === null || preferedTheme === "Light") {
  return;
} else if (preferedTheme === "Dark") {
  button.click();
  body.classList.add("dark");
}
}
autoDarkTheme()
