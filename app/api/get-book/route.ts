import { fetchBook, fetchBookPages } from "@/app/lib/data";
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('term') || '';
  const page = +searchParams.get('page') || 1;
  try {
    const data = await fetchBook(query, page);
    const totalPages = await fetchBookPages(query);
    return Response.json({ code: 0, data, totalPages });
  } catch (error) {
    console.log(error);
    return Response.json({ code: -1, data: [], totalPages: 0 });
  }
}