function addDebt(){

    document.getElementById('debtInputDiv').innerHTML += "<li><input class='debtNameInput' placeholder='Type of Debt'> <input class = 'debtAmtInput' placeholder='Debt Amount'></li>";

}

function addExpense(){

    document.getElementById('expensesInputDiv').innerHTML += "<li><input class='expenseNameInput' placeholder='Type of Expense'> <input class = 'expenseAmtInput' placeholder='Expense Amount'></li>";

}

function calcBudget(){

    const debtCollection = document.getElementsByClassName('debtAmtInput');

    const expenseCollection = document.getElementsByClassName('expenseAmtInput')

    var budgetNum = parseFloat(document.getElementById('monthlyPay').value)

    //console.log(debtCollection)
    //console.log(expenseCollection)

    for (let i = 0; i < debtCollection.length; i++){

        if(!isNaN(debtCollection[i].value)){

            //console.log(debtCollection[i].value)
            budgetNum -= parseFloat(debtCollection[i].value)
        }
    } 

    for (let i = 0; i < expenseCollection.length; i++){

        if(!isNaN(expenseCollection[i].value)){

            //console.log(expenseCollection[i].value)
            budgetNum -= parseFloat(expenseCollection[i].value)
        }
    } 

    document.getElementById('displayBudget').innerHTML = 'Your leftover money is: ' + budgetNum

}