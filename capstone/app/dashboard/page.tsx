"use client"
import React, { useState } from 'react';
import Form from './_components/Form';

function Page() {
  const [prediction, setPrediction] = useState<string>();

  return (
    <div>
      <Form setPrediction={setPrediction} /> 
    </div>
  );
}

export default Page;
