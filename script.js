document.getElementById('goButton').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.number-input');
    const values = Array.from(inputs).map(input => input.value);
    console.log(values);
    setAnsBox();
});

const inputTableBody = document.getElementById('inputTableBody');

inputTableBody.addEventListener('input', function(event) {
    if (event.target.classList.contains('number-input')) {
        const value = event.target.value;
        if (!/^\d*$/.test(value)) {
            event.target.value = value.replace(/[^\d]/g, '');
        }
	console.log(value);
        if (event.target.value.length !== 0 && !event.target.parentElement.parentElement.nextElementSibling) {
            addRow();
        }
    }
});

function addRow() {
    const newRow = document.createElement('tr');
    const newNumberCell = document.createElement('td');
    const newInputCell = document.createElement('td');
    const newInput = document.createElement('input');

    newNumberCell.textContent = inputTableBody.rows.length + 1;
    newInput.type = 'text';
    newInput.className = 'number-input';

    newInputCell.appendChild(newInput);
    newRow.appendChild(newNumberCell);
    newRow.appendChild(newInputCell);
    inputTableBody.appendChild(newRow);
}

function setAnsBox() {
console.log("hah");
	const answerBox = document.getElementById("answerBox");
	answerBox.innerHTML = "Inline: \\( E = mc^3 \\)";
	MathJax.typeset();
	
	
	
}

function lagrangeInterpolation(xValues, yValues) {
    const n = xValues.length;
    const coefficients = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        // Calculate the Lagrange basis polynomial coefficients
        const L = new Array(n).fill(0);
        L[0] = 1; // Start with the constant term
        
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                const temp = new Array(n).fill(0);
                // Build the polynomial term for L_i(x)
                for (let k = 0; k <= j; k++) {
                    if (k === 0) {
                        temp[k] = -xValues[j];
                    } else {
                        temp[k] = L[k - 1] - xValues[j] * L[k];
                    }
                }
                for (let k = 0; k <= j; k++) {
                    L[k] += temp[k] / (xValues[i] - xValues[j]);
                }
            }
        }

        // Now scale L by the corresponding y-value
        for (let k = 0; k < n; k++) {
            coefficients[k] += yValues[i] * L[k];
        }
    }

    return coefficients;
}

// Example usage:
const xValues = [1, 2, 3]; // Corresponding x values
const yValues = [1, 2, 10]; // f(1) = 1, f(2) = 2, f(3) = 10
const coefficients = lagrangeInterpolation(xValues, yValues);
console.log(coefficients); // Coefficients of the polynomial


