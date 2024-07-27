'use client';
import React, { useEffect, useState } from 'react';
import { useGetTasksQuery, useAddTaskMutation, useGetObjectivesQuery, useDeleteTaskMutation } from '@/redux/features/tasksApiSlice';
import { selectCurrentTask, setCurrentTask } from '@/redux/features/tasksSlice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Page: React.FC = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const dispatch = useDispatch();
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const { 
    data: tasks, 
    error: tasksError, 
    isLoading: tasksLoading,
    refetch: refetchTasks
  } = useGetTasksQuery({});

  const [
    addTask, 
    { data: addTaskResponse, isLoading: addTaskLoading, isSuccess: addTaskSuccess, error: addTaskError }
  ] = useAddTaskMutation();

  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

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

  const handleDeleteTask = (sessionId: string) => {
    setTaskToDelete(sessionId);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      try {
        await deleteTask(taskToDelete).unwrap();
        toast.success('Task deleted successfully');
        await refetchTasks();
      } catch (error) {
        toast.error('Failed to delete task. Please try again.');
        console.error('Delete task error:', error);
      } finally {
        setTaskToDelete(null);
      }
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
            className="w-full bg-gray-900 outline-none px-10 py-6 rounded-full"
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
            <div key={task.session_id} className="bg-gray-900 hover:shadow-lg hover:shadow-blue-900 transition-shadow duration-300 p-10 py-10 rounded-2xl w-full cursor-pointer relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.session_id);
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                disabled={isDeleting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <div onClick={() => router.push(`/browse/${task.session_id}`)}>
                <div className='flex justify-between flex-row text-zinc-300 text-[12px] mb-5 font-mono'>
                  <div>Session Id: {task.session_id}</div>
                  <div>{task.created_on}</div>
                </div>
                <div className='text-zinc-200 text-sm'><div className='text-gray-500  text-xs mb-1'>OBJECTIVE </div>  {task.objective}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-10 rounded-xl">
            <p className="mb-6">Are you sure you want to delete this task?</p>
            <div className="flex justify-around space-x-2">
              {isDeleting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <button onClick={() => setTaskToDelete(null)} className="px-4 py-2 bg-gray-600 hover:bg-slate-700 rounded-2xl">Cancel</button>
                  <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-2xl">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Page;