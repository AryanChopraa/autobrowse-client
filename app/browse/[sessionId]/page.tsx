"use client"
import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetObjectivesQuery } from '@/redux/features/tasksApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { env } from 'process';

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

const STARTING_SCENE_URL = "https://spaces.autosurf.tech/static/starting_scene/startingscene.png";

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div>
);

const Page = () => {
  console.log('Initializing Page component');
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
    isError,
    error,
    isLoading
  } = useGetObjectivesQuery(sessionId, { skip: !sessionId });

  useEffect(() => {
    console.log('Entering main useEffect hook');
    if (isSuccess && data) {
      console.log('Data fetched successfully:', data);
      setObjective(data.objective);

      const ws = new WebSocket("ws://localhost:8080/ws/chat/");
    
      ws.onopen = () => {
        console.log('WebSocket connected successfully');
        ws.send(JSON.stringify({ objective: data.objective }));
        console.log('Sent objective to WebSocket:', data.objective);
      };

      ws.onmessage = (event) => {
        console.log('Received message from WebSocket:', event.data);
        const data = JSON.parse(event.data);
        if (data.explanation && data.action) {
          console.log('Updating steps with new data:', data);
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
          console.log('Updating screenshot');
          setScreenshot(data.screenshot);
        }
        if (data.final_response) {
          console.log('Received final response:', data.final_response);
          setFinalResponse(data.final_response);
          console.log('Setting dialog to show in 4 seconds');
          setTimeout(() => setShowDialog(true), 4000);
        }
      };

      setSocket(ws);

      return () => {
        console.log('Closing WebSocket connection');
        ws.close();
      };
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.error('Error occurred while fetching objective:', error);
      toast.error('An error occurred while fetching the objective. Redirecting to tasks page.');
      console.log('Redirecting to tasks page in 3 seconds');
      setTimeout(() => router.push('/tasks'), 3000);
    }
  }, [isError, router, error]);

  const handleRunAnotherSession = () => {
    console.log('Running another session, redirecting to tasks page');
    router.push('/tasks');
  };

  if (isLoading) {
    console.log('Data is still loading, showing spinner');
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <Spinner />
      </div>
    );
  }

  console.log('Rendering main component');
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen bg-slate-900"><Spinner /></div>}>
      <div className="flex flex-col md:flex-row text-white pt-24 px-4 md:px-6">
        <ToastContainer />
        
        <div className="w-full md:w-3/4 p-4 overflow-hidden bg-slate-900 rounded-2xl mb-6 md:mb-0 md:mr-6">
          <div className="flex flex-col justify-between mx-2 mb-4">
            <h2 className="text-xs font-semibold uppercase text-gray-400">OBJECTIVE</h2>
            {!objective ? (
              <div className="flex items-center">
                <Spinner />
                <span className="text-md font-light ml-2">Loading objective...</span>
              </div>
            ) : (
              <h2 className="text-md font-light">{objective}</h2>
            )}
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={screenshot ? `data:image/jpeg;base64,${screenshot}` : STARTING_SCENE_URL}
              alt={screenshot ? "Current Screenshot" : "Starting Scene"}
              className="w-full h-auto"
              style={{ objectFit: 'contain', maxHeight: '600px' }}
            />
          </div>
        </div>

        <div className="w-full md:w-1/4 bg-gray-900 rounded-2xl p-4 overflow-y-auto" style={{maxHeight: '100vh'}}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold text-gray-400">STEPS</h2>
            <span className="text-green-400 text-xs font-bold">
              {finalResponse ? 'COMPLETED' : 'IN PROGRESS'}
            </span>
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
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-sm font-semibold mb-2 uppercase ">Final Response</h3>
              <p className="text-xs text-gray-300">{finalResponse}</p>
            </div>
          )}
        </div>

        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
            <div className="bg-gray-900 text-white p-8 rounded-lg max-w-2xl w-full mx-4 relative">
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
                onClick={() => setShowDialog(false)}
              >
                &times;
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-6">Run Successful</h2>
                <p className="text-gray-300 mb-8 w-full">{finalResponse}</p>
                <button 
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-lg w-full max-w-md"
                  onClick={handleRunAnotherSession}
                >
                  Run another session
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Suspense>
  );
};

interface StepItemProps {
  number: number;
  explanation: string;
  action: string;
  completed: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ number, explanation, action, completed }) => {
  console.log(`Rendering StepItem ${number}, completed: ${completed}`);
  return (
    <div className="flex items-start">
      <div className={`w-3 h-3 rounded-full flex items-center justify-center mr-2 p-3 ${completed ? 'bg-green-500' : 'bg-gray-700'}`}>
        {completed ? '✓' : number}
      </div>
      <div>
        <p className="text-sm font-semibold">Explanation:</p>
        <p className="text-xs text-gray-400 mt-1 mb-2">{explanation}</p>
        <p className="text-sm font-semibold">Action:</p>
        <p className="text-xs text-gray-400 mt-1">{action}</p>
      </div>
    </div>
  );
};

export default Page;