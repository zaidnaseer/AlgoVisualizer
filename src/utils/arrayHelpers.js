// src/utils/arrayHelpers.js

export const generateRandomArray = (length, min, max) => {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const createBars = (array) => {
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = '';
    array.forEach(num => {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${num * 5}px`; // Adjust bar height
        arrayContainer.appendChild(bar);
    });
};
