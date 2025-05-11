import express from "express";
import cors from "cors";
import cron from "node-cron"
import { eventRouter } from "./router/event.router";
import { func as scrapeEvents } from "./scraping/cityofSydney";
import { run as scrapeEvent2 } from "./scraping/whatsOnScraping"

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


//It will run at 12 AM Everyday
cron.schedule("0 0 * * *", async () => {
    console.log("Running scheduled scraper job...");
    await scrapeEvents();
    await scrapeEvent2();
});

app.use("/api/event", eventRouter);


app.listen(5003);