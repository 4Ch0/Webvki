import { getStudentsDb } from '@/db/studentsDb';

export async function GET(): Promise<Response> {
  const groups = await getStudentsDb();

  return new Response(JSON.stringify(groups), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
