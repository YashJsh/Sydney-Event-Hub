import { Router, Request, Response } from "express";
import { client } from "../model/db";

const router = Router();

router.get("/", async (req : Request, res : Response)=>{
    const {q : searchTerm, page = 1, limit = 12} = req.query;
    const Page = Number(page);
    const Limit = Number(limit);
    const skip  = (Page - 1)* Limit;
    try{
        const response = await client.event.findMany({
            skip : skip,
            take : Limit
        });
        const totalCount = await client.event.count();
        const totalPages = Math.ceil(totalCount / Number(limit));

        res.status(200).json({
            message : "Events fetched successfully",
            response,
            meta: {
                totalCount,
                totalPages,
                currentPage: Number(page),
            },
        })

    }catch(error){
        console.error(error);
    }
});

router.post("/email", async (req : Request, res : Response)=>{
    try {
        const {email, eventId } = req.body;
        const eventID = parseInt(eventId);
        const user = await client.user.create({
            data : {
                email : email,
                eventId : eventID
            }
        })
        res.status(201).json({
            message : "User saved successfully",
            user
        })
    } catch (error) {
        console.error(error);
    }
})

export const eventRouter = router;