const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Function to fetch HTML from a URL
async function fetchHTML(url) {
    const { data } = await axios.get(url);
    return data;
}

// Function to save content to a file
function saveContent(content, filename) {
    const filePath = path.join(config.saveDirectory, filename);
    fs.writeFileSync(filePath, content);
    console.log(`Saved: ${filePath}`);
}

// Function to process HTML and extract relevant content
function extractContent(html, searchTerm) {
    const $ = cheerio.load(html);
    const content = $('body').find('*:contains("' + searchTerm + '")').html();
    return content;
}

// Main scraping function
async function scrape() {
    for (const website of config.targetWebsites) {
        console.log(`Scraping website: ${website}`);
        try {
            const html = await fetchHTML(website);
            for (const term of config.searchTerms) {
                console.log(`Searching for term: ${term}`);
                const content = extractContent(html, term);
                if (content) {
                    const filename = `${term.replace(/\s+/g, '_')}.html`;
                    saveContent(content, filename);
                } else {
                    console.log(`No content found for ${term} on ${website}`);
                }
            }
        } catch (error) {
            console.error(`Error scraping ${website}: ${error.message}`);
        }
    }
}

// Ensure the save directory exists
if (!fs.existsSync(config.saveDirectory)) {
    fs.mkdirSync(config.saveDirectory, { recursive: true });
}

// Start the scraping process
scrape();
