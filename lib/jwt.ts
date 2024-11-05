import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { HydratedDocument } from 'mongoose';
// const JWT_SECRET =
// 	process.env.JWT_SECRET! || 'fallback-secret-key-for-development';
export const generateToken = (user: any): string => {
	console.log('generating token for userId: ', user._id);
	const privateKey = Buffer.from(
		process.env.ACCESS_TOKEN_PRIVATE_KEY!,
		'base64'
	).toString('ascii');
	const token = jwt.sign({ sub: user._id }, '123', {
		allowInsecureKeySizes: true,
		algorithm: 'HS256',
	});
	console.log('Generated token', token);
	return token;
};

export const verifyToken = (token: string): { sub: string } => {
	console.log('verifying token: ', token);
	try {
		const publicKey = Buffer.from(
			process.env.ACCESS_TOKEN_PUBLIC_KEY!,
			'base64'
		).toString('ascii');
		const decoded = jwt.verify(token, '123', { algorithms: ['HS256'] }) as {
			sub: string;
		};
		console.log('decoded token', decoded);
		return decoded as { sub: string };
	} catch (error) {
		throw new Error('Verify token failed');
	}
};
