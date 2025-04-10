import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function addBook(data) {
  const { name, description, download_url, tag, date } = data;
  await sql`
    INSERT INTO book (name, description, download_url, tag, date)
    VALUES (${name}, ${description}, ${download_url}, ${tag}, ${date})
  `;
}

export async function updateViewCount(id: string) {
  await sql`
    UPDATE book
    SET view_count = view_count + 1
    WHERE id = ${id}
  `;
}

export async function updateDownloadCount(id: string) {
  await sql`
    UPDATE book
    SET download_count = download_count + 1
    WHERE id = ${id}
  `;
}