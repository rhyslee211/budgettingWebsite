//import {Chart} from './node_modules/chart.js/auto/auto.cjs'

document.addEventListener('DOMContentLoaded', () => {
    // Add Monthly Debts

    // Add Monthly Expenses
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    addExpenseBtn.addEventListener('click', addExpense);

    // Calculate Budget
    const calculateBudgetBtn = document.getElementById('calculateBudget');
    calculateBudgetBtn.addEventListener('click', calcBudget);


    const initialDeleteBtn = document.getElementById('initialDeleteButton')
    initialDeleteBtn.addEventListener('click',()=> deleteRow(initialDeleteBtn.parentElement))
    // Add event listeners for delete buttons (if needed)
    // ...

    // Other code
});

let myChart = null

export function addExpense(){

    const expenseElem = document.createElement('li')
    const deleteElemBtn = document.createElement('button')
    expenseElem.className = 'expenseInputRow'
    deleteElemBtn.addEventListener('click', ()=> deleteRow(expenseElem))
    deleteElemBtn.innerText = '-'

    expenseElem.appendChild(deleteElemBtn)
    expenseElem.append(' ')

    const selectElemBtn = document.createElement('select')
    selectElemBtn.className = 'expenseSelectorInput'

    selectElemBtn.innerHTML = "<option value = 'default'>--Type of Expense--</option>\
<option value = 'Home'>Home</option>\
<option value = 'Auto'>Auto</option>\
<option value = 'Loans'>Loans</option>\
<option value = 'Credit Cards'>Credit Cards</option>\
<option value = 'Utilities'>Utilities</option>\
<option value = 'Groceries'>Groceries</option>\
<option value = 'Clothing'>Clothing</option>\
<option value = 'Transportation'>Transportation</option>\
<option value = 'Insurance'>Insurance</option>\
<option value = 'Savings'>Savings</option>\
<option value = 'Other'>Other</option>"

    expenseElem.appendChild(selectElemBtn)
    expenseElem.append(' ')

    const inputElemBtn = document.createElement('input')
    inputElemBtn.className = 'expenseNameInput'
    inputElemBtn.placeholder = 'Type of Expense'

    const inputAmtElemBtn = document.createElement('input')
    inputAmtElemBtn.className = 'expenseAmtInput'
    inputAmtElemBtn.placeholder = 'Expense Amount'

    expenseElem.appendChild(inputElemBtn)
    expenseElem.append(' ')
    expenseElem.appendChild(inputAmtElemBtn)
    expenseElem.append(' ')

    document.getElementById('expenseInputList').appendChild(expenseElem);

}

export function deleteRow(elem){
    elem.remove()
}

export function calcBudget(){

    var expenseAmtDict = {
        'Home': 0,
        'Auto': 0,
        'Loans': 0,
        'Credit Cards': 0,
        'Utilities': 0,
        'Groceries': 0,
        'Clothing': 0,
        'Transportation': 0,
        'Insurance': 0,
        'Savings': 0,
        'Other': 0,
        'Surplus': 0
    };


    const expenseCollection = document.getElementsByClassName('expenseInputRow');

    var incomeNum = parseFloat(document.getElementById('monthlyPay').value);

    var budgetNum = incomeNum;

    if(isNaN(parseFloat(document.getElementById('monthlyPay').value))){
        alert("Please enter your monthly pay");
        return;
    }

    for (let i = 0; i < expenseCollection.length; i++){
        const expenseInput = expenseCollection[i].querySelector('.expenseAmtInput');
        var expenseType = expenseCollection[i].querySelector('.expenseSelectorInput').value;

        if(expenseType == 'default'){
            expenseType = 'Other';
        }

        if(!isNaN(parseFloat(expenseInput.value))){

            expenseAmtDict[expenseType] += parseFloat(expenseInput.value);
            budgetNum -= parseFloat(expenseInput.value);
        }
    } 

    expenseAmtDict['Surplus'] = budgetNum

    //console.log(budgetNum)

    //var budgetString = '<canvas id="budgetChart">'
    var xValues = []
    var yValues = []

    for(var item in expenseAmtDict){
        if(expenseAmtDict[item] > 0){
            xValues.push(item)
            yValues.push(expenseAmtDict[item])
        }
    }

    //document.getElementById('displayBudget').innerHTML = budgetString

    const dataVals = {
        labels: xValues,
        datasets: [{
            label: 'Budget Data',
            data: yValues,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(128, 128, 0)',
            'rgb(0, 128, 128)',
            'rgb(128, 0, 128)',
            'rgb(0, 255, 255)'
            ],
        hoverOffset: 4
    }]
    }

    console.log(xValues)
    console.log(yValues)
    var chartElem = document.getElementById('budgetChartCanvas')
    const config = {
        type: 'doughnut',
        data: dataVals}

    if(myChart == null){
        myChart = new Chart(
            chartElem, config
        )
        myChart.update()
    }
    else{
        removeData(myChart)
        myChart.update()
        addData(myChart, xValues,yValues)
        myChart.update()
    }

    myChart.canvas.parentNode.style.height = '512px';
    myChart.canvas.parentNode.style.width = '512px';

}

function removeData(chart){
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
}

function addData(chart, labels, newData){
    labels.forEach((label, index) => {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(newData[index]);
        });
    });
}