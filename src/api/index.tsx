// // src/api/index.tsx
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const vmsApi = createApi({
//   reducerPath: 'vmsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://192.168.1.9:3000/api/',
//   }),
//   tagTypes: ['Visitor', 'Security', 'Admin', 'Notify'],
//   endpoints: (builder) => ({
//     // Login
//     loginUser: builder.mutation({
//       query: (credentials) => {
//         console.log('Login Request:', credentials);
//         return {
//           url: 'login',
//           method: 'POST',
//           body: credentials,
//         };
//       },
//     }),

//     // Create Security
//     createSecurity: builder.mutation({
//       query: (data) => {
//         console.log('Create Security:', data);
//         return {
//           url: 'createSecurity',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Security'],
//     }),

//     // Get All Security
//     getAllSecurity: builder.query({
//       query: () => {
//         console.log('Fetching All Security');
//         return 'allsecurity';
//       },
//       providesTags: ['Security'],
//     }),

//     // Create Visitor
//     createVisitor: builder.mutation({
//       query: (data) => {
//         console.log('Create Visitor:', data);
//         return {
//           url: 'createVisitor',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Visitor'],
//     }),

//     // Get Visitors with Pagination
//     getVisitors: builder.query({
//       query: ({ page = 0, limit = 10 }) => {
//         console.log('Get Visitors:', { page, limit });
//         return `visitors?page=${page}&limit=${limit}`;
//       },
//       providesTags: ['Visitor'],
//     }),

//     // Visitor Stats
//     getVisitorStats: builder.query({
//       query: () => {
//         console.log('Fetching Visitor Stats');
//         return 'visitor/stats';
//       },
//     }),

//     // Day-wise Graph
//     getDayGraph: builder.query({
//       query: () => {
//         console.log('Fetching Day Graph');
//         return 'visitor/daygraph';
//       },
//     }),

//     // Purpose-wise Graph
//     getPurposeGraph: builder.query({
//       query: () => {
//         console.log('Fetching Purpose Graph');
//         return 'visitor/purposegraph';
//       },
//     }),

//     // Filter Visitors by Date
//     filterVisitorsByDate: builder.mutation({
//       query: (dates) => {
//         console.log('Filter Visitors by Date:', dates);
//         return {
//           url: 'visitor/filterdate',
//           method: 'POST',
//           body: dates,
//         };
//       },
//     }),

//     // Create Admin
//     createAdmin: builder.mutation({
//       query: (data) => {
//         console.log('Create Admin:', data);
//         return {
//           url: 'createAdmin',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Admin'],
//     }),

//     // Notifications (Get All)
//     getNotifications: builder.query({
//       query: () => {
//         console.log('Fetching Notifications');
//         return 'getallnotify';
//       },
//       providesTags: ['Notify'],
//     }),

//     // Reset Action
//     resetApp: builder.mutation({
//       query: () => {
//         console.log('Resetting App');
//         return {
//           url: 'reset',
//           method: 'POST',
//         };
//       },
//     }),

//     // Delete Security
//     deleteSecurity: builder.mutation({
//       query: (id) => {
//         console.log('Deleting Security:', id);
//         return {
//           url: `deleteSecurity/${id}`,
//           method: 'DELETE',
//         };
//       },
//       invalidatesTags: ['Security'],
//     }),

//     // Delete Admin
//     deleteAdmin: builder.mutation({
//       query: (id) => {
//         console.log('Deleting Admin:', id);
//         return {
//           url: `deleteadmin/${id}`,
//           method: 'DELETE',
//         };
//       },
//       invalidatesTags: ['Admin'],
//     }),
//   }),
// });

// export const {
//   useLoginUserMutation,
//   useCreateSecurityMutation,
//   useGetAllSecurityQuery,
//   useCreateVisitorMutation,
//   useGetVisitorsQuery,
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
//   useFilterVisitorsByDateMutation,
//   useCreateAdminMutation,
//   useGetNotificationsQuery,
//   useResetAppMutation,
//   useDeleteSecurityMutation,
//   useDeleteAdminMutation,
// } = vmsApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const vmsApi = createApi({
//   reducerPath: 'vmsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://192.168.1.9:3000/api/',
//   }),
//   tagTypes: ['Visitor', 'Security', 'Admin', 'Notify'],
//   endpoints: (builder) => ({

//     // Login
//     loginUser: builder.mutation({
//       query: (credentials) => {
//         console.log('Login Request:', credentials);
//         return {
//           url: 'login',
//           method: 'POST',
//           body: credentials,
//         };
//       },
//     }),

//     // Create Security
//     createSecurity: builder.mutation({
//       query: (data) => {
//         console.log('Create Security:', data);
//         return {
//           url: 'createSecurity',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Security'],
//     }),

//     // Get All Security
//     getAllSecurity: builder.query({
//       query: () => {
//         console.log('Fetching All Security');
//         return 'allsecurity';
//       },
//       providesTags: ['Security'],
//     }),

//     // Create Visitor
//     createVisitor: builder.mutation({
//       query: (data) => {
//         console.log('Create Visitor:', data);
//         return {
//           url: 'createVisitor',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Visitor'],
//     }),

//     // Get Visitors with Pagination
//     getVisitors: builder.query({
//       query: ({ page = 0, limit = 10 }) => {
//         console.log('Get Visitors:', { page, limit });
//         return `visitors?page=${page}&limit=${limit}`;
//       },
//       providesTags: ['Visitor'],
//     }),

//     // Visitor Stats (with optional branch)
//     getVisitorStats: builder.query({
//       query: (branch) => {
//         console.log('Fetching Visitor Stats for:', branch);
//         const param = branch && branch !== 'All' ? `?branch=${encodeURIComponent(branch)}` : '';
//         return `visitor/stats${param}`;
//       },
//     }),

//     // Day-wise Graph (with optional branch)
//     getDayGraph: builder.query({
//       query: (branch) => {
//         console.log('Fetching Day Graph for:', branch);
//         const param = branch && branch !== 'All' ? `?branch=${encodeURIComponent(branch)}` : '';
//         return `visitor/daygraph${param}`;
//       },
//     }),

//     // Purpose-wise Graph (with optional branch)
//     getPurposeGraph: builder.query({
//       query: (branch) => {
//         console.log('Fetching Purpose Graph for:', branch);
//         const param = branch && branch !== 'All' ? `?branch=${encodeURIComponent(branch)}` : '';
//         return `visitor/purposegraph${param}`;
//       },
//     }),

//     // Filter Visitors by Date
//     filterVisitorsByDate: builder.mutation({
//       query: (dates) => {
//         console.log('Filter Visitors by Date:', dates);
//         return {
//           url: 'visitor/filterdate',
//           method: 'POST',
//           body: dates,
//         };
//       },
//     }),

//     // Create Admin
//     createAdmin: builder.mutation({
//       query: (data) => {
//         console.log('Create Admin:', data);
//         return {
//           url: 'createAdmin',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Admin'],
//     }),

//     // Notifications (Get All)
//     getNotifications: builder.query({
//       query: () => {
//         console.log('Fetching Notifications');
//         return 'getallnotify';
//       },
//       providesTags: ['Notify'],
//     }),

//     // Reset Action
//     resetApp: builder.mutation({
//       query: () => {
//         console.log('Resetting App');
//         return {
//           url: 'reset',
//           method: 'POST',
//         };
//       },
//     }),

//     // Delete Security
//     deleteSecurity: builder.mutation({
//       query: (id) => {
//         console.log('Deleting Security:', id);
//         return {
//           url: `deleteSecurity/${id}`,
//           method: 'DELETE',
//         };
//       },
//       invalidatesTags: ['Security'],
//     }),

//     // Delete Admin
//     deleteAdmin: builder.mutation({
//       query: (id) => {
//         console.log('Deleting Admin:', id);
//         return {
//           url: `deleteadmin/${id}`,
//           method: 'DELETE',
//         };
//       },
//       invalidatesTags: ['Admin'],
//     }),
//   }),
// });

// export const {
//   useLoginUserMutation,
//   useCreateSecurityMutation,
//   useGetAllSecurityQuery,
//   useCreateVisitorMutation,
//   useGetVisitorsQuery,
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
//   useFilterVisitorsByDateMutation,
//   useCreateAdminMutation,
//   useGetNotificationsQuery,
//   useResetAppMutation,
//   useDeleteSecurityMutation,
//   useDeleteAdminMutation,
// } = vmsApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const vmsApi = createApi({
//   reducerPath: 'vmsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://gatevue-backend.onrender.com/api',
//   }),
//   tagTypes: ['Visitor', 'Security', 'Admin', 'Notify'],
//   endpoints: (builder) => ({
//     // Login
//     loginUser: builder.mutation({
//       query: (credentials) => {
//         console.log('Login Request:', credentials);
//         return {
//           url: 'login',
//           method: 'POST',
//           body: credentials,
//         };
//       },
//     }),

//     // Create Security
//     createSecurity: builder.mutation({
//       query: (data) => {
//         console.log('Create Security:', data);
//         return {
//           url: 'createSecurity',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Security'],
//     }),

//     // Get All Security
//     getAllSecurity: builder.query({
//       query: () => {
//         console.log('Fetching All Security');
//         return 'allsecurity';
//       },
//       providesTags: ['Security'],
//     }),

//     // Create Visitor
//     createVisitor: builder.mutation({
//       query: (data) => {
//         console.log('Create Visitor:', data);
//         return {
//           url: 'createVisitor',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Visitor'],
//     }),

//     // Get Visitors with Pagination
//     getVisitors: builder.query({
//       query: ({ page = 0, limit = 10 }) => {
//         console.log('Get Visitors:', { page, limit });
//         return `visitors?page=${page}&limit=${limit}`;
//       },
//       providesTags: ['Visitor'],
//     }),

//     // ✅ Get Visitors by Branch (new)
//     getVisitorsByBranch: builder.query({
//       query: ({ branch, date }) => {
//         const queryParams = new URLSearchParams();
//         if (branch && branch !== 'All') {
//           queryParams.append('branch', branch);
//         }
//         if (date) {
//           queryParams.append('date', date);
//         }
//         console.log('Fetching Visitors by Branch:', queryParams.toString());
//         return `visitors?${queryParams.toString()}`;
//       },
//       providesTags: ['Visitor'],
//     }),

//     // Visitor Stats (with optional branch)
//     getVisitorStats: builder.query({
//       query: (branch) => {
//         console.log('Fetching Visitor Stats for:', branch);
//         const param = branch && branch !== 'All' ? `?branch=${encodeURIComponent(branch)}` : '';
//         return `visitor/stats${param}`;
//       },
//     }),

//     // Day-wise Graph (with optional branch)
//     getDayGraph: builder.query({
//       query: (branch) => {
//         console.log('Fetching Day Graph for:', branch);
//         const param = branch && branch !== 'All' ? `?branch=${encodeURIComponent(branch)}` : '';
//         return `visitor/daygraph${param}`;
//       },
//     }),

//     // Purpose-wise Graph (with optional branch)
//     getPurposeGraph: builder.query({
//       query: (branch) => {
//         console.log('Fetching Purpose Graph for:', branch);
//         const param = branch && branch !== 'All' ? `?branch=${encodeURIComponent(branch)}` : '';
//         return `visitor/purposegraph${param}`;
//       },
//     }),

//     // Filter Visitors by Date
//     filterVisitorsByDate: builder.mutation({
//       query: (dates) => {
//         console.log('Filter Visitors by Date:', dates);
//         return {
//           url: 'visitor/filterdate',
//           method: 'POST',
//           body: dates,
//         };
//       },
//     }),

//     // Create Admin
//     createAdmin: builder.mutation({
//       query: (data) => {
//         console.log('Create Admin:', data);
//         return {
//           url: 'createAdmin',
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['Admin'],
//     }),

//     // Notifications (Get All)
//     getNotifications: builder.query({
//       query: () => {
//         console.log('Fetching Notifications');
//         return 'getallnotify';
//       },
//       providesTags: ['Notify'],
//     }),

//     // Reset Action
//     resetApp: builder.mutation({
//       query: () => {
//         console.log('Resetting App');
//         return {
//           url: 'reset',
//           method: 'POST',
//         };
//       },
//     }),

//     // Delete Security
//     deleteSecurity: builder.mutation({
//       query: (id) => {
//         console.log('Deleting Security:', id);
//         return {
//           url: `deleteSecurity/${id}`,
//           method: 'DELETE',
//         };
//       },
//       invalidatesTags: ['Security'],
//     }),

//     // Delete Admin
//     deleteAdmin: builder.mutation({
//       query: (id) => {
//         console.log('Deleting Admin:', id);
//         return {
//           url: `deleteadmin/${id}`,
//           method: 'DELETE',
//         };
//       },
//       invalidatesTags: ['Admin'],
//     }),
//   }),
// });

// // ✅ Export hooks
// export const {
//   useLoginUserMutation,
//   useCreateSecurityMutation,
//   useGetAllSecurityQuery,
//   useCreateVisitorMutation,
//   useGetVisitorsQuery,
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
//   useFilterVisitorsByDateMutation,
//   useCreateAdminMutation,
//   useGetNotificationsQuery,
//   useResetAppMutation,
//   useDeleteSecurityMutation,
//   useDeleteAdminMutation,
//   useGetVisitorsByBranchQuery, // ✅ Exported new hook
// } = vmsApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const vmsApi = createApi({
//   reducerPath: 'vmsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://gatevue-backend.onrender.com/api',
//   }),
//   tagTypes: ['Visitor', 'Security', 'Admin', 'Notify'],
//   endpoints: builder => ({
//     // Login
//     //
//     loginUser: builder.mutation({
//       query: credentials => {
//         // console.log('🔐 Sending login credentials:', credentials);
//         return {
//           url: 'login',
//           method: 'POST',
//           body: credentials,
//         };
//       },
//     }),

//     // Create Security
//     createSecurity: builder.mutation({
//       query: data => ({
//         url: 'createSecurity',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Security'],
//     }),

//     // Get All Security
//     getAllSecurity: builder.query({
//       query: () => 'allsecurity',
//       providesTags: ['Security'],
//     }),

//     // Create Visitor
//     createVisitor: builder.mutation({
//       query: data => ({
//         url: 'createVisitor',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Visitor'],
//     }),

//     // Get Visitors with Pagination
//     getVisitors: builder.query({
//       query: ({ page = 0, limit = 10 }) =>
//         `visitors?page=${page}&limit=${limit}`,
//       providesTags: ['Visitor'],
//     }),

//     // ✅ Get Visitors by Branch and Date
//     // getVisitorsByBranch: builder.query({
//     //   query: ({ branch, date }) => {
//     //     const params = new URLSearchParams();
//     //     if (branch && branch !== 'All') params.append('branch', branch);
//     //     if (date) params.append('date', date);
//     //     return `visitors?${params.toString()}`;
//     //   },
//     //   providesTags: ['Visitor'],
//     // }),
//     getVisitorsByBranch: builder.query({
//       query: ({ branch, date }) => {
//         const params = new URLSearchParams();
//         if (branch && branch !== 'All') params.append('branch', branch);
//         if (date) params.append('date', date);

//         const queryStr = `visitors?${params.toString()}`;
//         console.log('🔍 getVisitorsByBranch →', branch); // ✅ Debug log
//         return queryStr;
//       },
//       providesTags: ['Visitor'],
//     }),

//     // Visitor Stats (optional branch)
//     getVisitorStats: builder.query({
//       query: branch => {
//         const param =
//           branch && branch !== 'All'
//             ? `?branch=${encodeURIComponent(branch)}`
//             : '';
//         return `visitor/stats${param}`;
//       },
//     }),

//     // Day-wise Graph
//     getDayGraph: builder.query({
//       query: branch => {
//         const param =
//           branch && branch !== 'All'
//             ? `?branch=${encodeURIComponent(branch)}`
//             : '';
//         return `visitor/daygraph${param}`;
//       },
//     }),

//     // Purpose-wise Graph
//     getPurposeGraph: builder.query({
//       query: branch => {
//         const param =
//           branch && branch !== 'All'
//             ? `?branch=${encodeURIComponent(branch)}`
//             : '';
//         return `visitor/purposegraph${param}`;
//       },
//     }),

//     // Filter Visitors by Date
//     filterVisitorsByDate: builder.mutation({
//       query: dates => ({
//         url: 'visitor/filterdate',
//         method: 'POST',
//         body: dates,
//       }),
//     }),

//     // Create Admin
//     createAdmin: builder.mutation({
//       query: data => ({
//         url: 'createAdmin',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Admin'],
//     }),

//     // ✅ Optional: Get All Admins
//     getAllAdmins: builder.query({
//       query: () => 'allAdmin',
//       providesTags: ['Admin'],
//     }),

//     // Notifications
//     getNotifications: builder.query({
//       query: () => 'getallnotify',
//       providesTags: ['Notify'],
//     }),

//     // Reset App
//     resetApp: builder.mutation({
//       query: () => ({
//         url: 'reset',
//         method: 'POST',
//       }),
//     }),

//     // Delete Security
//     deleteSecurity: builder.mutation({
//       query: id => ({
//         url: `deleteSecurity/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Security'],
//     }),

//     // Delete Admin
//     deleteAdmin: builder.mutation({
//       query: id => ({
//         url: `deleteadmin/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Admin'],
//     }),
//   }),
// });

// export const {
//   useLoginUserMutation,
//   useCreateSecurityMutation,
//   useGetAllSecurityQuery,
//   useCreateVisitorMutation,
//   useGetVisitorsQuery,
//   useGetVisitorsByBranchQuery, // ✅ new
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
//   useFilterVisitorsByDateMutation,
//   useCreateAdminMutation,
//   useGetAllAdminsQuery, // ✅ new
//   useGetNotificationsQuery,
//   useResetAppMutation,
//   useDeleteSecurityMutation,
//   useDeleteAdminMutation,
// } = vmsApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const vmsApi = createApi({
  reducerPath: 'vmsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gatevue-backend.onrender.com/api',
    prepareHeaders: async (headers) => {
      // 🔐 Attach token from AsyncStorage to every request if available
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('🔐 Attaching token:', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Visitor', 'Security', 'Admin', 'Notify'],
  endpoints: builder => ({
    // 🔐 Login user (admin/security/superadmin)
    loginUser: builder.mutation({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // ➕ Create a new security user
    createSecurity: builder.mutation({
      query: data => ({
        url: 'createSecurity',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Security'],
    }),

    // 📥 Get all security users
    getAllSecurity: builder.query({
      query: () => 'allsecurity',
      providesTags: ['Security'],
    }),

    // ➕ Create a new visitor entry
    createVisitor: builder.mutation({
      query: data => ({
        url: 'createVisitor',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Visitor'],
    }),

    // 📄 Get paginated list of visitors (used in infinite scroll)
    getVisitors: builder.query({
      query: ({ page = 0, limit = 10 }) =>
        `visitors?page=${page}&limit=${limit}`,
      providesTags: ['Visitor'],
    }),

    // 🔍 Get visitors by selected branch and date
    getVisitorsByBranch: builder.query({
      query: ({ branch, date }) => {
        const params = new URLSearchParams();
        if (branch && branch !== 'All') params.append('branch', branch);
        if (date) params.append('date', date);

        const queryStr = `visitors?${params.toString()}`;
        console.log('🔍 getVisitorsByBranch →', branch);
        return queryStr;
      },
      providesTags: ['Visitor'],
    }),

    // 📊 Get dashboard stats for a branch
    getVisitorStats: builder.query({
      query: branch => {
        const param =
          branch && branch !== 'All'
            ? `?branch=${encodeURIComponent(branch)}`
            : '';
        return `visitor/stats${param}`;
      },
    }),

    // 📈 Get day-wise graph data for visitors
    getDayGraph: builder.query({
      query: branch => {
        const param =
          branch && branch !== 'All'
            ? `?branch=${encodeURIComponent(branch)}`
            : '';
        return `visitor/daygraph${param}`;
      },
    }),

    // 📌 Get purpose-wise graph data for visitors
    getPurposeGraph: builder.query({
      query: branch => {
        const param =
          branch && branch !== 'All'
            ? `?branch=${encodeURIComponent(branch)}`
            : '';
        return `visitor/purposegraph${param}`;
      },
    }),

    // 📅 Filter visitors by date range (used in reports)
    filterVisitorsByDate: builder.mutation({
      query: dates => ({
        url: 'visitor/filterdate',
        method: 'POST',
        body: dates,
      }),
    }),

    // ➕ Create a new admin user
    createAdmin: builder.mutation({
      query: data => ({
        url: 'createAdmin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),

    // 📥 Get all admin users
    getAllAdmins: builder.query({
      query: () => 'allAdmin',
      providesTags: ['Admin'],
    }),

    // 🔔 Get all notifications
    getNotifications: builder.query({
      query: () => 'getallnotify',
      providesTags: ['Notify'],
    }),

    // ⚠️ Reset the entire app (reset backend state)
    resetApp: builder.mutation({
      query: () => ({
        url: 'reset',
        method: 'POST',
      }),
    }),

    // ❌ Delete a specific security user
    deleteSecurity: builder.mutation({
      query: id => ({
        url: `deleteSecurity/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Security'],
    }),

    // ❌ Delete a specific admin user
    deleteAdmin: builder.mutation({
      query: id => ({
        url: `deleteadmin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});

// 🔽 Export auto-generated hooks for each endpoint
export const {
  useLoginUserMutation,
  useCreateSecurityMutation,
  useGetAllSecurityQuery,
  useCreateVisitorMutation,
  useGetVisitorsQuery,
  useGetVisitorsByBranchQuery,
  useGetVisitorStatsQuery,
  useGetDayGraphQuery,
  useGetPurposeGraphQuery,
  useFilterVisitorsByDateMutation,
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetNotificationsQuery,
  useResetAppMutation,
  useDeleteSecurityMutation,
  useDeleteAdminMutation,
} = vmsApi;
