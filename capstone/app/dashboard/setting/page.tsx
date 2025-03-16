import { UserProfile } from '@clerk/nextjs';
import React from 'react';

function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <UserProfile />
    </div>
  );
}

export default Page;
