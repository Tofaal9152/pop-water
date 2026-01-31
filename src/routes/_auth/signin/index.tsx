import { LoginForm } from '@/feature/auth/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm />
}
