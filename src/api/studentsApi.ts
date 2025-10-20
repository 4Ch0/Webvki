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

export const addStudentApi = async (student: Omit<StudentsInterface, 'id'> & { uuid?: string }): Promise<StudentsInterface> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API || 'http://localhost:3000/api/';
    const response = await fetch(`${apiUrl}students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }
    
    const newStudent = await response.json() as StudentsInterface;
    return newStudent;
  } catch (err) {
    console.error('>>> addStudentApi', err);
    throw err;
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
