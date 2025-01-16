import { Router } from "express";
import { login, logout, verifyToken, signup } from "../../controller/auth/auth";

const router = Router()

router.post('/login', login)
router.get('/logout', logout)
router.get('/verify', verifyToken)
router.post('/signup', signup)

export default router