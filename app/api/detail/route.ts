import { updateViewCount } from "@/app/lib/actions";
import { type NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache';

// todo: should change name
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    await updateViewCount(id);
    revalidatePath('/');
    return Response.json({ code: 0 });
  } catch (error) {
    console.log(error);
    return Response.json({ code: -1 });
  }
}