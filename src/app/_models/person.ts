export interface Person {
    id: number;
    crsid: string;
    title: string;
    forenames: string;
    surname: string;
    room_id: number;
    room_name: string;
    start_date: Date;
    end_date: Date;
    status_name: string;
    phone_number: number[];
    notes: string;
    supervisor_id: number;
    supervisor_forenames: string;
    supervisor_surname: string;
    manager_id: number;
    manager_forenames: string;
    manager_surname: string;
    group_id: number;
    group_names: string[];
    visit_id: number;
}
