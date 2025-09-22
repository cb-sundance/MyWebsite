"use strict";
// Write JavaScript Comments
// This is a single-line comment
/* This is a
   multi-line comment */

// Display an Alert Dialog Box
function showAlert() {
    alert("Hello! This is an alert box.");
}

// Reference Browser & Page Objects
console.log("Current URL: " + window.location.href);

// Write HTML Code & Text Content into a Page
document.getElementById("output").innerHTML = "JavaScript is working!";

// Work with a Date Object
function showDate() {
    let currentDate = new Date();
    document.getElementById("date").innerHTML = "Today's Date: " + currentDate.toDateString();
}

// Use JavaScript Operators
let x = 10;
let y = 5;
console.log("Sum: " + (x + y));
console.log("Is x greater than y? " + (x < y));

// Create a JavaScript Function
function multiply(a, b) {
    var result = a * b;
    return result;
}
console.log("Multiplication: " + multiply(4, 3));

// Create Timed Commands
function startTimer() {
    let count = 5;
    let timer = setInterval(function () {
        document.getElementById("timer").innerHTML = "Timer: " + count;
        count--;

        if (count < 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "Time's up!";
        }
    }, 1000);
}

