document.addEventListener("DOMContentLoaded", function () {
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
 364;

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
     document.querySelector(".heroContent") == null
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
     document.querySelector(".heroContent") == null
   ) {
     document.querySelector(".overflay svg").style.transform =
       "translateX(-48vw) scale(0.5)";
   }
 };

 window.onload = function (ev) {
   if (
     window.innerHeight + Math.round(window.scrollY) >= window.innerHeight &&
     document.querySelector(".carousel") == null &&
     document.querySelector(".heroContent") == null
   ) {
     document.querySelector(".overflay svg").style.transform =
       "translateX(-48vw) scale(0.5)";
   }
 };

 //! ---------- RESPONSIVE MENU TOGGLE ---------- !//

 //* Set needed variables
 const menuToggle = document.querySelector(".navbarToggle");
 const toggleSvgs = document.querySelectorAll(".navbarToggleSVG");
 const navbar = document.querySelectorAll(".navbar")[0];

 //* Detects click on menuToggle and changes the displayed SVG and saves in local storage the theme preference
 menuToggle.addEventListener("click", () => {
   toggleSvgs.forEach((e) => {
     console.log(e);
     e.classList.toggle("toggle");
   });
   if (toggleSvgs[0].classList.contains("toggle")) {
     navbar.classList.remove("active");
   } else {
     navbar.classList.add("active");
   }
 });

 //* Prevents the keyframe on page load
 setTimeout(function () {
   document.body.classList.remove("preload");
 }, 500);
})

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
document.addEventListener(
 "DOMContentLoaded",
 function () {
   const preferedTheme = localStorage.getItem("LightningUI-Theme");
   if (preferedTheme == null || preferedTheme == "Light") {
     return;
   } else if (preferedTheme == "Dark") {
     button.click();
     body.classList.add("dark");
   }
 },
 false
);
