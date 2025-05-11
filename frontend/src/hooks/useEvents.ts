import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../api/event";

export const useEvents = (page : any) => {
  return useQuery({

    queryKey: ["events", page],
    queryFn: ()=> getEvents(page), 
    staleTime: 1000 * 60 * 5 
  });
};