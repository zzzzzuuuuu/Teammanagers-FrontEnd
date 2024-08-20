export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface TeamMemberType {
  teamManageId: number;
  name: string;
}

export interface EventType {
  calendarId: number;
  date: string;
  isAlarmed: boolean | null;
  status: string;
  title: string;
}

export type UpcomingEventType = {
  calendarId: number;
  title: string;
  status: string;
  isAlarm: boolean;
  date: string;
}[];

export interface UpcomingEventProps {
  event: {
    calendarId: number;
    title: string;
    status: string;
    isAlarm: boolean;
    date: string;
  };
}

export type ModalProps = {
  selectedDate: Value;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ParticipantsListType {
  scheduleInfo: ScheduleInfoType;
  setScheduleInfo: React.Dispatch<React.SetStateAction<ScheduleInfoType>>;
}

interface BaseEventype {
  date: string | null; // ISO 8601 형식의 문자열
  title: string;
  content: string;
}

export interface CreateEventProps extends BaseEventype {
  participants: number[];
}

export interface ScheduleInfoType extends BaseEventype {
  participants: {
    teamManageId: number;
    name: string;
  }[];
}
