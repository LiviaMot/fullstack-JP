import express from 'express'
import ControllerUser from '../controller/users.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/login', ControllerUser.Login)

router.get('/user/context', ControllerUser.FindOne)
router.post('/user/', ControllerUser.Create)
router.put('/user/', ControllerUser.Update)
router.delete('/user/', ControllerUser.Delete)

router.get('/users', ControllerUser.FindAll)
router.get('/user/:id', ControllerUser.FindOne)
router.post('/user/admin', ControllerUser.Create)
router.put('/user/:id', ControllerUser.Update)
router.delete('/user/:id', ControllerUser.Delete)

export default router