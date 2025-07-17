import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const vmsApi = createApi({
  reducerPath: 'vmsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gatevue-backend.onrender.com/api',
    prepareHeaders: async headers => {
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
      query: data => {
        console.log('🔐 Creating security user with data:', data);
        return {
          url: 'createSecurity',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Security'],
    }),

    // 📥 Get all security users
    getAllSecurity: builder.query({
      query: () => 'allsecurity',
      providesTags: ['Security'],
    }),

    // ➕ Create a new visitor entry

    createVisitor: builder.mutation({
      query: formData => ({
        url: 'visitor/create',
        method: 'POST',
        body: formData,
        formData: true, // Optional for clarity (some tools support it)
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Visitor'],
    }),

    updateVisitor: builder.mutation({
      query: ({ id, badgeNumber, status }) => {
        const body = { badgeNumber, status };

        // console.log('🛠️ updateVisitor → ID:', id);
        // console.log('📦 Payload:', body);
        // console.log('📡 PATCH → visitors/' + id);

        return {
          url: `visitor/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['Visitor'],
    }),

    // 📄 Get paginated list of visitors (used in infinite scroll)
    getVisitors: builder.query({
      query: ({ page = 0, limit = 30 }) =>
        `visitors?page=${page}&limit=${limit}`,
      providesTags: ['Visitor'],
    }),

    // 🔍 Get visitors by selected branch and date
    getVisitorsByBranch: builder.query({
      query: ({ officeLocation, date }) => {
        const params = new URLSearchParams();
        if (officeLocation && officeLocation !== 'All') {
          params.append('officeLocation', officeLocation);
        }
        if (date) {
          params.append('date', date);
        }

        const queryStr = `visitors?${params.toString()}`;
        console.log('🔍 API Query:', queryStr);
        return queryStr;
      },
      providesTags: ['Visitor'],
    }),

    // 📊 Get dashboard stats for a branch
    getVisitorStats: builder.query({
      query: ({ branch, range }) => {
        const params = new URLSearchParams();
        if (branch && branch !== 'All') params.append('branch', branch);
        if (range && range !== 'present') params.append('range', range);
        return `visitor/stats?${params.toString()}`;
      },
    }),
    // getVisitorStats: builder.query({
    //   query: branch => {
    //     const param =
    //       branch && branch !== 'All'
    //         ? `?branch=${encodeURIComponent(branch)}`
    //         : '';

    //     const queryStr = `visitor/stats${param}`;

    //     // ✅ Debug log
    //     console.log('📊 [getVisitorStats] Query:', { branch, queryStr });

    //     return queryStr;
    //   },
    // }),

    // 📈 Get day-wise graph data for visitors
    getDayGraph: builder.query({
      query: ({ branch, range }) => {
        const params = new URLSearchParams();
        if (branch && branch !== 'All') params.append('branch', branch);
        if (range && range !== 'present') params.append('range', range);
        return `visitor/daygraph?${params.toString()}`;
      },
    }),

    // 📌 Get purpose-wise graph data for visitors
    getPurposeGraph: builder.query({
      query: ({ branch, range }) => {
        const params = new URLSearchParams();
        if (branch && branch !== 'All') params.append('branch', branch);
        if (range && range !== 'present') params.append('range', range);
        return `visitor/purposegraph?${params.toString()}`;
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

    getAllAdmins: builder.query({
      query: () => 'allAdmin',
      transformResponse: (response: any) => response.response, // ✅ extract inner array
      providesTags: ['Admin'],
    }),

    // 🔔 Get all notifications
    getNotifications: builder.query({
      query: () => 'getallnotify',
      providesTags: ['Notify'],
    }),

    // ⚠️ Reset the entire app (reset backend state)
    resetApp: builder.mutation({
      query: credentials => {
        console.log('🔐 Reset Password Payload:', credentials);
        return {
          url: 'reset',
          method: 'POST',
          body: credentials,
        };
      },
    }),

    deleteSecurity: builder.mutation({
      query: (employeeId: string) => ({
        url: 'deleteSecurity',
        method: 'DELETE',
        body: { employeeId },
      }),
      invalidatesTags: ['Security'],
    }),

    // ❌ Delete a specific admin user

    deleteAdmin: builder.mutation({
      query: (employeeId: string) => ({
        url: 'deleteadmin',
        method: 'DELETE',
        body: { employeeId },
      }),
      invalidatesTags: ['Admin'],
    }),

    notifyForgotPassword: builder.mutation({
      query: ({ employeeId, officeLocation }) => ({
        url: 'notify',
        method: 'POST',
        body: {
          employeeId,
          officeLocation,
        },
      }),
    }),
  }),
});

// 🔽 Export auto-generated hooks for each endpoint
export const {
  useLoginUserMutation,
  useCreateSecurityMutation,
  useGetAllSecurityQuery,
  useCreateVisitorMutation,
  useUpdateVisitorMutation,
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
  useNotifyForgotPasswordMutation,
} = vmsApi;
