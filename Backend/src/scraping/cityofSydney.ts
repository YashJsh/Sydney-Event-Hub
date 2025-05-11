import puppeteer from "puppeteer";
import { client } from "../model/db";

interface ScrapeData {
  title: string;
  description: string | null;
  link: string;
  startDate: string | null;
  venue: string | null;
  image: string | null;
  endDate: string | null;
  price: string | null;
}

export const func = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.sydney.com/events", {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector(".tile__product-list");

  const title = await page.title();
  console.log(`Page title is : ${title}`);

  while (true) {
    try {
      await page.waitForSelector(".load-more-button button", { timeout: 5000 });

      const isDisabled = await page.$eval(
        ".load-more-button button",
        (btn) => btn.disabled
      );
      if (isDisabled) {
        console.log("Load More button is disabled.");
        break;
      }

      console.log("Clicking Load More...");
      await page.click(".load-more-button button");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (e) {
      console.log("No more Load More button found or timeout occurred.");
      break;
    }
  }

  const events: ScrapeData[] = await page.evaluate(() => {
    const eventElements = document.querySelectorAll(".tile__product-list");
    return Array.from(eventElements).map((e) => {
      const title =
        e.querySelector(".tile__product-list-tile-heading h3")?.textContent ||
        "Untitled";
      const description =
        e.querySelector(".prod-desc")?.textContent?.trim() || null;
      const link =
        e.querySelector(".tile__product-list-link")?.getAttribute("href")!;
      const startDate =
        e.querySelector(".start-date")?.textContent?.trim() || null;
      const venue =
        e.querySelector(".tile__area-name")?.textContent?.trim() || null;
      const image =
        e.querySelector(".img-responsive")?.getAttribute("src") || null;
      const endDate = e.querySelector(".end-date")?.textContent?.trim() || null;
      const price =
        e.querySelector(".tile__product-rate-from span")?.textContent?.trim() ||
        null;

      return {
        title,
        description,
        link,
        startDate,
        venue,
        image,
        endDate,
        price,
      };
    });
  });


  await Promise.all(
    events.map(async (event) => {
      try {
        await client.event.upsert({
          where: { link: event.link! },
          update: {},
          create: {
            title: event.title!,
            description: event.description,
            link: event.link!,
            startDate: event.startDate,
            venue: event.venue,
            image: event.image,
            endDate: event.endDate,
            price: event.price,
          },
        });
      } catch (error) {
        console.error(`Failed to insert event: ${event.title}`, error);
      }
    })
  );

  console.log(`Inserted/Updated ${events.length} events`);
  console.log("Length is :", Object.keys(events).length);
  console.log(events);
  await browser.close();
};

