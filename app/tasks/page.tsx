'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const Page = () => {
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState('');
    const router = useRouter();

  
    const handleOpenForm = () => {
      setShowForm(true);
    };
  
    const handleCloseForm = () => {
      setShowForm(false);
      setNewTask('');
    };
  
    const handleStartTask = () => {
      if (newTask) {
        // Redirect to another page, e.g., /task/[taskName]
        router.push(`/tasks/browse?name=${newTask}`);
      }
    };
  
    return (
      <div className="flex flex-col p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Saved Tasks</h1>
          <button
            onClick={handleOpenForm}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add new task
          </button>
        </div>
  
        {showForm && (
          <div className="mb-4 p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-4">New Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task name"
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleStartTask}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Start
              </button>
              <button
                onClick={handleCloseForm}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
  
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold">Saved Task 1</h2>
            <p>Description for Task 1</p>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold">Saved Task 2</h2>
            <p>Description for Task 2</p>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold">Saved Task 3</h2>
            <p>Description for Task 3</p>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold">Saved Task 4</h2>
            <p>Description for Task 4</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Page;