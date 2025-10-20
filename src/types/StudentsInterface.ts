interface StudentsInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  isDeleted?: boolean;
  groupId: number;
  uuid?: string;
};

export default StudentsInterface;
