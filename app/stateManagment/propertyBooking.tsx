import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define the state and actions
interface PropertyStore {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  properties: Property[];
  propertyList: Property[];
  bookingList: Property[];
  profile: Profile|null,

  addProperty: (property: Property) => void;
  setProfile: (profile: Profile) => void;
  setProperttBookingList:(bookingList: Property[]) => void;
  setPropertyList: (propertyList: Property[]) => void;
  removeProperty: (id: string) => void; 
}


const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  isLoading:false,
  isError:false,
  error:null,
  propertyList:[],
  profile: null,
  bookingList:[],
  

  addProperty: (property) =>
    set((state) => ({
      propertyList: [...state.propertyList, property],
    })),
  

  removeProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    })),
  
    
  setPropertyList: (properties) =>
    set(() => ({
      propertyList:properties,
    })),

   setProperttBookingList: (property) =>
      set((state) => ({
        bookingList: property,
      })),

  setProfile: (profile:any) =>
    set(() => ({
      profile, // Replace the profile in the state
    })),

}));

export default usePropertyStore;
