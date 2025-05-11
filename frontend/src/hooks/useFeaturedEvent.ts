// hooks/useFeaturedEvent.ts
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../api/event";

export const useFeaturedEvent = () => {
  return useQuery({
    queryKey: ["featuredEvent"],
    queryFn: () => getEvents(1), // Get first page, no search query
    select: (data) => data.response[0],     // Pick only the first event
    staleTime: 1000 * 60 * 5                // 5 mins cache
  });
};
