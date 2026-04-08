let expenses = JSON.parse(localStorage.getItem("Expenses")) || [];
let totalAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

function renderExpenses() {
    expensesTableBody.innerHTML = "";
    totalAmount = 0;

    expenses.forEach((expense, index) => {
        totalAmount += expense.amount;

        const newRow = expensesTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this expense?")) {
                expenses.splice(index, 1);
                localStorage.setItem("Expenses", JSON.stringify(expenses));
                renderExpenses();
            }
        });

        deleteCell.appendChild(deleteBtn);
    });

    totalAmountCell.textContent = totalAmount;
}

addBtn.addEventListener("click", function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') 
        return alert("Please select a category");
    if (isNaN(amount) || amount <= 0) 
        return alert("Please enter a valid amount");
    if (date === '') 
        return alert("Please select a date");

    const expense = { category, amount, date };

    expenses.push(expense);
    localStorage.setItem("Expenses", JSON.stringify(expenses));

    renderExpenses();

    categorySelect.value = "";
    amountInput.value = "";
    dateInput.value = "";
});

renderExpenses();