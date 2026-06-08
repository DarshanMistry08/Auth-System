// const toggle = document.getElementById("themeToggle");
// const text = document.querySelector(".toggle-text");
// const circle = document.querySelector(".toggle-circle");

// // Load saved theme
// if (localStorage.getItem("theme") === "dark") {
//     document.body.classList.add("dark");
//     text.textContent = "Dark";
//     circle.textContent = "☀️";
// }

// toggle.addEventListener("click", () => {
//     document.body.classList.toggle("dark");

//     if (document.body.classList.contains("dark")) {
//         text.textContent = "Dark";
//         circle.textContent = "☀️";
//         localStorage.setItem("theme", "dark");
//     } else {
//         text.textContent = "Light";
//         circle.textContent = "🌙";
//         localStorage.setItem("theme", "light");
//     }
// });


//   const themeLink = document.getElementById("themeStylesheet");

//   // Load saved theme
//   const savedTheme = localStorage.getItem("theme");

//   if (savedTheme === "dark") {
//     themeLink.href = "/stylesheets/index2.css";
//   } else {
//     themeLink.href = "/stylesheets/index.css";
//   }

//   toggle.addEventListener("click", () => {
//     const isDark = themeLink.href.includes("index2.css");

//     if (isDark) {
//       // Switch to LIGHT
//       themeLink.href = "/stylesheets/index.css";
//       localStorage.setItem("theme", "light");
//     } else {
//       // Switch to DARK
//       themeLink.href = "/stylesheets/index2.css";
//       localStorage.setItem("theme", "dark");
//     }
//   });