import { axiosInstance } from "./axiosInstance"

export const getEvents = async ( page: number = 1)=>{
    const response = await axiosInstance.get("/event", {
        params : { page, limit : 12}
    });
    return response.data;
}

