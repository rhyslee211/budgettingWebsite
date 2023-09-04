function addDebt(){

    const  debtElem = document.createElement('li')
    debtElem.className = 'debtInputRow'
    debtElem.innerHTML = "<button onclick = 'deleteRow(this)'>-</button> \
        <select class = 'debtSelectorInput'>\
            <option value = 'default'>-----Type of Debt-----</option>\
            <option value = 'Home'>Home</option>\
            <option value = 'Auto'>Auto</option>\
            <option value = 'Student Loans'>Student Loans</option>\
            <option value = 'Credit Card'>Credit Card</option>\
            <option value = 'Other (Debts)'>Other</option>\
        </select> <input class='debtNameInput' placeholder='Type of Debt'> \
        <input class = 'debtAmtInput' placeholder='Debt Amount'>";

    document.getElementById('debtInputList').appendChild(debtElem);

}

function addExpense(){

    const  expenseElem = document.createElement('li')
    expenseElem.className = 'expenseInputRow'
    expenseElem.innerHTML = "<button onclick = 'deleteRow(this)'>-</button> \
            <select class = 'expenseSelectorInput'>\
                <option value = 'default'>--Type of Expense--</option>\
                <option value = 'Utilities'>Utilities</option>\
                <option value = 'Groceries'>Groceries</option>\
                <option value = 'Clothing'>Clothing</option>\
                <option value = 'Transportation'>Transportation</option>\
                <option value = 'Insurance'>Insurance</option>\
                <option value = 'Savings'>Savings</option>\
                <option value = 'Other (Expenses)'>Other</option>\
            </select> \
            <input class='expenseNameInput' placeholder='Type of Expense'> \
            <input class = 'expenseAmtInput' placeholder='Expense Amount'>";

    document.getElementById('expenseInputList').appendChild(expenseElem);

}

function deleteRow(elem){
    elem.parentElement.remove()
}

function calcBudget(){

    var expenseAmtDict = {
        'Home': 0,
        'Auto': 0,
        'Student Loans': 0,
        'Credit Cards': 0,
        'Other (Debts)': 0,
        'Utilities': 0,
        'Groceries': 0,
        'Clothing': 0,
        'Transportation': 0,
        'Insurance': 0,
        'Savings': 0,
        'Other (Expenses)': 0
    };

    

    const debtCollection = document.getElementsByClassName('debtInputRow');

    const expenseCollection = document.getElementsByClassName('expenseInputRow');

    var incomeNum = parseFloat(document.getElementById('monthlyPay').value);

    var budgetNum = incomeNum;

    if(isNaN(parseFloat(document.getElementById('monthlyPay').value))){
        alert("Please enter your monthly pay");
        return;
    }

    for (let i = 0; i < debtCollection.length; i++){
        const debtInput = debtCollection[i].querySelector('.debtAmtInput');
        var debtType = debtCollection[i].querySelector('.debtSelectorInput').value;


        if(debtType == 'default'){
            debtType = 'Other (Debts)';
        }

        if(!isNaN(parseFloat(debtInput.value))){

            expenseAmtDict[debtType] += parseFloat(debtInput.value);
            budgetNum -= parseFloat(debtInput.value);
        }
    } 

    for (let i = 0; i < expenseCollection.length; i++){
        const expenseInput = expenseCollection[i].querySelector('.expenseAmtInput');
        var expenseType = expenseCollection[i].querySelector('.expenseSelectorInput').value;

        if(expenseType == 'default'){
            expenseType = 'Other (Expenses)';
        }

        if(!isNaN(parseFloat(expenseInput.value))){

            expenseAmtDict[expenseType] += parseFloat(expenseInput.value);
            budgetNum -= parseFloat(expenseInput.value);
        }
    } 

    //console.log(budgetNum)

    var budgetString = ''

    for(var item in expenseAmtDict){
        if(expenseAmtDict[item] > 0){
        const expensePercent = (expenseAmtDict[item]/incomeNum).toFixed(3) * 100
        budgetString += item + ': ' + expensePercent + '%<br>'
        }
    }

    document.getElementById('displayBudget').innerHTML = budgetString
}