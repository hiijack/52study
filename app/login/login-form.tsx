'use client';

import { useActionState } from 'react';
import { UserCircleIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className="mb-4 text-2xl">The Library Admin</h1>
        <div className="w-full">
          <div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="用户名"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-5">
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="密码"
                minLength={6}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value="/dashboard" />
        <button
          className="mt-5 w-full h-10 rounded-lg bg-blue-500 px-4 text-sm text-center font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          aria-disabled={isPending}
        >
          {isPending ? '登录中' : '登录'}
        </button>
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
