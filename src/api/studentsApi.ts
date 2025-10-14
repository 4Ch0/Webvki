import type StudentsInterface from '@/types/StudentsInterface';

export const getStudentsApi = async (): Promise<StudentsInterface[]> => {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API
      || (typeof window !== 'undefined' ? '/api/' : 'http://localhost:3000/api/');
    const response = await fetch(`${apiBase}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentsInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getstudentsApi', err);
    return [] as StudentsInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API
      || (typeof window !== 'undefined' ? '/api/' : 'http://localhost:3000/api/');
    const response = await fetch(`${apiBase}students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return studentId;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
    return -1;
  }
};