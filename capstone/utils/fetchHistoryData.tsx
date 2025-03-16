"use client"; // Add this at the top of the file

import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { OUTPUT } from '@/utils/Schema';
import { eq } from 'drizzle-orm';

// Define the interface based on the OUTPUT schema
export interface HistoryDataType {
    id: number;
    city: string;
    country: string;
    createdBy: string;
    createdAt: string | null;
    result: boolean;
}

// Fetch history data function for the HistoryDataType
export async function fetchHistoryData(userEmail: string): Promise<HistoryDataType[]> {
  const result = await db
    .select()
    .from(OUTPUT)
    .where(eq(OUTPUT.createdBy, userEmail)) // Filter by user email
    .execute();
  
  // Convert the result to the appropriate type
  return result.map((item) => ({
    id: item.id,
    city: item.city,
    country: item.country,
    createdBy: item.createdBy,
    createdAt: item.createdAt ?? null,
    result: item.result // Explicit conversion from number to boolean
  }));
}
