document.getElementById('goButton').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.number-input');
    const values = Array.from(inputs).map(input => input.value);
    console.log(values);
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

