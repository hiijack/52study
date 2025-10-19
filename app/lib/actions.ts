'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function addBook(data) {
  const { name, description, download_url, tag, date } = data;
  await sql`
    INSERT INTO book (name, description, download_url, tag, date)
    VALUES (${name}, ${description}, ${download_url}, ${tag}, ${date})
  `;
  revalidatePath('/');
  revalidatePath('/dashboard');
}

export async function updateBook(data) {
  const { id, name, description, download_url, tag } = data;
  await sql`
    UPDATE book
    SET name = ${name},
      description = ${description},
      download_url = ${download_url},
      tag = ${tag}
    where id = ${id}
  `;
  revalidatePath('/');
  revalidatePath('/dashboard');
}

export async function updateViewCount(id: string) {
  await sql`
    UPDATE book
    SET view_count = view_count + 1
    WHERE id = ${id}
  `;
  revalidatePath('/');
}

export async function updateDownloadCount(id: string) {
  await sql`
    UPDATE book
    SET download_count = download_count + 1
    WHERE id = ${id}
  `;
  revalidatePath('/');
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
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

export async function addSearch(data) {
  const { content, tool, params } = data;
  await sql`
    INSERT INTO aisearch (content, tool, params)
    VALUES (${content}, ${tool}, ${params})
  `;
  revalidatePath('/dashboard');
}

export async function deleteBook(id) {
  try {
    await sql`
      DELETE FROM book WHERE id = ${id} ;
    `;
    revalidatePath('/');
    revalidatePath('/dashboard');
    return true;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete book.');
  }
}
