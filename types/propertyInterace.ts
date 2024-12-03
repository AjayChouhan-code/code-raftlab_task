interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  interface Location {
    address: string;
    city: string;
    state: string;
    coordinates: Coordinates;
  }
  
  interface Property {
    id: string; 
    title: string;
    price: number;
    location: Location;
    features: string[];
    images: string[]; 
  }
  interface PropertyInterface{
    item?:Property
    isBooked?:boolean
  }