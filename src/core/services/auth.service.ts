import JWT from 'jsonwebtoken';
import { FastifyRequest } from 'fastify';
import { IJWTDecoded } from '../models/interfaces/jwt';
import { findUserByIdService } from '../../routes/users/users.service';

export const authenticateUser = async (request: FastifyRequest): Promise<string> => {
    try {
        await request.jwtVerify();
    } catch (exception) {
        return exception.message;
    }

    const tokenKey = request.headers.authorization.split(' ')[1];
    const decoded: IJWTDecoded = JWT.decode(tokenKey) as IJWTDecoded;

    const user = await findUserByIdService(request.user.id);
    if (!user || user.id !== decoded.id) {
        return 'User not found';
    }
    request.user = user;
};
