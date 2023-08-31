function addDebt(){

    const  debtElem = document.createElement('li')
    debtElem.innerHTML = "<input class='debtNameInput' placeholder='Type of Expense'> <input class = 'debtAmtInput' placeholder='Expense Amount'>"

    document.getElementById('debtInputList').appendChild(debtElem)

}

function addExpense(){

    const  expenseElem = document.createElement('li')
    expenseElem.innerHTML = "<input class='expenseNameInput' placeholder='Type of Expense'> <input class = 'expenseAmtInput' placeholder='Expense Amount'>"

    document.getElementById('expenseInputList').appendChild(expenseElem)

}

function calcBudget(){

    const debtCollection = document.getElementsByClassName('debtAmtInput');

    const expenseCollection = document.getElementsByClassName('expenseAmtInput')

    var budgetNum = parseFloat(document.getElementById('monthlyPay').value)

    //console.log(debtCollection)
    //console.log(expenseCollection)

    if(isNaN(parseFloat(document.getElementById('monthlyPay').value))){
        alert("Please enter your monthly pay")
        return
    }

    for (let i = 0; i < debtCollection.length; i++){

        if(!isNaN(parseFloat(debtCollection[i].value))){

            //console.log(debtCollection[i].value)
            budgetNum -= parseFloat(debtCollection[i].value)
        }
    } 

    for (let i = 0; i < expenseCollection.length; i++){

        if(!isNaN(parseFloat(expenseCollection[i].value))){

            //console.log(expenseCollection[i].value)
            budgetNum -= parseFloat(expenseCollection[i].value)
        }
    } 

    console.log(budgetNum)

    if(budgetNum > 0){
        document.getElementById('displayBudget').innerHTML = 'Your leftover money is: ' + budgetNum
    }
    else if(budgetNum == 0){
        document.getElementById('displayBudget').innerHTML = 'Your budget is perfectly balanced.'
    }
    else{
        document.getElementById('displayBudget').innerHTML = 'Your over your budget by ' + Math.abs(budgetNum)
    }

}