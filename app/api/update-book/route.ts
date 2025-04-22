import { updateBook } from '@/app/lib/actions';

export async function POST(req) {
  // todo: check id
  try {
    const fd = await req.formData();
    const id = fd.get('id');
    const name = fd.get('name');
    const _tag = fd.get('tag');
    const description = fd.get('description');
    const download_url = fd.get('download_url');
    const tag = `{${_tag}}`;

    await updateBook({ id, name, tag, description, download_url });
    return Response.json({ code: 0, message: 'success' });
  } catch (error) {
    console.log(error);
    return Response.json({ code: -1, message: 'error' });
  }
};
