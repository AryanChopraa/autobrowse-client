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
      
    })
  }),
});


export const { useGetTasksQuery , useAddTaskMutation , useGetObjectivesQuery} = tasksApiSlice

