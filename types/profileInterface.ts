interface Profile {
    id?: string; // User ID, assuming it's a string
    name: string; // User name
    email: string; // User email
    bookings: string[]; // Array of booking IDs, assuming they are strings
  }