'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentsInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import AddStudent from './AddStudent/AddStudent';

const Students = (): React.ReactElement => {
  const { students, deleteStudent, addStudent } = useStudents();

  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      deleteStudent(studentId);
    }
  };

  return (
    <div className={styles.Students}>
      <AddStudent onAdd={addStudent} />
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={onDeleteHandler}
        />
      ))}
    </div>
  );
};

export default Students;
