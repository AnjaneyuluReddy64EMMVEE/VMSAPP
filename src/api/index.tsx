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
        // console.log('🔐 Creating security user with data:', data);
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
      query: formData => {
        if (true) {
          // console.log('📝 createVisitor formData =>', formData);
        }

        return {
          url: 'visitor/create',
          method: 'POST',
          body: formData,
          formData: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: ['Visitor'],
    }),

    updateVisitor: builder.mutation({
      query: ({
        id,
        badgeNumber,
        status,
        personToMeet,
        purposeOfVisit,
        timeIn,
        timeOut,
      }) => {
        const body = {
          badgeNumber,
          status,
          personToMeet,
          purposeOfVisit,
          timeIn,
          timeOut,
        };

        // console.log('🛠️ updateVisitor → ID:', id);
        // console.log('📦 Payload. samara:', body);
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
      query: ({ officeLocation }) => {
        const params = new URLSearchParams();

        // Always append officeLocation — if "All", send as empty string
        params.append(
          'officeLocation',
          officeLocation === 'All' ? '' : officeLocation,
        );

        const queryStr = `visitors?${params.toString()}`;
        // console.log('🔍 getVisitorsByBranchtoday →', queryStr);

        return queryStr;
      },
      providesTags: ['Visitor'],
    }),

    // 🔍 Fetch total visitor stats based on location and date range
    getVisitorStats: builder.query({
      query: ({ officeLocation, startDate, endDate }) => {
        const params = new URLSearchParams();

        // 👇 Convert 'All' to empty string or backend-friendly value
        const locationParam = officeLocation === 'All' ? '' : officeLocation;
        params.append('officeLocation', locationParam);

        const body = { startDate, endDate };

        // 🧾 Debug logs
        // console.log('📊 getVisitorStats → Params:', params.toString());
        // console.log('📊 getVisitorStats → Body:', body);

        return {
          url: `visitor/stats?${params.toString()}`,
          method: 'POST',
          body,
        };
      },
    }),

    // 📈 Fetch day-wise visitor data for line chart
    getDayGraph: builder.query({
      query: ({ officeLocation, startDate, endDate }) => {
        const params = new URLSearchParams();
        const locationParam = officeLocation === 'All' ? '' : officeLocation;
        params.append('officeLocation', locationParam);

        return {
          url: `visitor/daygraph?${params.toString()}`,
          method: 'POST',
          body: { startDate, endDate },
        };
      },
    }),
    // 🎯 Fetch purpose-wise visitor breakdown
    getPurposeGraph: builder.query({
      query: ({ officeLocation, startDate, endDate }) => {
        const params = new URLSearchParams();
        const locationParam = officeLocation === 'All' ? '' : officeLocation;

        params.append('officeLocation', locationParam);

        return {
          url: `visitor/purposegraph?${params.toString()}`,
          method: 'POST',
          body: { startDate, endDate },
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

        // console.log('📋 getAllAdmins → Final URL:', url);
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
    // getVisitorsByLocationAndDate: builder.query({
    //   query: ({ officeLocation, fromDate, toDate, page = 0, limit = 10 }) => {
    //     const params = new URLSearchParams();
    //     if (officeLocation) {
    //       params.append('officeLocation', officeLocation);
    //     }
    //     if (fromDate) params.append('fromDate', fromDate);
    //     if (toDate) params.append('toDate', toDate);
    //     params.append('page', page.toString());
    //     params.append('limit', limit.toString());

    //     const queryStr = `visitors?${params.toString()}`;
    //     // console.log('🔍 getVisitorsByLocationAndDate →', fromDate);
    //     return queryStr;
    //   },
    // }),
    getVisitorsByLocationAndDate: builder.query({
      query: ({ officeLocation, startDate, endDate, range }) => {
        const params = new URLSearchParams();

        if (officeLocation) {
          params.append(
            'officeLocation',
            officeLocation == 'All' ? '' : officeLocation,
          );
        }

        const body = {
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          ...(range && { range }),
        };

        const url = `visitor/filterdate?${params.toString()}`;

        console.log('🔍 getVisitorsByLocationAndDate →', {
          officeLocation,
          body,
          url,
        });

        return {
          url,
          method: 'POST',
          body,
        };
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
