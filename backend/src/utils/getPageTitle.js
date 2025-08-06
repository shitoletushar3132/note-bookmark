import axios from "axios";
import * as cheerio from "cheerio";

const getPageTitle = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const title = $("title").text().slice(0, 20).trim(); 

    return title || "No title found";
  } catch (err) {
    console.error("Error fetching title:", err.message);
    return "Unknown Title";
  }
};

export default getPageTitle;
