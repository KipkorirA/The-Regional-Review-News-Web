// JavaScript code to fetch and display breaking news image

const apiUrl = "http://localhost:3000/news";

const fetchData = async () => {
    try {
        const url = `${apiUrl}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data); // Log the entire response to understand its structure

        return data; // Return the entire data object
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or handle the error as per your requirement
    }
};

// Function to add breaking news image and text to the HTML
const addBreakingNews = (data) => {
    const breakingImgElement = document.querySelector('#breakingImg img');
    const breakingNewsTextElement = document.querySelector('#breakingNews .description h6');

    if (data && data.length > 0 && data[0].breaking && data[0].breaking.image) {
        breakingImgElement.src = data[0].breaking.image;
        breakingNewsTextElement.textContent = data[0].breaking.title; // Assuming you have a title property in your JSON
    } else {
        breakingImgElement.src = '/path/to/default/image.jpg'; // Provide a default image path
        breakingNewsTextElement.textContent = 'No breaking news available'; // Default text
    }
};

// Call fetchData and handle the result
fetchData()
    .then(addBreakingNews)
    .catch(error => {
        console.error('Error in fetching and displaying breaking news:', error);
        // Handle error if needed
    });
