"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const puppeteer_1 = __importDefault(require("puppeteer"));
const db_1 = require("../model/db");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto('https://whatson.cityofsydney.nsw.gov.au/', { waitUntil: 'networkidle2' });
        yield page.waitForSelector('.event_tile');
        const events = yield page.evaluate(() => {
            const eventElements = document.querySelectorAll('.event_tile');
            return Array.from(eventElements).map((e) => {
                var _a, _b, _c, _d, _e, _f;
                const title = (_a = e.querySelector('.event_tile-link span')) === null || _a === void 0 ? void 0 : _a.textContent;
                const venue = (_b = e.querySelector('.jsx-9e7220e70ec4446b')) === null || _b === void 0 ? void 0 : _b.textContent;
                const category = (_c = e.querySelector('.event_tile-category-link')) === null || _c === void 0 ? void 0 : _c.textContent;
                const date = (_d = e.querySelector('.event_tile-footer')) === null || _d === void 0 ? void 0 : _d.textContent;
                const halflink = (_e = e.querySelector('.event_tile-link')) === null || _e === void 0 ? void 0 : _e.getAttribute('href');
                const mainlink = 'https://whatson.cityofsydney.nsw.gov.au';
                const fullLink = mainlink === null || mainlink === void 0 ? void 0 : mainlink.concat(halflink);
                const element = e.querySelector('.image_background-image');
                const description = (_f = e.querySelector('.event_tile-strapline')) === null || _f === void 0 ? void 0 : _f.textContent;
                let image = '';
                if (element) {
                    const style = window.getComputedStyle(element);
                    const backgroundImage = style.getPropertyValue('background-image');
                    const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/i);
                    if (urlMatch != null) {
                        image = urlMatch[1];
                    }
                }
                return { title, venue, category, date, fullLink, image, description };
            });
        });
        console.log("Events are : ", events);
        yield Promise.all(events.map((event) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.client.event.upsert({
                    where: { link: event.fullLink },
                    update: {},
                    create: {
                        title: event.title,
                        description: event.description,
                        link: event.fullLink,
                        startDate: event.date,
                        venue: event.venue,
                        image: event.image,
                        endDate: "",
                        price: null
                    }
                });
            }
            catch (error) {
                console.error(`Failed to insert event: ${event.title}`, error);
            }
        })));
        yield browser.close();
    });
}
