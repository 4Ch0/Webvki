import { getStudentsDb, addStudentDb } from '@/db/studentsDb';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { firstName, lastName, middleName, groupId } = body;

    // Валидация обязательных полей
    if (!firstName || !lastName || !groupId) {
      return Response.json(
        { error: 'Missing required fields: first_name, last_name, groupId' },
        { status: 400 }
      );
    }

    const newStudent = await addStudentDb({
      firstName,
      lastName,
      middleName: middleName || '',
      groupId: parseInt(groupId, 10)
    });

    return Response.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return Response.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}