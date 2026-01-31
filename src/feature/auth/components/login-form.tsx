import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { SignInSchema } from '../schemas/sign-in.schema'
import { useServerFn } from '@tanstack/react-start'
import { loginFn } from '@/feature/auth/services/auth.functions'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

export function LoginForm() {
  const login = useServerFn(loginFn)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: { email: '', password: '' },
    validators: { onSubmit: SignInSchema },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        const res = await login({
          data: {
            email: value.email,
            password: value.password,
            redirect: '/dashboard/admin',
          },
        })

        // If server returns ok:false
        if (res?.ok === false) {
          toast.error(res.message ?? 'Invalid credentials')
          return
        }

        // Most of the time redirect happens and you won't see this toast.
        toast.success('Login successful!')
      } catch (e) {
        // If redirect happens, typically it won't come here.
        toast.error('Login failed')
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Your email"
                      type="email"
                      autoComplete="email"
                      disabled={loading}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Your password"
                      type="password"
                      autoComplete="off"
                      disabled={loading}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <Field>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner /> Logging in...{' '}
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
