import type StudentsInterface from '@/types/StudentsInterface';
import styles from './Student.module.scss';

interface Props {
  student: StudentsInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

 return (
    <div className={`${styles.Student} ${student.isDeleted ? styles['--isDeleted'] : '' } `}>
      {`${student.id} - ${student.lastName} ${student.firstName} ${student.middleName}`}
      <button onClick={onDeleteHandler} disabled={Boolean(student.isDeleted)}>
        {student.isDeleted ? 'Удаляется…' : 'Удалить'}
      </button>
    </div>
  );
};

export default Student;
