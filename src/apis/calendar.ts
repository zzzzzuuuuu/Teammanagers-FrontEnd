import { instance } from './instance';
import { CreateEventProps } from 'src/types/calendar';

export const getTeamMember = async (teamId: number) => {
  const response = await instance.get(`/api/team/${teamId}/member`);
  return response;
};

export const createCalendarEvent = async (
  teamId: number,
  event: CreateEventProps
) => {
  const response = await instance.post(`/api/team/${teamId}/calendar`, event);
  return response;
};

export const updateEventState = async (eventId: number) => {
  const response = await instance.patch(`/api/calendar/${eventId}/state`);
  return response;
};

export const deleteCalendarEvent = async (eventId: number) => {
  const response = await instance.delete(`/api/calendar/${eventId}`);
  return response;
};

export const getCalendarEvent = async (
  teamId: number,
  month: number | null
) => {
  const response = await instance.get(
    `/api/team/${teamId}/calendar?month=${month}`
  );
  return response;
};

export const getCalendarEventDetail = async (calendarId: number) => {
  const response = await instance.get(`/api/calendar/${calendarId}`);
  return response;
};

export const getUpcomingEvent = async (teamId: number) => {
  const response = await instance.get(`/api/team/${teamId}/calendar/coming`);
  return response;
};
