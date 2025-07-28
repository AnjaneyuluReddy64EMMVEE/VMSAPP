import dayjs from 'dayjs';

//Number
export const numberType = (item: any) => {
  return item.replace(/[^0-9]/g, '');
};

//Amount
export const amountType = (item: any) => {
  return item.replace(/[^0-9]/g, '');
};

//Contact Number
export const contactType = (item: any) => {
  let numericText = item.replace(/[^0-9]/g, '');

  if (numericText.length > 10) {
    numericText = numericText.slice(0, 10);
  }

  return numericText;
};

// Dates and its Formats

export const dateFormatHours = (
  date: string,
  format: string = 'DD-MMM-YYYY hh:mm A',
) => {
  const dateString = dayjs(date)?.format(format);
  if (dateString !== 'Invalid Date') {
    return dayjs(date).format(format) || '';
  }
  return '';
};

export const dateYearFormat = (date: string, format: string = 'YYYY') => {
  const dateString = dayjs(date)?.format(format);
  if (dateString !== 'Invalid Date') {
    return dayjs(date).format(format) || '';
  }
  return '';
};

export const dateDayFormat = (date: string | null | undefined) => {
  return date ? dayjs(date).format('DD') : '';
};

//API Response Message
export const getResponseMessage = (res: any, uiConfiguration?: any) => {
  return (
    res?.data?.errors &&
    res?.status != 401 &&
    (uiConfiguration?.BUSINESS_MESSAGES?.[
      res?.data?.errors?.[0]?.description ||
        res?.data?.errors?.[0]?.detail ||
        res?.data?.errors?.[0]?.message ||
        res?.data?.errors?.[0]?.title
    ] ||
      res?.data?.errors?.[0]?.description ||
      res?.data?.errors?.[0]?.detail ||
      res?.data?.errors?.[0]?.message ||
      res?.data?.errors?.[0]?.title)
  );
};

export const isValidResponse = (res: any) => {
  return res &&
    res?.status === 200 &&
    res?.data?.errors &&
    res?.data?.errors?.[0]?.code === '0'
    ? true
    : false;
};

export const globalRoles = {
  SECURITY: 'security',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
} as const;

export const globalStatuses = {
  PENDING: 'pending',
  CHECKED_IN: 'checkedIn',
  CHECKED_OUT: 'checkedOut',
} as const;
