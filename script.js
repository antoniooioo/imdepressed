
// JavaScript in your web app (script.js)
const quoteContainer = document.getElementById('quoteContainer');
const generateButton = document.getElementById('generateQuote');
const addQuoteButton = document.getElementById('addQuote');

generateButton.addEventListener('click', () => {
    fetch('/getRandomQuote')
        .then(response => response.json())
        .then(data => {
            if (data && data.quote) {
                quoteContainer.textContent = data.quote;
            } else {
                quoteContainer.textContent = 'Error fetching quote.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            quoteContainer.textContent = 'Error fetching quote.';
        });
});

addQuoteButton.addEventListener('click', () => {
    const newQuote = prompt('new quote from dj khaled:');
    if (newQuote) {
        fetch(`/addQuote?quote=${newQuote}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data && data.success) {
                    alert('Quote added successfully!');
                } else {
                    alert('Error adding quote.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding quote.');
            });
    }
});