'use client';
const page = () => {
    const handleClick = () => {
      // Add task handler logic here
    };
  
    return (
      <div className="flex flex-col p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Saved Tasks</h1>
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add new task
          </button>
        </div>
  
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
  
  export default page;
  