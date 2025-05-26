import { ApifyClient } from 'apify-client';

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

/**
 * Scrape company data from LinkedIn
 * @param companyUrl LinkedIn company URL
 */
export async function scrapeCompanyFromLinkedIn(companyUrl: string) {
  try {
    // Start the LinkedIn scraper actor
    const run = await client.actor('apify/linkedin-company-scraper').call({
      linkedInCompanyUrls: [companyUrl],
      includeJobs: true,
    });

    // Fetch and return results from the actor's default dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items[0];
  } catch (error) {
    console.error('Error scraping company data from LinkedIn:', error);
    throw new Error('Failed to scrape company data');
  }
}

/**
 * Scrape talent data from LinkedIn
 * @param profileUrl LinkedIn profile URL
 */
export async function scrapeTalentFromLinkedIn(profileUrl: string) {
  try {
    // Start the LinkedIn scraper actor
    const run = await client.actor('apify/linkedin-profile-scraper').call({
      linkedInProfileUrls: [profileUrl],
      includeContactInfo: true,
    });

    // Fetch and return results from the actor's default dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items[0];
  } catch (error) {
    console.error('Error scraping talent data from LinkedIn:', error);
    throw new Error('Failed to scrape talent data');
  }
}

/**
 * Search for companies on LinkedIn
 * @param query Search query
 * @param limit Number of results to return
 */
export async function searchCompaniesOnLinkedIn(query: string, limit: number = 10) {
  try {
    // Start the LinkedIn search actor
    const run = await client.actor('apify/linkedin-search-scraper').call({
      searchType: 'companies',
      keywords: query,
      maxItems: limit,
    });

    // Fetch and return results from the actor's default dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
  } catch (error) {
    console.error('Error searching companies on LinkedIn:', error);
    throw new Error('Failed to search companies');
  }
}

/**
 * Search for talents on LinkedIn
 * @param query Search query
 * @param limit Number of results to return
 */
export async function searchTalentsOnLinkedIn(query: string, limit: number = 10) {
  try {
    // Start the LinkedIn search actor
    const run = await client.actor('apify/linkedin-search-scraper').call({
      searchType: 'people',
      keywords: query,
      maxItems: limit,
    });

    // Fetch and return results from the actor's default dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
  } catch (error) {
    console.error('Error searching talents on LinkedIn:', error);
    throw new Error('Failed to search talents');
  }
}

/**
 * Enrich company data from multiple sources
 * @param companyName Company name
 */
export async function enrichCompanyData(companyName: string) {
  try {
    // Use the web scraper actor to gather data from multiple sources
    const run = await client.actor('apify/web-scraper').call({
      startUrls: [
        { url: `https://www.google.com/search?q=${encodeURIComponent(companyName)}` },
        { url: `https://www.crunchbase.com/textsearch?q=${encodeURIComponent(companyName)}` },
      ],
      pseudoUrls: [
        { purl: 'https://www.crunchbase.com/organization/[.*]' },
      ],
      linkSelector: 'a',
      pageFunction: `async function pageFunction(context) {
        const { request, log, jQuery } = context;
        const $ = jQuery;
        const result = {
          url: request.url,
          title: $('title').text(),
        };
        
        // Extract data based on the URL
        if (request.url.includes('crunchbase.com')) {
          result.fundingRounds = [];
          $('.cb-link-list').each(function() {
            if ($(this).find('h3').text().includes('Funding Rounds')) {
              $(this).find('a').each(function() {
                result.fundingRounds.push($(this).text().trim());
              });
            }
          });
        }
        
        return result;
      }`,
    });

    // Fetch and return results from the actor's default dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
  } catch (error) {
    console.error('Error enriching company data:', error);
    throw new Error('Failed to enrich company data');
  }
}
