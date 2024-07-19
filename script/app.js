// Selecting DOM elements
const breakingImg = document.querySelector('#breakingImg img');
const breakingNewsDesc = document.querySelector('#breakingNews .description');
const topNewsContainer = document.querySelector('.topNews');
const sportsNewsContainer = document.querySelector('#sportsNews .newsBox');
const technologyNewsContainer = document.querySelector('#technologyNews .newsBox');
const businessNewsContainer = document.querySelector('#businessNews .newsBox');
const lifeStyleNewsContainer = document.querySelector('#lifeStyleNews .newsBox');
const filterButton = document.querySelector('#filterButton');
const header = document.querySelector('.header'); 

// URL for fetching news data
const newsUrl = "https://project-deploy-link.vercel.app/news";

// Function to fetch data from the server
const fetchData = async () => {
    const response = await fetch(newsUrl);
    if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        return data;
    } else {
        console.error(`HTTP error! Status: ${response.status}`);
        return [];
    }
}

// Function to process and add breaking news to the DOM
const addBreakingNews = (data) => {
    console.log('Adding breaking news:', data); 
    if (data.items && data.items.length > 0) {
        const breaking = data.items.find(item => item.id !== 0); 
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

// Function to process and add top news headlines (links) to the DOM
const addTopNews = (newsData) => {
    // Clear previous content
    topNewsContainer.innerHTML = '';

    // Loop through newsData items
    newsData.forEach(item => {
        if (item.headline === "true") {
            // Create news element
            const newsElement = document.createElement('div');
            newsElement.classList.add('news');

            // Create anchor element for the news title (link)
            const newsLink = document.createElement('a');
            newsLink.href = `#section-${item.id}`; // Link to the section on the same page
            newsLink.textContent = item.title; // News title
            newsLink.classList.add('title-link');

            // Append the news link to the news element
            newsElement.appendChild(newsLink);

            // Append the news element to the topNewsContainer
            topNewsContainer.appendChild(newsElement);
        }
    });
}

// Function to process and add sports news to the DOM
const addSportsNews = (data) => {
    if (sportsNewsContainer) { 
        let html = '';
        data.items.forEach(element => {
            if (element.id !== 0) { 
                if (element.title && element.image && element.date) {
                    let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
                    html += `<div class="newsCard" id="section-${element.id}">
                                <div class="img">
                                    <img src="${element.image}" alt="${element.title}">
                                </div>
                                <div class="text">
                                    <div class="title">
                                        <a href="page2.html?id=${element.id}"><p>${title}</p></a>
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
    if (technologyNewsContainer) { 
        let html = '';
        data.items.forEach(element => {
            if (element.id !== 0) { 
                if (element.title && element.image && element.date) {
                    let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
                    html += `<div class="newsCard" id="section-${element.id}">
                                <div class="img">
                                    <img src="${element.image}" alt="${element.title}">
                                </div>
                                <div class="text">
                                    <div class="title">
                                        <a href="page2.html?id=${element.id}"><p>${title}</p></a>
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
    if (businessNewsContainer) { 
        let html = '';
        data.items.forEach(element => {
            if (element.id === 1 || element.id === 2 || element.id === 3) { 
                if (element.title && element.image && element.date) {
                    let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
                    html += `<div class="newsCard" id="section-${element.id}">
                                <div class="img">
                                    <img src="${element.image}" alt="${element.title}">
                                </div>
                                <div class="text">
                                    <div class="title">
                                        <a href="page2.html?id=${element.id}"><p>${title}</p></a>
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

// Function to process and add Life & Style news to the DOM
const addLifeStyleNews = (data) => {
    if (lifeStyleNewsContainer) { 
        let html = '';
        data.items.forEach(element => {
            if (element.id === 1) { 
                if (element.title && element.image && element.date) {
                    let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
                    html += `<div class="newsCard" id="section-${element.id}">
                                <div class="img">
                                    <img src="${element.image}" alt="${element.title}">
                                </div>
                                <div class="text">
                                    <div class="title">
                                        <a href="page2.html?id=${element.id}"><p>${title}</p></a>
                                    </div>
                                    <div class="date">${element.date}</div>
                                </div>
                            </div>`;
                } else {
                    console.error('Incomplete Life & Style news data:', element);
                }
            }
        });
        lifeStyleNewsContainer.innerHTML = html;
    } else {
        console.error('Life & Style news container not found');
    }
}

// Function to fetch and display all types of news
const fetchAndDisplayData = async () => {
    const newsData = await fetchData();
    let topNews = [];
    newsData.forEach(category => {
        switch (category.category) {
            case 'breaking':
                addBreakingNews(category);
                break;
            case 'sports':
                addSportsNews(category);
                topNews = topNews.concat(category.items.filter(item => item.headline === "true"));
                break;
            case 'technology':
                addTechnologyNews(category);
                topNews = topNews.concat(category.items.filter(item => item.headline === "true"));
                break;
            case 'business':
                addBusinessNews(category);
                topNews = topNews.concat(category.items.filter(item => item.headline === "true"));
                break;
            case 'life & style':
                addLifeStyleNews(category);
                topNews = topNews.concat(category.items.filter(item => item.headline === "true"));
                break;
            default:
                console.error('Unknown category:', category.category);
        }
    });
    addTopNews(topNews);
}

// Initial data fetch and display
fetchAndDisplayData();

// Event listener for the filter button
filterButton.addEventListener('click', () => {});

// Scroll event listener for hiding/showing header
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});
