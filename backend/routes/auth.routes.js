import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @route POST /api/auth/registro
 * @desc Registrar nuevo usuario
 */
router.post('/registro', AuthController.registro);

/**
 * @route POST /api/auth/login
 * @desc Iniciar sesión
 */
router.post('/login', AuthController.login);

export default router;