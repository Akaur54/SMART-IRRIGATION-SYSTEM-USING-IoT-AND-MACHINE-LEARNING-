import { pgTable, serial, varchar, real, boolean } from "drizzle-orm/pg-core";

export const OUTPUT = pgTable('output', {
    id: serial('id').primaryKey(),
    city: varchar('city', { length: 255 }).notNull(),
    country: varchar('country', { length: 255 }).notNull(),
    temperature: real('temperature').notNull(),  // Use 'real' for float values
    humidity: real('humidity').notNull(),         // Use 'real' for float values
    soilMoisture: real('soil_moisture').notNull(), // Use 'real' for float values
    cropType: varchar('cropType', { length: 255 }).notNull(), // Use varchar for crop type
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    result: boolean('result').notNull()
});
