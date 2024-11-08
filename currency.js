const API_KEY = "4dca43b534526c4829f6f318";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;


async function populateCurrencyOptions() {
    try {
        
        const response = await fetch(`${API_URL}INR`);
        const data = await response.json();
        
        if (data.result === "error") {
            console.error("Error fetching currency list:", data["error-type"]);
            return;
        }

        const currencies = Object.keys(data.conversion_rates);
        const fromSelect = document.getElementById("fromCurrency");
        const toSelect = document.getElementById("toCurrency");

        
        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            fromSelect.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;
            toSelect.appendChild(option2);
        });

        

    } catch (error) {
        console.error("Error populating currency options:", error);
    }
}


async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    
    if (isNaN(amount) || amount <= 0) {
        document.getElementById("result").textContent = "Please enter a valid amount";
        return;
    }

    try {
        
        const response = await fetch(`${API_URL}${fromCurrency}`);
        const data = await response.json();
        
        if (data.result === "error") {
            document.getElementById("result").textContent = "Error fetching data. Please try again.";
            return;
        }

        
        const exchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = amount * exchangeRate;
        
        
        document.getElementById("result").textContent = 
            `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        document.getElementById("result").textContent = "Error fetching data. Please try again.";
        console.error("Error fetching exchange rate data:", error);
    }
}


document.addEventListener("DOMContentLoaded", populateCurrencyOptions);
