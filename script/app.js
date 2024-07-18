// Selecting DOM elements
const breakingImg = document.querySelector('#breakingImg img');
const breakingNewsDesc = document.querySelector('#breakingNews .description');
const topNewsContainer = document.querySelector('.topNews');
const sportsNewsContainer = document.querySelector('#sportsNews .newsBox');
const technologyNewsContainer = document.querySelector('#technologyNews .newsBox');
const businessNewsContainer = document.querySelector('#businessNews .newsBox');

// URL for fetching news data
const newsUrl = "http://localhost:3000/news";

// Function to fetch data from the server
const fetchData = async () => {
    try {
        const response = await fetch(newsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data.news || []; // Assuming 'news' is the array of categories in the response
    } catch (error) {
        console.error(`Error fetching data:`, error);
        return [];
    }
}

// Function to process and add breaking news to the DOM
const addBreakingNews = (data) => {
    console.log('Adding breaking news:', data); // Log the data being processed
    if (data.items && data.items.length > 0) {
        const breaking = data.items.find(item => item.id === 1); // Find the item with ID 1
        if (breaking && breaking.image && breaking.title && breaking.date) {
            breakingImg.src = breaking.image;
            breakingImg.alt = breaking.title;
            breakingNewsDesc.innerHTML = `<h6>${breaking.title}</h6><p>${breaking.date}</p>`;
        } else {
            console.error('Incomplete breaking news data:', breaking);
        }
    } else {
        console.error('No breaking news data available');
    }
}

// Function to process and add top news to the DOM
const addTopNews = (data) => {
    if (topNewsContainer) { // Check if topNews container exists
        let html = '';
        data.items.forEach(element => {
            if (element.id === 1) { // Check if the item has ID 1
                if (element.title && element.image && element.date) {
                    let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
                    html += `<div class="newsCard">
                                <div class="img">
                                    <img src="${element.image}" alt="${element.title}">
                                </div>
                                <div class="text">
                                    <div class="title">
                                        <a href="#"><p>${title}</p></a>
                                    </div>
                                    <div class="date">${element.date}</div>
                                </div>
                            </div>`;
                } else {
                    console.error('Incomplete top news data:', element);
                }
            }
        });
        topNewsContainer.innerHTML = html;
    } else {
        console.error('Top news container not found');
    }
}

// Function to process and add sports news to the DOM
const addSportsNews = (data) => {
    if (sportsNewsContainer) { // Check if sportsNewsContainer exists
        let html = '';
        data.items.forEach(element => {
            if (element.id === 1 || element.id === 2) { // Check if the item has ID 1 or 2
                if (element.title && element.image && element.date) {
                    let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
                    html += `<div class="newsCard">
                                <div class="img">
                                    <img src="${element.image}" alt="${element.title}">
                                </div>
                                <div class="text">
                                    <div class="title">
                                        <a href="#"><p>${title}</p></a>
                                    </div>
                                    <div class="date">${element.date}</div>
                                </div>
                            </div>`;
                } else {
                    console.error('Incomplete sports news data:', element);
                }
            }
        });
        sportsNewsContainer.innerHTML = html;
    } else {
        console.error('Sports news container not found');
    }
}

// Function to process and add technology news to the DOM
const addTechnologyNews = (data) => {
    if (technologyNewsContainer) { // Check if technologyNewsContainer exists
        let html = '';
        data.items.forEach(element => {
            if (element.id === 1 || element.id === 2) { // Check if the item has ID 1 or 2
                if (element.title && element.image && element.date) {
                    let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
                    html += `<div class="newsCard">
                                <div class="img">
                                    <img src="${element.image}" alt="${element.title}">
                                </div>
                                <div class="text">
                                    <div class="title">
                                        <a href="#"><p>${title}</p></a>
                                    </div>
                                    <div class="date">${element.date}</div>
                                </div>
                            </div>`;
                } else {
                    console.error('Incomplete technology news data:', element);
                }
            }
        });
        technologyNewsContainer.innerHTML = html;
    } else {
        console.error('Technology news container not found');
    }
}

// Function to process and add business news to the DOM
const addBusinessNews = (data) => {
    if (businessNewsContainer) { // Check if businessNewsContainer exists
        let html = '';
        data.items.forEach(element => {
            if (element.id === 1 || element.id === 2 || element.id === 3) { // Check if the item has ID 1, 2, or 3
                if (element.title && element.image && element.date) {
                    let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
                    html += `<div class="newsCard">
                                <div class="img">
                                    <img src="${element.image}" alt="${element.title}">
                                </div>
                                <div class="text">
                                    <div class="title">
                                        <a href="#"><p>${title}</p></a>
                                    </div>
                                    <div class="date">${element.date}</div>
                                </div>
                            </div>`;
                } else {
                    console.error('Incomplete business news data:', element);
                }
            }
        });
        businessNewsContainer.innerHTML = html;
    } else {
        console.error('Business news container not found');
    }
}

// Function to fetch and display all types of news
const fetchAndDisplayData = async () => {
    const newsData = await fetchData();
    newsData.forEach(category => {
        switch (category.category) {
            case 'breaking':
                addBreakingNews(category);
                break;
            case 'sports':
                addSportsNews(category);
                break;
            case 'technology':
                addTechnologyNews(category);
                break;
            case 'business':
                addBusinessNews(category);
                break;
            default:
                console.error('Unknown category:', category.category);
        }
    });
}

// Fetch and display news data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayData);
