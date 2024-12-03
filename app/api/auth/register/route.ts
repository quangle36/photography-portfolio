import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models/User"

import connectDB from "@/config/database"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { email, password, name } = await request.json()

    //Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 }
      )
    }
    //Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }
    //Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }
    //Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    //Create new user
    const user = await User.create({
      email,
      password,
      name,
    })

    // //Generate token
    // const token = generateToken(user);

    return NextResponse.json(
      {
        message: "Registraion successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Registration failed. Please try again" },
      { status: 500 }
    )
  }
}
