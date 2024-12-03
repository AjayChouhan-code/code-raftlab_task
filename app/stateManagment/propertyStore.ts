import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';


export const propertiesAtom = atomWithStorage<PropertyInterface[]>('property-store', []);

// Atom for adding a property
export const addPropertyAtom = atom(
  null,
  (get, set, newProperty: Property) => {
    const currentProperties = get(propertiesAtom);
    set(propertiesAtom, [...currentProperties, newProperty]);
  }
);

// Atom for removing a property by id
export const removePropertyAtom = atom(
  null,
  (get, set, id: string) => {
    const currentProperties = get(propertiesAtom);
    set(propertiesAtom, currentProperties.filter((property) => property.id !== id));
  }
);

// Atom for updating a property by id
export const updatePropertyAtom = atom(
  null,
  (get, set, { id, updatedProperty }: { id: string; updatedProperty: Partial<Property> }) => {
    const currentProperties = get(propertiesAtom);
    set(
      propertiesAtom,
      currentProperties.map((property) =>
        property.id === id ? { ...property, ...updatedProperty } : property
      )
    );
  }
);
