import { auth } from '@/auth';
import { addBook } from '@/app/lib/actions';

// todo auth(...)

export async function POST(req) {
  const session = await auth();
  if (!session) {
    return Response.json({ code: -1, message: 'Not authenticated' }, { status: 401 });
  }
  try {
    const fd = await req.formData();
    const name = fd.get('name');
    const _tag = fd.get('tag');
    const description = fd.get('description');
    const download_url = fd.get('download_url');
    const date = new Date().toISOString().split('T')[0];
    const tag = `{${_tag}}`;

    await addBook({ name, tag, description, download_url, date });
    return Response.json({ code: 0, message: 'success' });
  } catch (error) {
    console.log(error);
    return Response.json({ code: -1, message: 'error' });
  }
}
