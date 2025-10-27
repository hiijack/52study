import { Redis } from '@upstash/redis';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import SideNav from '../components/side-nav';
import Footer from '@/app/components/footer';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <header id="title" className="w-full border-b border-gray-200 text-black dark:border-white/20">
        <div className="max-w-container mx-auto px-8">
          <div className="flex items-center justify-between">
            <h1 className="py-4 text-3xl font-bold dark:text-white">The Library Admin</h1>
            <div className="flex gap-2 items-center">
              <span className="dark:text-gray-400">{session.user.name}</span>
              <form
                action={async () => {
                  'use server';
                  const redis = Redis.fromEnv();
                  redis.del(`refresh:${session.refreshToken}`);
                  await signOut({ redirectTo: '/login' });
                }}
              >
                <button className="text-sm text-blue-500 cursor-pointer">登出</button>
              </form>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row md:overflow-hidden px-8">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="grow py-4 px-2 md:overflow-y-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
}
