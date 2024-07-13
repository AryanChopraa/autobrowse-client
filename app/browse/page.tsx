'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import {useGetObjectivesQuery} from '@/redux/features/tasksApiSlice';


interface Message {
  type: string;
  content: string;
}

interface Step {
  number: number;
  text: string;
  subText: string;
  completed: boolean;
}

const Page = () => {
  const [objective, setObjective] = useState<string>('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [screenshot, setScreenshot] = useState<string | null>(null);


  const { sessionId } = useParams();
  const { 
    data: objectives, 
    error: objectivesError, 
    isLoading: objectivesLoading 
  } = useGetObjectivesQuery(sessionId);


  useEffect(() => {

    const ws = new WebSocket('ws://localhost:8000/ws/chat/');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      const initialMessage = { objective:'go to amazon and search for iphone 15 get me the price' };
      ws.send(JSON.stringify(initialMessage));

    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        setMessages(prevMessages => [...prevMessages, { type: 'system', content: data.message }]);
      }
      if (data.response) {
        setMessages(prevMessages => [...prevMessages, { type: 'ai', content: data.response }]);
      }
      if (data.screenshot) {
        setScreenshot(data.screenshot);
      }
      if (data.final_response) {
        setMessages(prevMessages => [...prevMessages, { type: 'final', content: data.final_response }]);
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex bg-gray-900 text-white">
      {/* Left Panel */}
      <div className="w-3/4 p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Objective: {objective}</h2>
        </div>
        <div className="bg-white rounded-lg overflow-hidden">
          {screenshot ? (
            <Image
              src={`data:image/jpeg;base64,${screenshot}`}
              alt="Current Screenshot"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          ) : (
            <div className="w-full h-[600px] flex items-center justify-center text-gray-500">
              Waiting for screenshot...
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/4 bg-gray-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Steps</h2>
          <span className="text-green-400 text-sm">IN PROGRESS</span>
        </div>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <StepItem
              key={index}
              number={step.number}
              text={step.text}
              subText={step.subText}
              completed={step.completed}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface StepItemProps {
  number: number
  text: string
  subText: string
  completed: boolean
}

const StepItem: React.FC<StepItemProps> = ({ number, text, subText, completed }) => {
  return (
    <div className="flex items-start">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${completed ? 'bg-green-500' : 'bg-gray-600'}`}>
        {completed ? '✓' : number}
      </div>
      <div>
        <p className="text-sm">{text}</p>
        <p className="text-xs text-gray-400 mt-1">{subText}</p>
      </div>
    </div>
  )
}

export default Page