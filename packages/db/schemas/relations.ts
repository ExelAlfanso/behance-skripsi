import { relations } from "drizzle-orm";
import { amenities } from "./amenities";
import { hosts } from "./hosts";
import { locations } from "./locations";
import { properties } from "./properties";
import { propertyAmenities } from "./property-amenities";
import { propertyImages } from "./property-images";
import { propertyTypes } from "./property-types";
import { wishlistStates } from "./wishlist-states";

export const locationRelations = relations(locations, ({ many }) => ({
  properties: many(properties),
}));

export const propertyTypeRelations = relations(propertyTypes, ({ many }) => ({
  properties: many(properties),
}));

export const hostRelations = relations(hosts, ({ many }) => ({
  properties: many(properties),
}));

export const amenityRelations = relations(amenities, ({ many }) => ({
  propertyAmenities: many(propertyAmenities),
}));

export const propertyRelations = relations(properties, ({ one, many }) => ({
  location: one(locations, {
    fields: [properties.locationId],
    references: [locations.id],
  }),
  propertyType: one(propertyTypes, {
    fields: [properties.propertyTypeId],
    references: [propertyTypes.id],
  }),
  host: one(hosts, {
    fields: [properties.hostId],
    references: [hosts.id],
  }),
  images: many(propertyImages),
  propertyAmenities: many(propertyAmenities),
  wishlistState: one(wishlistStates, {
    fields: [properties.id],
    references: [wishlistStates.propertyId],
  }),
}));

export const propertyImageRelations = relations(propertyImages, ({ one }) => ({
  property: one(properties, {
    fields: [propertyImages.propertyId],
    references: [properties.id],
  }),
}));

export const propertyAmenityRelations = relations(
  propertyAmenities,
  ({ one }) => ({
    property: one(properties, {
      fields: [propertyAmenities.propertyId],
      references: [properties.id],
    }),
    amenity: one(amenities, {
      fields: [propertyAmenities.amenityId],
      references: [amenities.id],
    }),
  })
);

export const wishlistStateRelations = relations(wishlistStates, ({ one }) => ({
  property: one(properties, {
    fields: [wishlistStates.propertyId],
    references: [properties.id],
  }),
}));
