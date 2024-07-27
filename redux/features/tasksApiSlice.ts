import { apiSlice } from "../services/apiSlice";

const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/fetch_all_tasks/",
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/create_tasks/",
        method: "POST",
        body: task,
      }),
    }),
    getObjectives: builder.query({
      query: (sessionId) => `/fetch_task/${sessionId}/`
    }),
    deleteTask: builder.mutation({
      query: (sessionId) => ({
        url: `/delete_tasks/${sessionId}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { 
  useGetTasksQuery, 
  useAddTaskMutation, 
  useGetObjectivesQuery,
  useDeleteTaskMutation
} = tasksApiSlice;