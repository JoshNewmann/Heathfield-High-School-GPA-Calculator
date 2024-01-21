// script.js
document.addEventListener("DOMContentLoaded", function () {
    var nojsElement = document.getElementById("nojs");
    if (nojsElement) {
        nojsElement.style.display = "none";
    }
});

var scores = {
    "A+": 14,
    "A": 13,
    "A-": 12,
    "B+": 11,
    "B": 10,
    "B-": 9,
    "C+": 8,
    "C": 7,
    "C-": 6,
    "D+": 5,
    "D": 4,
    "D-": 3,
    "E+": 2,
    "E": 1,
    "E-": 0,
};

// Actually put the GPA table in
window.addEventListener("load", () => {
    let wrapper = document.getElementById("gpa-wrap"),
        table = document.createElement("table");

    // Make the HTML GPA table
    let row = null,
        cell = null,
        input = null;
    let grades = Object.keys(scores);
    for (let i = 0; i < grades.length; i += 3) {
        row = table.insertRow();
        for (let j = 0; j < 3; j++) {
            if (grades[i + j]) {
                cell = row.insertCell();
                cell.innerHTML = grades[i + j];

                // Create input with aria-label
                cell = row.insertCell();
                input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.value = "0";
                input.setAttribute("aria-label", `Enter the amount ${grades[i + j]} grades recieved`);
                cell.appendChild(input);
                input.onchange = gpacalc;
            }
        }
    }

    if (row) {
        row.classList.add("last-row");
    }

    wrapper.appendChild(table);
    gpacalc();
});

function gpacalc() {
    let inputs = document.querySelectorAll("#gpa-wrap input");

    // Calculations
    let total = 0,
        count = 0,
        average = 0;

    for (let i of inputs) {
        total += parseInt(i.value) * scores[i.parentNode.previousSibling.innerHTML];
        count += parseInt(i.value);
    }

    if (count > 0) {
        average = total / count;
    } else {
        average = 0;
    }

    document.getElementById("grade-count").innerHTML = count;

    // Display NA if no grades have been entered
    if (average > 0) {
        document.getElementById("gpa-average").innerHTML = average.toFixed(2);

        let gradeKeys = Object.keys(scores);
        let gradeValues = Object.values(scores);
        let closestGradeIndex = gradeValues.reduce((prev, curr, i) => (Math.abs(curr - average) < Math.abs(gradeValues[prev] - average) ? i : prev), 0);
        document.getElementById("average-grade").innerHTML = gradeKeys[closestGradeIndex];
    } else {
        document.getElementById("gpa-average").innerHTML = "NA";
        document.getElementById("average-grade").innerHTML = "NA";
    }
}

function resetInputs() {
    let inputs = document.querySelectorAll("#gpa-wrap input");
    for (let i of inputs) {
        i.value = "0";
    }
    gpacalc();
}