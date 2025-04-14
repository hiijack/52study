'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return '认证无效';
        default:
          return '系统出错';
      }
    }
    throw error;
  }
}