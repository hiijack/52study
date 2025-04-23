import postgres from 'postgres';
import { Book, Card, User } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 7;
export async function fetchBook(query: string, currentPage: number = 1) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<Book[]>`SELECT * FROM book
      WHERE book.name ILIKE ${`%${query}%`} OR
        book.tag::text ILIKE ${`%${query}%`}
      ORDER BY book.date desc
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch book data.');
  }
}

export async function fetchBookPages(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(book.id) FROM book
      WHERE book.name ILIKE ${`%${query}%`} OR
        book.tag::text ILIKE ${`%${query}%`}`;
    const totalPages = Math.ceil(+data[0].count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch book pages data.');
  }
}

export async function fetchCardData() {
  try {
    const data =
      await sql<Card[]>`
      SELECT COUNT(book.id) AS total_record,
        SUM(book.view_count) AS total_view,
        SUM(book.download_count) AS total_download
      FROM book`;
    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    if (user.length > 0) {
      return user[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}