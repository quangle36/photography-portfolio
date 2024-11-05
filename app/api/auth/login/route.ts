import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/database';
import { User } from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
	try {
		await connectDB();
		const { email, password } = await request.json();

		//Find user
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 }
			);
		}

		//Check password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 }
			);
		}

		//Generate token
		const token = generateToken(user._id);

		return NextResponse.json({
			success: true,
			token,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				role: user.role,
			},
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
