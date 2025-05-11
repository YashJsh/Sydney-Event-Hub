import puppeteer, { Puppeteer } from "puppeteer";
import { client } from "../model/db";

export async function run(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://whatson.cityofsydney.nsw.gov.au/', { waitUntil: 'networkidle2' });
    await page.waitForSelector('.event_tile');
    
    const events = await page.evaluate(()=>{
        const eventElements = document.querySelectorAll('.event_tile');
        return Array.from(eventElements).map((e) => {
            const title = e.querySelector('.event_tile-link span')?.textContent;
            const venue = e.querySelector('.jsx-9e7220e70ec4446b')?.textContent;
            const category = e.querySelector('.event_tile-category-link')?.textContent;
            const date = e.querySelector('.event_tile-footer')?.textContent;
            const halflink = e.querySelector('.event_tile-link')?.getAttribute('href');
            const mainlink = 'https://whatson.cityofsydney.nsw.gov.au'
            const fullLink = mainlink?.concat(halflink as string);
            const element = e.querySelector('.image_background-image');
            const description = e.querySelector('.event_tile-strapline')?.textContent;
            let image = '';
            if(element){
                const style = window.getComputedStyle(element);
                const backgroundImage = style.getPropertyValue('background-image');
                const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/i);
                if(urlMatch != null){
                    image =  urlMatch[1];
                }
            }

            return { title, venue, category, date, fullLink, image, description};
        })
    });
    console.log("Events are : ", events);
    await Promise.all(events.map(async(event) =>{
        try {
            await client.event.upsert({
                where: { link: event.fullLink! },
                update: {},
                create: {
                  title: event.title!,
                  description: event.description,
                  link: event.fullLink!,
                  startDate: event.date,
                  venue: event.venue,
                  image: event.image,
                  endDate: "",
                  price: null
                }
              })
        } catch (error) {
            console.error(`Failed to insert event: ${event.title}`, error);
        }
        
    }));
    await browser.close();
}
