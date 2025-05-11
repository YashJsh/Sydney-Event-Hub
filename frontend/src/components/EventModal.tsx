// components/EventModal.tsx
import React, { useState } from "react";
import type { Event } from "../types";
import { axiosInstance } from "../api/axiosInstance";

interface Props {
  event: Event;
  onClose: () => void;
}

const EventModal: React.FC<Props> = ({ event, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }
      const response = await axiosInstance.post("/event/email", {
        email, 
        eventId : event.id
      })
      if(!response){
        alert("Email is not valid");
      }
      alert("Thankyou for visiting");
      window.location.href = event.link;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-2xl w-full relative ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <img src={event.image} alt={event.title} className="rounded-2xl mb-4" />

        <div className="px-5 mb-7">
          <span className="text-xs tracking-tight font-light uppercase">
            {event.venue}
          </span>
          <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
          <p className="text-md text-gray-700 mb-2">{event.description}</p>
          <p className="text-sm text-gray-600 pb-2">
            {event.startDate} {event.endDate ? `- ${event.endDate}` : ""}
          </p>
          {event.time && (
            <p className="text-sm text-gray-600 pb-2">{event.time}</p>
          )}

          <div className="mb-2 mt-2">
            <input
              type="email"
              id="email"
              className="text-sm  focus:ring-blue-500 border border-gray-300 focus:border-blue-500 block w-full p-2 rounded-xl"
              placeholder="Enter your email address to know details"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl px-5 py-3 text-white w-full transition-all hover:from-blue-600 hover:to-blue-800"
            onClick={handleSubmit}
            disabled={loading}
          >
            {event.price ? "Get Tickets" : "Know Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
