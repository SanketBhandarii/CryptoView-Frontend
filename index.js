document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'http://localhost:8080/api/cryptos';
    const loader = document.getElementById('loader');
    const container = document.getElementById('crypto-data');
    loader.style.display = 'block';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        let htmlContent = '<h1>Select Row To See Detail ➡️</h1>';
        htmlContent += `
            <table id="crypto-table">
                <caption>Cryptocurrency Data</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Price</th>
                        <th>Buy/Sell Price</th>
                        <th>Volume</th>
                        <th>Base Unit</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(crypto => {
            htmlContent += `
                <tr class="crypto-row" data-name="${crypto.name}">
                    <td>${crypto.name}</td>
                    <td>${crypto.last}</td>
                    <td>${crypto.buy} / ${crypto.sell}</td>
                    <td>${crypto.volume}</td>
                    <td>${crypto.base_unit}</td>
                </tr>
            `;
        });

        htmlContent += `
                </tbody>
            </table>
        `;

        container.innerHTML = htmlContent;
        document.querySelectorAll('.crypto-row').forEach(row => {
            row.addEventListener('click', (event) => {
                const selectedCryptoName = event.currentTarget.getAttribute('data-name');
                const selectedCrypto = data.find(crypto => crypto.name === selectedCryptoName);
                displayCryptoDetails(selectedCrypto);
            });
        });
        if (data.length > 0) {
            displayCryptoDetails(data[0]);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById("msg").innerHTML = "OOPs! Something went wrong 🐶"
    } finally {
        loader.style.display = 'none';
    }
});

function displayCryptoDetails(crypto) {
    const detailsSection = document.getElementById('crypto-details');
    if (crypto) {
        detailsSection.innerHTML = `
            <h2>${crypto.name}</h2>
            <p><strong>Last Price:</strong> ${crypto.last}</p>
            <p><strong>Buy Price:</strong> ${crypto.buy}</p>
            <p><strong>Sell Price:</strong> ${crypto.sell}</p>
            <p><strong>Volume:</strong> ${crypto.volume}</p>
            <p><strong>Base Unit:</strong> ${crypto.base_unit}</p>
        `;
    } else {
        detailsSection.innerHTML = '<p>No details available.</p>';
    }
}
