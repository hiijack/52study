import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedBook() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS book (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      view_count INT DEFAULT 0,
      download_count INT DEFAULT 0,
      download_url VARCHAR(255) NOT NULL,
      tag VARCHAR(100)[] NOT NULL,
      date DATE NOT NULL
    );
  `;
}

export async function GET() {
  try {
    await sql.begin((sql) => [
      seedBook(),
    ]);
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}