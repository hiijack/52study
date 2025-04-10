import { addBook } from '@/app/lib/actions';

export async function POST(req: Request) {
  const fd = await req.formData();
  const name = fd.get('name');
  const _tag = fd.get('tag');
  const description = fd.get('description');
  const download_url = fd.get('download_url');
  const date = new Date().toISOString().split('T')[0];
  const tag = `{${_tag}}`;
  try {
    await addBook({ name, tag, description, download_url, date });
    return Response.json({ code: 0, message: 'success' });
  } catch (error) {
    console.log(error);
    return Response.json({ code: -1, message: 'error' });
  }
}
