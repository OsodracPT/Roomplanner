interface Segment {
    key: Value[];
    name: string;
  }

  interface Value {
    end: number;
    occupants: Occupant[];
    start: number;
  }

  interface Occupant {
    crsid: string;
    end_date: string;
    end_days: number;
    forenames: string;
    room_number: string;
    start_date: string;
    start_days: number;
    surname: string;
    title: string;
  }
