!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=null;t.addEventListener("click",(function(){t.setAttribute("disabled",!0),n=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));document.body.style.backgroundColor=t}),1e3)})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),null!==n&&clearInterval(n);console.log("stop")}))}();
//# sourceMappingURL=01-color-switcher.30fcd580.js.map
