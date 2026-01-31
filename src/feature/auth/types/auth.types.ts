export type LoginResponse = {
  success: boolean
  access: string
  refresh: string
  user: {
    pk: number
    username: string
    email: string
    first_name: string
    last_name: string
  }
  role: string
}
