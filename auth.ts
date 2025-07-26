export function checkAdminPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("apex-admin-auth") === "true"
}

export function setAdminAuthenticated(authenticated: boolean): void {
  if (typeof window === "undefined") return
  if (authenticated) {
    localStorage.setItem("apex-admin-auth", "true")
  } else {
    localStorage.removeItem("apex-admin-auth")
  }
}
