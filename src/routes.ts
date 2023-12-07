import { Router } from 'express'
import { checkAuth } from './middlewares/checkAuthentication'
import authController from '../src/controllers/auth.controller'

const router = Router()

router.post("/register", authController.register)
router.post("/login", authController.login)

router.post("/home", checkAuth, (req, res) => {
    res.status(200).send("Usuário autenticado!")
})

export default router