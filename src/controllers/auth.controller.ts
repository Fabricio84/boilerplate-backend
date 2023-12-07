import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../types/user'
import { SECRET_KEY } from '../middlewares/checkAuthentication'

const prisma = new PrismaClient()

async function register (req: Request, res: Response) {
    const { username, password } = req.body

    if (!username || !password)
        return res.status(500).json('Username and password is required!')

    const passwordHash = await bcrypt.hash(password, 8)
    await prisma.user.create({ data: { username, password: passwordHash } })

    res.status(201).send()
}

async function login (req: Request, res: Response) {
    const { username, password } = req.body

    if (!username || !password)
        return res.status(500).json('Usuário ou senha é obrigatório!')

    const foundUser = await prisma.user.findFirst({ where: { username } }) as User

    if (!bcrypt.compareSync(password, String(foundUser.password)))
        return res.status(500).json('Usuário ou senha incorreto!')

    const token = jwt.sign({ username }, SECRET_KEY, {
        expiresIn: '1 days',
    });
 
    return res.json(token)
}

export default { register, login }