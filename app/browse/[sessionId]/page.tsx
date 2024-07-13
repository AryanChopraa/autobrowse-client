'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { useGetObjectivesQuery } from '@/redux/features/tasksApiSlice';

interface Step {
  number: number;
  explanation: string;
  action: string;
  completed: boolean;
}

interface JsonResponse {
  explanation: string;
  action: string;
}

const Page = () => {
  const [objective, setObjective] = useState<string>('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [finalResponse, setFinalResponse] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { sessionId } = useParams();
  const router = useRouter();
  const { 
    data, 
    isSuccess,
  } = useGetObjectivesQuery(sessionId, { skip: !sessionId });

  useEffect(() => {
    if (isSuccess && data) {
      setObjective(data.objective);

      const ws = new WebSocket('ws://localhost:8000/ws/chat/');
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        ws.send(JSON.stringify({ objective: data.objective }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.explanation && data.action) {
          setSteps(prevSteps => [
            ...prevSteps,
            {
              number: prevSteps.length + 1,
              explanation: data.explanation,
              action: data.action,
              completed: false
            }
          ]);
        }
        if (data.screenshot) {
          setScreenshot(data.screenshot);
        }
        if (data.final_response) {
          setFinalResponse(data.final_response);
          setTimeout(() => setShowDialog(true), 4000);
        }
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [isSuccess, data]);

  const handleRunAnotherSession = () => {
    router.push('/tasks');
  };

  return (
    <div className="flex bg-gray-900 text-white">
      {/* Left Panel */}
      <div className="w-3/4 p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Objective: {objective}</h2>
        </div>
        <div className="bg-white rounded-lg overflow-hidden">
          {screenshot ? (
            <img
              src={`data:image/jpeg;base64,${screenshot}`}
              alt="Current Screenshot"
              className="w-full h-auto"
              style={{ objectFit: 'contain', maxHeight: '600px' }}
            />
          ) : (
            <div className="w-full h-[600px] flex items-center justify-center text-gray-500">
              Waiting for the stream to start...
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/4 bg-gray-800 p-4 overflow-y-auto" style={{maxHeight: '100vh'}}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Steps</h2>
          <span className="text-green-400 text-sm">IN PROGRESS</span>
        </div>
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <StepItem
              key={index}
              number={step.number}
              explanation={step.explanation}
              action={step.action}
              completed={step.completed}
            />
          ))}
        </div>
        {finalResponse && (
          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Final Response:</h3>
            <p className="text-sm text-gray-300">{finalResponse}</p>
          </div>
        )}
      </div>

      {/* Final Response Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-8 rounded-lg max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Run Successful</h2>
              <p className="text-gray-300 mb-8">{finalResponse}</p>
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg w-full"
                onClick={handleRunAnotherSession}
              >
                Run another session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface StepItemProps {
  number: number
  explanation: string
  action: string
  completed: boolean
}

const StepItem: React.FC<StepItemProps> = ({ number, explanation, action, completed }) => {
  return (
    <div className="flex items-start">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${completed ? 'bg-green-500' : 'bg-gray-600'}`}>
        {completed ? '✓' : number}
      </div>
      <div>
        <p className="text-sm font-semibold">Explanation:</p>
        <p className="text-xs text-gray-400 mt-1 mb-2">{explanation}</p>
        <p className="text-sm font-semibold">Action:</p>
        <p className="text-xs text-gray-400 mt-1">{action}</p>
      </div>
    </div>
  )
}

export default Page