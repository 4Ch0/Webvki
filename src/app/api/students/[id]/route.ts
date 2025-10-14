import { deleteStudentDb } from '@/db/studentsDb';
import { type NextApiRequest } from 'next/types';

interface Params {
  params: { id: number };
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const studentId = Number.parseInt(params.id, 10);
  const deletedStudentId = await deleteStudentDb(studentId);

  return new Response(JSON.stringify({ deletedStudentId }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};