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
  } = useGetTasksQuery({});

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 pt-24">


      <main className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-semibold mb-7 text-center">Enter a goal for your browser agent.</h1>

        <div className="rounded-lg mb-4 text-white">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write prompt here"
            className="w-full bg-gray-900 outline-none  px-10 py-6 rounded-full"
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
              className="text-blue-400 disabled:opacity-50 hover:text-blue-600" 
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
        

        <div className="space-y-4">
          {tasksLoading && <div className="text-center">Loading past runs...</div>}
          {tasksError && (
            <div className="text-center text-red-500">
              Error: {('message' in tasksError) ? tasksError.message : 'An error occurred'}
            </div>
          )}
          {tasks && tasks.map((task: any) => ( 
            <div key={task.session_id} className="bg-gray-900 hover:shadow-lg hover:shadow-blue-900 transition-shadow duration-300 p-10 py-6 rounded-2xl w-full cursor-pointer" onClick={() => router.push(`/browse/${task.session_id}`)}>

             
              <div className='flex justify-between flex-row text-zinc-300 text-[12px] mb-5 font-mono'>
                <div>Session Id:{task.session_id}</div>
                <div>{task.created_on}</div>
              </div>
              <div className='text-zinc-200 text-sm'><div className='text-gray-500  text-xs mb-1'>OBJECTIVE </div>  {task.objective}</div>
            </div>
          ))}
        </div>
    
      </main>
    </div>
  );
};

export default Page;