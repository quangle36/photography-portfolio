import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/database';
import User from '@/models/User';

export async function GET(request: NextRequest) {
	try {
		await connectDB();

		const userId = request.headers.get('userId');

		const user = await User.findById(userId).select('-password');
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json({ user });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
