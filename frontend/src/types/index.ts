export interface Event {
    id: string;
    title: string;
    description?: string;
    image?: string;
    startDate: string;
    endDate? : string;
    time: string;
    venue: string;
    price?: string;
    link : string;
  }
  
  export interface User {
    email: string;
    savedEvents: string[];
  }