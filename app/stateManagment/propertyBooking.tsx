import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';


interface Property {
  id: string; 
  [key: string]: any; 
}

// Define the state and actions
interface PropertyStore {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  properties: Property[];
  profile: null, 

  addProperty: (property: Property) => void;
  setProfile: (profile: Profile) => void;
  removeProperty: (id: string) => void; // or number if `id` is a number
  updateProperty: (id: string, updatedProperty: Partial<Property>) => void;
}


const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  profile:null,
  isLoading:false,
  isError:false,
  error:null,
  
  addProperty: (property) =>
    set((state) => ({
      properties: [...state.properties, property],
    })),
  

  removeProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    })),
  
    
  updateProperty: (id, updatedProperty) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === id ? { ...property, ...updatedProperty } : property
      ),

    }),
    {
      name: 'property-store',
      getStorage: () => AsyncStorage, // Use AsyncStorage for React Native
    }
  ),

  setProfile: (profile:any) =>
    set(() => ({
      profile, // Replace the profile in the state
    })),

}));

export default usePropertyStore;
