import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f7] p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}

