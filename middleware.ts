import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';
import * as jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
	console.log('Middleware executing for path:', request.nextUrl.pathname);
	const authHeader = request.headers.get('authorization');
	console.log('Auth header:', authHeader);
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		console.log('No valid auth header found');
		return NextResponse.json(
			{ error: 'Please provide a valid token' },
			{ status: 401 }
		);
	}
	try {
		const token = authHeader.split(' ')[1];
		console.log('token', token);
		const decoded = verifyToken(token);
		console.log('decoded', decoded);
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set('userId', decoded._id);

		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
	} catch (error) {
		return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
	}
}

export const config = {
	matcher: ['/api/protected/:path*', '/api/admin/:path*'],
};
