// All DOM Elements

let balanceAmount = document.querySelector('#balanceAmount');
let incomeAmount = document.querySelector('#incomeAmount');
let expenssAmount = document.querySelector('#expenssAmount');
let transactionsList = document.querySelector('#transactionList');
let transactionForm = document.querySelector('#transactionForm');
let description = document.querySelector('#descriptionTxt');
let amount = document.querySelector('#amountTxt');
let addBtn = document.querySelector('#addBtn');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTransactions()
})

amount.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTransactions()
    }
})

description.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        amount.focus()
    }
})


function addTransactions(e) {

    let itemDesc = description.value.trim();
    let amountValue = parseFloat(amount.value);

    if (isNaN(amountValue) || itemDesc === '') {
        return
    }

    transactions.push({
        id: Date.now(),
        itemDesc,
        amountValue,
        date: new Date().toLocaleDateString()
    })

    updateTransactionList();
    updateSummary();

    transactionForm.reset()

    localStorage.setItem('transactions', JSON.stringify(transactions));

}

function updateTransactionList() {
    transactionsList.innerHTML = '';

    transactions.forEach(transaction => {
        let itemDiv = document.createElement('div');
        let itemName = document.createElement('p');
        let amountCost = document.createElement('p');
        let list = document.createElement('li');
        let dateDiv = document.createElement('p');
        let deleteBtn = document.createElement('button');

        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'Delete'
        itemName.textContent = transaction.itemDesc;
        amountCost.textContent = transaction.amountValue + 'EGP';
        dateDiv.textContent = transaction.date;

        deleteBtn.addEventListener('click', () => {
            transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            transactions = transactions.filter(t => t.id !== transaction.id);
            localStorage.setItem('transactions', JSON.stringify(transactions))

            updateTransactionList();
            updateSummary();
        })


        itemDiv.appendChild(itemName);
        list.appendChild(deleteBtn)
        itemDiv.appendChild(amountCost);
        itemDiv.appendChild(dateDiv)
        list.appendChild(itemDiv);
        transactionsList.appendChild(list);
    });
}

function updateSummary() {
    let total = 0;
    let income = 0;
    let expenss = 0;
    transactions.forEach(transaction => {
        if (transaction.amountValue >= 0) {
            income += transaction.amountValue;
        } else {
            expenss += transaction.amountValue;
        }
        total += transaction.amountValue;
    })
    incomeAmount.textContent = income;
    expenssAmount.textContent = Math.abs(expenss);
    balanceAmount.textContent = total;
}

updateTransactionList();
updateSummary();