import React from "react";
import type { Event } from "../types";

export interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div
      className="group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer shadow flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-b-2xl">
        <img
          src={event.image || `https://placehold.co/600x600/e2e8f0/64748b?text=${event.title}`}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6 ">
        <div className="mb-2">
          <span className="text-xs tracking-tight font-light uppercase">
            {event.venue}
          </span>
          <h3 className="mt-2 text-xl font-semibold leading-tight line-clamp-2">
            {event.title}
          </h3>
        </div>

        <div className="space-y-2 text-sm text-primary-600">
          {event.description && (
            <div className="flex items-center text-start font-medium text-gray-500">
              <span>{event.description}</span>
            </div>
          )}

          <div className="flex items-center text-xs font-semibold text-gray-900">
            <span>
              {event.startDate} {event.endDate ? `- ${event.endDate}` : ""}
            </span>
          </div>

          {event.time && (<div className="flex items-center">
            <span className="truncate">{event.time}</span>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
