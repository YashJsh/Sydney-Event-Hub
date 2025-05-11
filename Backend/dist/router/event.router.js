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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const db_1 = require("../model/db");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q: searchTerm, page = 1, limit = 12 } = req.query;
    const Page = Number(page);
    const Limit = Number(limit);
    const skip = (Page - 1) * Limit;
    try {
        const response = yield db_1.client.event.findMany({
            skip: skip,
            take: Limit
        });
        const totalCount = yield db_1.client.event.count();
        const totalPages = Math.ceil(totalCount / Number(limit));
        res.status(200).json({
            message: "Events fetched successfully",
            response,
            meta: {
                totalCount,
                totalPages,
                currentPage: Number(page),
            },
        });
    }
    catch (error) {
        console.error(error);
    }
}));
router.post("/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, eventId } = req.body;
        const eventID = parseInt(eventId);
        const user = yield db_1.client.user.create({
            data: {
                email: email,
                eventId: eventID
            }
        });
        res.status(201).json({
            message: "User saved successfully",
            user
        });
    }
    catch (error) {
        console.error(error);
    }
}));
exports.eventRouter = router;
