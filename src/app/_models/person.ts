export interface Person {
    id: number;
    crsid: string;
    title: string;
    forenames: string;
    surname: string;
    roomId: number;
    roomName: string;
    startDate: Date;
    endDate: Date;
    statusName: string;
    phoneNumber: number[];
    notes: string;
    supervisorId: number;
    supervisorForenames: string;
    supervisorSurname: string;
    managerId: number;
    managerForenames: string;
    managerSurname: string;
    groupId: number;
    groupNames: string[];
    visitId: number;
}
