
     
    document.getElementById('plate-search').addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        const resultsContainer = document.querySelector('.search-results');
        if (query === '') {
            resultsContainer.innerHTML = 'No results found.';
            return;
        }
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';
                const filtered = data.filter(item =>
                    item.plateNumber.toLowerCase().includes(query)
                );
                filtered.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'result-card';
                    card.innerHTML = `
                        <h2>Plate Number: ${item.plateNumber}</h2>
                        <p>Owner: ${item.ownerName}</p>
                        <p>Contact Number: ${item.contactNumber}</p>
                        <p>Registration Date: ${item.registrationDate}</p>
                        <p>Car Model: ${item.carModel}</p>
                    `;
                    resultsContainer.appendChild(card);
                });
                if (filtered.length === 0 && query !== '') {
                    resultsContainer.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
    
// Pagination for result cards
        const cards = Array.from(document.querySelectorAll('.result-card'));
        const cardsPerPage = 1;
        let currentPage = 1;
        const totalPages = Math.ceil(cards.length / cardsPerPage);

        function showPage(page) {
            cards.forEach((card, idx) => {
                card.style.display = (idx >= (page-1)*cardsPerPage && idx < page*cardsPerPage) ? '' : 'none';
            });
            document.getElementById('pageInfo').textContent = `Page ${page} of ${totalPages}`;
            document.getElementById('prevPage').disabled = page === 1;
            document.getElementById('nextPage').disabled = page === totalPages;
        }

        document.getElementById('prevPage').onclick = function() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        };
        document.getElementById('nextPage').onclick = function() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        };

        showPage(currentPage);
       