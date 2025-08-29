import { updateDownloadCount } from "@/app/lib/actions";
import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    await updateDownloadCount(id);
    revalidatePath('/');
    return Response.json({ code: 0 });
  } catch (error) {
    console.log(error);
    return Response.json({ code: -1 });
  }
}