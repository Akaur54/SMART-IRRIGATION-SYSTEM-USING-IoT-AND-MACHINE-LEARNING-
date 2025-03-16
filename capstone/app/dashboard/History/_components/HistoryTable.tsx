// HistoryTable.tsx
"use client"; // Add this at the top of the file

import React, { useState } from 'react';

// Define the interface based on the OUTPUT schema
interface HistoryDataType {
  id: number;
  city: string;
  country: string;
  createdBy: string;
  createdAt: string | null;
  result: boolean; // Use boolean to store result as true or false
}

// Function to sort data by ID in descending order
const sortByIdDesc = (data: HistoryDataType[]): HistoryDataType[] => {
  return data.slice().sort((a, b) => b.id - a.id); // Sort by ID in descending order
};

const HistoryTable: React.FC<{ historyData: HistoryDataType[] }> = ({ historyData }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Check if historyData is an array and not empty
  const isValidArray = Array.isArray(historyData) && historyData.length > 0;

  // Sort data by ID in descending order
  const sortedHistoryData = isValidArray ? sortByIdDesc(historyData) : [];

  // Filter data based on search query
  const filteredHistoryData = sortedHistoryData.filter(item =>
    item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.result ? 'Success' : 'Failure').toLowerCase().includes(searchQuery.toLowerCase()) // Allow searching by result
  );

  return (
    <div className='p-5 border bg-white flex flex-col rounded shadow h-full'>
      <h1 className='text-2xl font-bold mb-4'>Output Data</h1>
      <h1 className='text-sm mb-4 text-gray-500'>Search your output records</h1>
      <input
        className='mb-4 p-2 border rounded w-full'
        type='text'
        placeholder='Search...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className='overflow-x-auto'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-4 py-2 font-semibold text-left'>CITY</th>
              <th className='px-4 py-2 font-semibold text-left'>COUNTRY</th>
              <th className='px-4 py-2 font-semibold text-left'>CREATED BY</th>
              <th className='px-4 py-2 font-semibold text-left'>CREATED AT</th>
              <th className='px-4 py-2 font-semibold text-left'>RESULT</th> {/* Add a column for the result */}
            </tr>
          </thead>
          <tbody>
            {filteredHistoryData.length === 0 ? (
              <tr>
                <td colSpan={5} className='px-4 py-2 text-center text-gray-500'>No data available</td>
              </tr>
            ) : (
              filteredHistoryData.map((item) => (
                <tr key={item.id} className='hover:bg-gray-100 border-t'>
                  <td className='px-4 py-2'>{item.city}</td>
                  <td className='px-4 py-2'>{item.country}</td>
                  <td className='px-4 py-2'>{item.createdBy}</td>
                  <td className='px-4 py-2'>{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}</td>
                  <td className='px-4 py-2'>{item.result ? 'Need to irrigate' : 'No need to irrigate right now'}</td> {/* Display result */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
