'use client';

import React, { useEffect, useState } from 'react';
import { useGetTasksQuery, useAddTaskMutation, useGetObjectivesQuery } from '@/redux/features/tasksApiSlice';
import { selectCurrentTask ,setCurrentTask } from '@/redux/features/tasksSlice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const Page: React.FC = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const dispatch = useDispatch();


  const { 
    data: tasks, 
    error: tasksError, 
    isLoading: tasksLoading 
  } = useGetTasksQuery();

  const [
    addTask, 
    { data: addTaskResponse, isLoading: addTaskLoading, isSuccess: addTaskSuccess, error: addTaskError }
  ] = useAddTaskMutation();

  const { 
    data: objectives, 
    error: objectivesError, 
    isLoading: objectivesLoading 
  } = useGetObjectivesQuery(addTaskResponse?.sessionId, { skip: !addTaskResponse?.sessionId });

  useEffect(() => {
    if (addTaskSuccess && objectives) {
      console.log('New task added:', addTaskResponse);
      router.push(`/browse/${addTaskResponse.sessionId}`);

    }
  }, [addTaskSuccess, objectives, addTaskResponse]);

  const handleAddTask = () => {
    if (prompt.trim()) {
      addTask({ objective: prompt });
      setPrompt('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <header className="flex justify-between items-center mb-16">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">autosurf.ai</span>
          <span className="text-gray-400">//user automations</span>
        </div>
        <button className="bg-blue-700 px-4 py-2 rounded-full text-sm">Use via API</button>
      </header>

      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Enter a goal for the browser agent.</h1>

        <div className="bg-white rounded-lg mb-4 text-black">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write prompt here"
            className="w-full bg-transparent outline-none p-2"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg p-2 mb-8">
          <div className="flex items-center space-x-2">
            <div 
              className={`w-10 h-6 rounded-full p-1 cursor-pointer ${isPublic ? 'bg-blue-800' : 'bg-gray-600'}`}
              onClick={() => setIsPublic(!isPublic)}
            >
              <div className={`w-4 h-4 rounded-full bg-white transform duration-300 ease-in-out ${isPublic ? 'translate-x-4' : ''}`} />
            </div>
            <span>Public</span>
          </div>
          {addTaskLoading ? (
            <div role="status" className="animate-spin">
              {/* ... (spinner SVG) ... */}
            </div>
          ) : (
            <button 
              className="text-blue-400 disabled:opacity-50" 
              onClick={handleAddTask} 
              disabled={!prompt.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex space-x-4 mb-8">
          <button className="text-blue-400 border-b-2 border-blue-400 pb-1">RECENT RUNS</button>
        </div>

        <div className="space-y-2">
          {tasksLoading && <div className="text-center">Loading tasks...</div>}
          {tasksError && <div className="text-center text-red-500">Error: {tasksError.message}</div>}
          {tasks && tasks.map((task: any) => (
            <div key={task.id} className="bg-white text-black rounded-lg p-3 text-sm">
              {task.objective}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;