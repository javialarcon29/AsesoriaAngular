document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const income = parseFloat(document.getElementById('income').value);
    const period = document.getElementById('period').value;
    let annualIncome;

    if (period === 'monthly') {
        annualIncome = income * 12;
    } else {
        annualIncome = income;
    }

    const taxRate = getTaxRate(annualIncome);
    const taxAmount = annualIncome * taxRate;
    const netIncome = annualIncome - taxAmount;

    document.getElementById('grossIncome').textContent = `€${annualIncome.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `€${taxAmount.toFixed(2)}`;
    document.getElementById('netIncome').textContent = `€${netIncome.toFixed(2)}`;

    document.getElementById('results').style.display = 'block';
});

function getTaxRate(income) {
    if (income <= 12450) {
        return 0.19;
    } else if (income <= 20200) {
        return 0.24;
    } else if (income <= 35200) {
        return 0.30;
    } else if (income <= 60000) {
        return 0.37;
    } else {
        return 0.45;
    }
}
