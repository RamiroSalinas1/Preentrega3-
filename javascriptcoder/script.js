document.addEventListener("DOMContentLoaded", function () {
    const expenseInput = document.getElementById("expense");
    const addExpenseButton = document.getElementById("addExpense");
    const expenseList = document.getElementById("expenseList");
    const totalExpense = document.getElementById("totalExpense");
    const clearExpenseButton = document.getElementById("clearExpense");

    // Obtener gastos del almacenamiento local o inicializar si es la primera vez
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Función para mostrar los gastos en la lista
    function displayExpenses() {
        expenseList.innerHTML = "";
        let total = 0;

        expenses.forEach((expense, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${expense.description} - $${expense.amount.toFixed(2)}`;
            expenseList.appendChild(listItem);
            total += expense.amount;

            // Agregar un botón para eliminar el gasto individualmente
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", function () {
                expenses.splice(index, 1); // Eliminar el gasto del arreglo
                localStorage.setItem("expenses", JSON.stringify(expenses)); // Actualizar el almacenamiento local
                displayExpenses(); // Actualizar la lista de gastos
            });
            listItem.appendChild(deleteButton);
        });

        totalExpense.textContent = `Total de Gastos: $${total.toFixed(2)}`;
    }

    // Mostrar los gastos almacenados al cargar la página
    displayExpenses();

    // Evento para agregar un gasto
    addExpenseButton.addEventListener("click", function () {
        const description = expenseInput.value;
        const amount = parseFloat(prompt("Ingrese el monto del gasto:"));

        if (!isNaN(amount) && amount > 0) {
            expenses.push({ description, amount });
            localStorage.setItem("expenses", JSON.stringify(expenses));
            expenseInput.value = "";
            displayExpenses();
        } else {
            alert("Ingrese un monto de gasto válido.");
        }
    });

    // Evento para borrar todos los gastos
    clearExpenseButton.addEventListener("click", function () {
        localStorage.removeItem("expenses");
        expenses.length = 0;
        displayExpenses();
    });
});
