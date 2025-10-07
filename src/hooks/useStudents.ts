import { useQuery } from '@tanstack/react-query';
import { getStudentsApi } from '@/api/studentsApi';
import type StudentsInterface from '@/types/StudentsInterface';

interface StudentsHookInterface {
  students: StudentsInterface[];
}

const useStudents = (): StudentsHookInterface => {
  // const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: true,
  });

  return {
    students: data ?? [],
  };
};

export default useStudents;
