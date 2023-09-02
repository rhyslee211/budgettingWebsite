function addDebt(){

    const  debtElem = document.createElement('li')
    debtElem.innerHTML = "<select>\
            <option value = ''>-----Type of Debt-----</option>\
            <option value = 'Home'>Home</option>\
            <option value = 'Auto'>Auto</option>\
            <option value = 'Student Loans'>Student Loans</option>\
            <option value = 'Credit Card'>Credit Card</option>\
            <option value = 'Other'>Other</option>\
        </select> <input class='debtNameInput' placeholder='Type of Expense'> \
        <input class = 'debtAmtInput' placeholder='Expense Amount'>"

    document.getElementById('debtInputList').appendChild(debtElem)

}

function addExpense(){

    const  expenseElem = document.createElement('li')
    expenseElem.innerHTML = "<select>\
                <option value = ''>--Type of Expense--</option>\
                <option value = 'Bills'>Bills</option>\
                <option value = 'Groceries'>Groceries</option>\
                <option value = 'Clothing'>Clothing</option>\
                <option value = 'Transportation'>Transportation</option>\
                <option value = 'Insurance'>Insurance</option>\
                <option value = 'Savings'>Savings</option>\
            </select> \
            <input class='expenseNameInput' placeholder='Type of Expense'> \
            <input class = 'expenseAmtInput' placeholder='Expense Amount'>"

    document.getElementById('expenseInputList').appendChild(expenseElem)

}

function calcBudget(){

    const debtCollection = document.getElementsByClassName('debtAmtInput');

    const expenseCollection = document.getElementsByClassName('expenseAmtInput')

    var incomeNum = parseFloat(document.getElementById('monthlyPay').value)

    var budgetNum = incomeNum

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
        document.getElementById('displayBudget').innerHTML = '<div>Your leftover money is: ' + budgetNum + '</div>'
    }
    else if(budgetNum == 0){
        document.getElementById('displayBudget').innerHTML = '<div>Your budget is perfectly balanced.' + '</div>'
    }
    else{
        document.getElementById('displayBudget').innerHTML = '<div>Your over your budget by ' + Math.abs(budgetNum) + '</div>'
    }

    

}