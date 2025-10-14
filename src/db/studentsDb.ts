import sqlite3 from 'sqlite3';

import type StudentsInterface from '@/types/StudentsInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentsInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      const mapped = (rows as any[]).map((row) => ({        
          id: row.id,
          firstName: row.first_name,
          lastName: row.last_name,
          middleName: row.middle_name,
          isDeleted: Boolean(row.isDeleted) 
          && row.isDeleted !== 0,      
        }));      
      resolve(mapped);

      db.close();
    });
  });

  // test data
  // const groups: GroupInterface[] = [
  //   {
  //     name: '2207 д2',
  //   },
  //   {
  //     name: '2207 д2',
  //   },
  // ];

  return students as StudentsInterface[];
};

export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  await new Promise((resolve, reject) => {
    db.run('DELETE FROM student WHERE id=?', [studentId], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(studentId);
      db.close();
    });
  });

  return studentId;
};