var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from "puppeteer";
import { client } from "../model/db";
export const func = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch();
    const page = yield browser.newPage();
    yield page.goto('https://www.sydney.com/events', { waitUntil: 'networkidle2' });
    yield page.waitForSelector('.tile__product-list');
    const title = yield page.title();
    console.log(`Page title is : ${title}`);
    while (true) {
        try {
            yield page.waitForSelector('.load-more-button button', { timeout: 5000 });
            const isDisabled = yield page.$eval('.load-more-button button', btn => btn.disabled);
            if (isDisabled) {
                console.log("Load More button is disabled.");
                break;
            }
            console.log("Clicking Load More...");
            yield page.click('.load-more-button button');
            yield new Promise(resolve => setTimeout(resolve, 5000));
        }
        catch (e) {
            console.log("No more Load More button found or timeout occurred.");
            break;
        }
    }
    const events = yield page.evaluate(() => {
        const eventElements = document.querySelectorAll('.tile__product-list');
        return Array.from(eventElements).map((e) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            const title = ((_a = e.querySelector('.tile__product-list-tile-heading h3')) === null || _a === void 0 ? void 0 : _a.textContent) || "Untitled";
            const description = ((_c = (_b = e.querySelector('.prod-desc')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || null;
            const link = ((_d = e.querySelector('.tile__product-list-link')) === null || _d === void 0 ? void 0 : _d.getAttribute('href')) || null;
            const startDate = ((_f = (_e = e.querySelector('.start-date')) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()) || null;
            const venue = ((_h = (_g = e.querySelector('.tile__area-name')) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.trim()) || null;
            const image = ((_j = e.querySelector('.img-responsive')) === null || _j === void 0 ? void 0 : _j.getAttribute('src')) || null;
            const endDate = ((_l = (_k = e.querySelector('.end-date')) === null || _k === void 0 ? void 0 : _k.textContent) === null || _l === void 0 ? void 0 : _l.trim()) || null;
            const price = ((_o = (_m = e.querySelector('.tile__product-rate-from span')) === null || _m === void 0 ? void 0 : _m.textContent) === null || _o === void 0 ? void 0 : _o.trim()) || null;
            return { title, description, link, startDate, venue, image, endDate, price };
        });
    });
    const validEvents = events.filter(event => !!event.title && !!event.link);
    const transaction = yield events.map((event) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.event.upsert({
            where: { link: event.link },
            update: {},
            create: {
                title: event.title,
                description: event.description,
                link: event.link,
                startDate: event.startDate,
                venue: event.venue,
                image: event.image,
                endDate: event.endDate,
                price: event.price
            }
        });
    }));
    console.log(`Inserted/Updated ${validEvents.length} events`);
    console.log("Length is :", Object.keys(events).length);
    console.log(events);
    yield browser.close();
});
