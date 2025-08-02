import { type NextRequest, NextResponse } from "next/server"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}
