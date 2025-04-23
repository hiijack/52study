import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative mx-auto w-full max-w-[400px] p-4">
        <LoginForm />
      </div>
    </main>
  );
}
