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
        // console.log('🔐 Attaching token:', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Visitor', 'Security', 'Admin', 'Notify', 'SuperAdmin'],
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
    // getAllSecurity: builder.query({
    //   query: () => 'allsecurity',
    //   providesTags: ['Security'],
    // }),
    getAllSecurity: builder.query({
      query: ({ officeLocation }) => {
        const params = new URLSearchParams();

        if (officeLocation && officeLocation !== 'All') {
          params.append('officeLocation', officeLocation);
        }

        const url = params.toString()
          ? `allsecurity?${params.toString()}`
          : 'allsecurity';

        return url;
      },
      transformResponse: (response: any) => response.response,
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

    // getVisitorStats: builder.query({
    //   query: ({ officeLocation, startDate, endDate }) => {
    //     const params = new URLSearchParams();
    //     if (officeLocation) {
    //       params.append('officeLocation', officeLocation);
    //     }

    //     const body = {
    //       startDate,
    //       endDate,
    //     };

    //     console.log('📊 getVisitorStats → Params:', params.toString());
    //     console.log('📊 getVisitorStats → Body:', body);

    //     return {
    //       url: `visitor/stats?${params.toString()}`,
    //       method: 'POST',
    //       body,
    //     };
    //   },
    // }),

    // // 📈 Get day-wise graph data for visitors
    // getDayGraph: builder.query({
    //   query: ({ officeLocation, startDate, endDate }) => {
    //     const body = {
    //       officeLocation,
    //       startDate,
    //       endDate,
    //     };

    //     // console.log('📈 getDayGraph → Body:', body);

    //     return {
    //       url: 'visitor/daygraph',
    //       method: 'POST',
    //       body,
    //     };
    //   },
    // }),

    // // 📌 Get purpose-wise graph data for visitors
    // getPurposeGraph: builder.query({
    //   query: ({ officeLocation, startDate, endDate }) => {
    //     const body = {
    //       officeLocation,
    //       startDate,
    //       endDate,
    //     };

    //     console.log('📊 getPurposeGraph → Body:', body);

    //     return {
    //       url: 'visitor/purposegraph',
    //       method: 'POST',
    //       body,
    //     };
    //   },
    // }),

    // 🚀 Visitor Stats API Queries
    getVisitorStats: builder.query({
      // 🔍 Fetch total visitor stats based on location and date range
      query: ({ officeLocation, startDate, endDate }) => {
        const params = new URLSearchParams();

        // ✅ Add officeLocation to query params if available
        if (officeLocation) {
          params.append('officeLocation', officeLocation);
        }

        const body = {
          startDate, // 🗓️ Start of range
          endDate, // 🗓️ End of range
        };

        // 🧾 Debug logs
        // console.log('📊 getVisitorStats → Params:', params.toString());
        // console.log('📊 getVisitorStats → Body:', body);

        return {
          url: `visitor/stats?${params.toString()}`, // 📎 POST with query param
          method: 'POST',
          body,
        };
      },
    }),

    getDayGraph: builder.query({
      // 📈 Fetch day-wise visitor data for line chart
      query: ({ officeLocation, startDate, endDate }) => {
        const body = {
          officeLocation,
          startDate,
          endDate,
        };

        // 📌 You can add console.log here for debugging if needed
        return {
          url: 'visitor/daygraph',
          method: 'POST',
          body,
        };
      },
    }),

    getPurposeGraph: builder.query({
      // 🎯 Fetch purpose-wise visitor breakdown
      query: ({ officeLocation, startDate, endDate }) => {
        const body = {
          officeLocation,
          startDate,
          endDate,
        };

        // 🧾 Debug log to verify data
        // console.log('📊 getPurposeGraph → Body:', body);

        return {
          url: 'visitor/purposegraph',
          method: 'POST',
          body,
        };
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

    // getAllAdmins: builder.query({
    //   query: () => 'allAdmin',
    //   transformResponse: (response: any) => response.response, // ✅ extract inner array
    //   providesTags: ['Admin'],
    // }),
    // getAllAdmins: builder.query({
    //   query: ({ officeLocation }) => {
    //     const params = new URLSearchParams();
    //     if (officeLocation) params.append('officeLocation', "Head Office");

    //     const url = `allAdmin?${params.toString()}`;
    //     console.log('📋 getAllAdmins → URL:', url); // ✅ Now it logs
    //     return url;
    //   },
    //   transformResponse: (response: any) => {
    //     // console.log('📋 getAllAdmins → API Response:', response); // Optional debug
    //     return response.response; // ✅ extract data
    //   },
    //   providesTags: ['Admin'],
    // }),
    getAllAdmins: builder.query({
      query: ({ officeLocation }) => {
        const params = new URLSearchParams();

        // Only add officeLocation if it's not "All"
        if (officeLocation && officeLocation !== 'All') {
          params.append('officeLocation', officeLocation);
        }

        const url = params.toString()
          ? `allAdmin?${params.toString()}`
          : 'allAdmin';

        console.log('📋 getAllAdmins → Final URL:', url);
        return url;
      },
      transformResponse: (response: any) => {
        return response.response; // ✅ backend format
      },
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
        // console.log('🔐 Reset Password Payload:', credentials);
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
    getVisitorsByLocationAndDate: builder.query({
      query: ({ officeLocation, fromDate, toDate, page = 0, limit = 10 }) => {
        const params = new URLSearchParams();
        if (true) {
          params.append('officeLocation', officeLocation);
        }
        if (fromDate) params.append('fromDate', fromDate);
        if (toDate) params.append('toDate', toDate);
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const queryStr = `visitors?${params.toString()}`;
        // console.log('🔍 getVisitorsByLocationAndDate →', fromDate);
        return queryStr;
      },
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
  useGetVisitorsByLocationAndDateQuery,
} = vmsApi;
