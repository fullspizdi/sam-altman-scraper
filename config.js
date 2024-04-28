// Configuration settings for the Sam Altman Scraper

module.exports = {
    // Search terms to be used in queries to find relevant resources about Sam Altman
    searchTerms: [
        'Sam Altman',
        'Sam Altman interviews',
        'Sam Altman articles',
        'Sam Altman blog posts'
    ],

    // Target websites to scrape for resources
    targetWebsites: [
        'https://blog.samaltman.com',
        'https://www.ycombinator.com',
        'https://techcrunch.com'
    ],

    // Directory where the scraped resources will be saved locally
    saveDirectory: './downloaded_resources'
};
