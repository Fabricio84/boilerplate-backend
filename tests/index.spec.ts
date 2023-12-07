import main from "../src/index"
import request from "supertest"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const userData = {
    username: 'fabricio.abner@gmail.com',
    password: '123456'
}

describe("POST /register", () => {

    afterAll(async () => {
        main.server.close()
        const { username } = userData
        await prisma.user.delete({ where: { username } })
    })

    it("returns status code 201 if username and password id passed", async () => {
        const res = await request(main.app)
        .post("/register")
        .send(userData)

        expect(res.statusCode).toEqual(201)
    })
})

describe("POST /login", () => {

    beforeAll(async () => {
        const password = await bcrypt.hash(userData.password, 8)
        await prisma.user.create({ data: { username: userData.username, password } })
    })

    afterAll(async () => {
        main.server.close()
        const { username } = userData 
        await prisma.user.delete({ where: { username } })
    })

    it("returns status code 200 and Token json", async () => {
        const res = await request(main.app)
        .post("/login")
        .send(userData)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toBe('string')
    })

    it("returns status code 500 username is not passed", async () => {
        const { password } = userData
        const res = await request(main.app)
        .post("/login")
        .send({ username: '', password })

        expect(res.statusCode).toEqual(500)
        expect(res.body).toBe("Usuário ou senha é obrigatório!")
    })

    it("returns status code 500 password is not passed", async () => {
        const { username } = userData
        const res = await request(main.app)
        .post("/login")
        .send({ username, password: '' })

        expect(res.statusCode).toEqual(500)
        expect(res.body).toBe("Usuário ou senha é obrigatório!")
    })
})