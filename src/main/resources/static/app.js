document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const resultSpan = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const a = parseFloat(document.getElementById('numberA').value);
        const b = parseFloat(document.getElementById('numberB').value);
        const operation = document.getElementById('operation').value;

        let endpoint = '';
        switch (operation) {
            case 'add':
                endpoint = '/api/add';
                break;
            case 'subtract':
                endpoint = '/api/subtract';
                break;
            case 'multiply':
                endpoint = '/api/multiply';
                break;
            case 'divide':
                endpoint = '/api/divide';
                break;
            default:
                alert('Geçersiz işlem seçildi.');
                return;
        }

        try {
            const response = await fetch(`${endpoint}?a=${a}&b=${b}`);
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            const result = await response.text();
            resultSpan.textContent = result;
        } catch (error) {
            alert(`Hata: ${error.message}`);
            resultSpan.textContent = '-';
        }
    });
});
