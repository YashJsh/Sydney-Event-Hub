import { useEvents } from "../hooks/useEvents";
import EventCard from "./EventCard";
import type { Event } from "../types";
import EventModal from "./EventModal";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface EventListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const EventList: React.FC<EventListProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const { data, isLoading } = useEvents(currentPage);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  if (isLoading) return <div className="flex w-screen h-screen justify-center items-center overflow-y-hidden"><Loader2 className="animate-spin h-10 w-10 " /></div>;

  return (
    <>
      <div className="all-events grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 mx-auto ">
        {data.response.map((event: Event) => (
          <div key= {event.id}  onClick={()=>setSelectedEvent(event)}>
             <EventCard event={event} />
          </div>
         
        ))}

    {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
      
      </div>
      {data && data?.meta.totalCount > 1 && (
        <div className="flex justify-center gap-2 mt-8 mb-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 rounded-xl cursor-pointer"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {data?.meta.currentPage} of {data?.meta.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === data?.meta.totalPages}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  disabled:bg-gray-300 rounded-xl cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default EventList;

