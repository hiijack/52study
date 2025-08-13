import { addBook } from '@/app/lib/actions';
import { revalidatePath } from 'next/cache';

// todo check auth
export async function POST(req) {
  try {
    const fd = await req.formData();
    const name = fd.get('name');
    const _tag = fd.get('tag');
    const description = fd.get('description');
    const download_url = fd.get('download_url');
    const date = new Date().toISOString().split('T')[0];
    const tag = `{${_tag}}`;

    await addBook({ name, tag, description, download_url, date });
    revalidatePath('/');
    revalidatePath('/dashboard');
    return Response.json({ code: 0, message: 'success' });
  } catch (error) {
    console.log(error);
    return Response.json({ code: -1, message: 'error' });
  }
};
