document.getElementById('goButton').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.number-input');
    const values = Array.from(inputs).map(input => parseInt(input.value));
    console.log(values);
    setAnsBox(values);
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

function setAnsBox(arrayWithNaN) {
	const answerBox = document.getElementById("answerBox");
	answerBox.style.display = "block";
	const filteredArray = arrayWithNaN.filter(value => !isNaN(value));
	
	let result = lagrangeInterpolation(Array.from({length: filteredArray.length}, (_, i) => i + 1), filteredArray);
	let finalHtml = "\\( ";
	let count = filteredArray.length - 1;
	for (let coeff of result) {
		finalHtml += "+ " + coeff + "*x^" + count.toString();
		count--;
	}
	finalHtml += "\\)";
	answerBox.innerHTML = finalHtml;
	MathJax.typeset();
}

//If u provide same point twice this breaks, but i think we cant ever do that
//First step: get f and f(x) and target
function lagrangeInterpolation(xList, yList) {
	const totalNodes = xList.length;
	//Second step: get the list of barycentric weights
	
	let bWeights = new Array(totalNodes).fill(1);
	for (let i = 0; i < totalNodes; i++) {
		//Fix current element
		let currentCoeff = xList[i];
		for (let j = 0; j < totalNodes; j++) {
		
			if (i === j) {
				continue;
			}
			//console.log(i, xList[i], j);
			//j must not be i, for every combination multiply
			bWeights[i] *= (1/(xList[i] - xList[j]))
			//console.log(bWeights);
		}
	}
	
	//Now we have the weights w0, w1, w2 = [0.5, -1, 0.5]
	//Now we want to get each linear factor except 1, for all combinations, multiply them
	//and multiply by weight
	//Once we have multiplied by weight to get each basis (and multplied by the y value)
	let basisPolyWithoutWeight;
	let basisPolyWeighted;
	let strictList;
	let basisPolynomials = [];
	for (let i = 0; i < totalNodes; i++) {
		strictList = excludeIndex(xList, i);
		//console.log(strictList);
		basisPolyWithoutWeight = polynomialFromFactors(strictList);
		basisPolyWeighted = basisPolyWithoutWeight.map(num => num * bWeights[i] * yList[i]);
		basisPolynomials.push(basisPolyWeighted);
	}
	
	console.log("-----------");
	console.log(basisPolynomials);
	
	let sol = sum2DArray(basisPolynomials);
	return sol;
	
	
	/*
	let completeL = new Array(totalNodes).fill(0);
	let basisPolynomials = [];
	for (let basisPolynomialIndex = 0; basisPolynomialIndex < totalNodes; basisPolynomialIndex++) {
		for (let coeffIndex = 0; coeffIndex < totalNodes; coeffIndex++) {
			completeL[coeffIndex] += basisPolynomials[basisPolynomialIndex][coeffIndex];
		}
	}
	
	console.log(bWeights);*/
	
}

function multiplyLinearsGetCoeffs(zeroesList) {
	//Takes [1, 2, -3] representing (x-1)(x-2)(x-3) and returns 1, -6, 11, -6 or whatever
	//Account for potential sign mismatch
}

function excludeIndex(arr, n) {
    return arr.filter((_, index) => index !== n);
}

//I hope this works lol
function polynomialFromFactors(factors) {
    // Start with the constant polynomial [1] (which is 1)
    let coefficients = [1];

    // Multiply each factor (x - root) into the polynomial
    for (const root of factors) {
        // Create a new array to hold the new coefficients
        const newCoefficients = new Array(coefficients.length + 1).fill(0);
        
        // Multiply the current polynomial by (x - root)
        for (let i = 0; i < coefficients.length; i++) {
            newCoefficients[i] += coefficients[i]; // x^i term
            newCoefficients[i + 1] += coefficients[i] * -root; // x^(i+1) term
        }

        // Update the coefficients to the new polynomial
        coefficients = newCoefficients;
    }

    return coefficients;
}

function sum2DArray(arr) {
    if (arr.length === 0) return [];

    return arr[0].map((_, index) => {
        return arr.reduce((sum, innerArray) => sum + innerArray[index], 0);
    });
}



/*
const array2D = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [0, 0, 0, 0, 1, 1, 1, 1, 10, 10]
];

const summedArray = sum2DArray(array2D);
console.log(summedArray); // Output: [12, 15, 18]
*/




