import { Fraction } from "./Fraction.js";

document.getElementById('goButton').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.number-input');
    const values = Array.from(inputs).map(input => parseInt(input.value));
    setAnsBox(values);
});

const inputTableBody = document.getElementById('inputTableBody');

inputTableBody.addEventListener('input', function(event) {
    if (event.target.classList.contains('number-input')) {
        const value = event.target.value;
		//Allow negatives and decimals lol
        if (!/^\d*$/.test(value)) {
            event.target.value = value.replace(/[^\d]/g, '');
        }
        if (event.target.value.length !== 0 && !event.target.parentElement.parentElement.nextElementSibling) {
            addRow();
        }
    }
});

document.getElementById('clsButton').addEventListener('click', function() {
    inputTableBody.innerHTML = "";
	const answerBox = document.getElementById("answerBox");

	answerBox.innerHTML = "";

	addRow();
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
	const fractionedArray = filteredArray.map(num => new Fraction(num, 1));
	let futureXList = Array.from({length: filteredArray.length}, (_, i) => new Fraction(i + 1, 1));
	let result = lagrangeInterpolation(futureXList, fractionedArray);

	if (result.length === 0) {
		answerBox.innerHTML = "Add some data!"
		return;
	}

	//Make the visuals better
	let finalHtml = "\\( f(x) = ";
	let count = filteredArray.length - 1;
	let firstTermHasBeenAdded = false;
	for (let coeff of result) {
		//console.log(count, coeff);
		if (filteredArray.length === 1) {
			finalHtml += formatFraction(coeff.num, coeff.denom, true);
			continue;
		}

		if (coeff.isZero()) {
			
			count--;
			continue;
		}

		let tempCoeff = formatFraction(coeff.num, coeff.denom, !firstTermHasBeenAdded);

		if (count === 0) {
			//We would normally invert first term here but we're done soo
			finalHtml += tempCoeff;
		}
		else {
			if (tempCoeff === "-1" || tempCoeff === "1" || tempCoeff === "+1") {
				tempCoeff = tempCoeff.slice(0, -1);
			}
	
			if (count === 1) {
				finalHtml += tempCoeff + "x";
			}
	
			else {
				finalHtml += tempCoeff + "x^" + count.toString();
			}
			firstTermHasBeenAdded = true;
		}

		count--;
	}
	finalHtml += "\\)";
	answerBox.innerHTML = finalHtml;
	MathJax.typeset();
}

function formatFraction(num, denom, isFirst) {
    //non fracs
	if (denom === 1) {
		if (num <= 0 || isFirst) {
			return num.toString();
		}
		return "+" + num.toString();
	}
	//fracs
	if (num < 0) {
		return "- \\frac{" + num * -1 + "}{" + denom + "}";
	}
	if (isFirst) {
		return "\\frac{" + num + "}{" + denom + "}";
	}
	else {
		return "+ \\frac{" + num + "}{" + denom + "}";
	}
}

//If u provide same point twice this breaks, but i think we cant ever do that
//First step: get f and f(x) and target
function lagrangeInterpolation(xList, yList) {
	const totalNodes = xList.length;
	//Second step: get the list of barycentric weights
	
	let bWeights = new Array(totalNodes);
	for (let c = 0; c < totalNodes; c++) {
		bWeights[c] = new Fraction(1, 1);
	}

	for (let i = 0; i < totalNodes; i++) {
		//Fix current element
		for (let j = 0; j < totalNodes; j++) {
		
			if (i === j) {
				continue;
			}
			//j must not be i, for every combination multiply
			bWeights[i] = bWeights[i].times((xList[i].minus(xList[j])).reciprocal());
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
		basisPolyWithoutWeight = polynomialFromFactors(strictList);
		basisPolyWeighted = basisPolyWithoutWeight.map(num => num.times(bWeights[i]).times(yList[i]));
		basisPolynomials.push(basisPolyWeighted);
	}
	
	let sol = sum2DArray(basisPolynomials);
	return sol;
}

function excludeIndex(arr, n) {
    return arr.filter((_, index) => index !== n);
}

//I hope this works lol
//Potential to save time here if we know it is a fraction etc haha u idiot
function polynomialFromFactors(factors) {
    let coefficients = [new Fraction(1, 1)];

    for (const root of factors) {
		const newCoefficients = new Array(coefficients.length + 1).fill(new Fraction(0, 1));
        
        for (let i = 0; i < coefficients.length; i++) {
            newCoefficients[i] = newCoefficients[i].plus(coefficients[i]); // x^i term
            newCoefficients[i + 1] = newCoefficients[i+1].plus(coefficients[i].times(root.times(new Fraction(-1, 1)))); // x^(i+1) term
        }

        coefficients = newCoefficients;
    }

    return coefficients;
}

function sum2DArray(arr) {
    if (arr.length === 0) return [];
    const result = new Array(arr[0].length).fill(new Fraction(0, 1)); // Initialize result array with zeros

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            result[j] = result[j].plus(arr[i][j]); // Use add to accumulate sums
        }
    }

    return result;
}



