// script.js

document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById('newsContainer'); // Container for news articles
    const errorMessage = document.getElementById('errorMessage'); // Error message display

    // Function to fetch and display news articles
    const displayNews = async () => {
        try {
            const response = await fetch('/api/articles'); // Fetch articles from the backend

            if (response.ok) {
                const articles = await response.json(); // Parse the JSON response
                if (articles.length === 0) {
                    errorMessage.textContent = 'No news articles available.';
                } else {
                    articles.forEach(article => {
                        const articleElement = document.createElement('div');
                        articleElement.classList.add('newsArticle'); // Add class for styling
                        
                        articleElement.innerHTML = `
                            <h2>${article.title}</h2>
                            <img src="${article.image}" alt="${article.title}" class="newsImage">
                            <p>${article.description}</p>
                            <p><small>${article.date}</small></p>
                        `;

                        newsContainer.appendChild(articleElement); // Append the article to the container
                    });
                }
            } else {
                errorMessage.textContent = 'Failed to fetch news articles.'; // Error message on fetch failure
            }
        } catch (error) {
            console.error('Error fetching news articles:', error); // Log the error
            errorMessage.textContent = 'An error occurred while fetching news articles.'; // User-friendly error message
        }
    };

    // Call the function to display news on page load
    displayNews();
});
