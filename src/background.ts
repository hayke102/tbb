import { Auth } from "./lib/auth";
import { scrapeHistory } from "./lib/history-scraper/historyScraper";
import { getStoredOrders } from "./lib/storage/storage";

async function loadHistory() {
    const { lastUpdate } = getStoredOrders();
    await Auth.init();
    scrapeHistory();
}

// Entry point
loadHistory();

function polling() {
    console.log("polling");
    setTimeout(polling, 1000 * 60);
}

polling();
