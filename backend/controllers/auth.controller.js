import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const JWT_SECRET = 'clave_secreta_sena_2024';

/**
 * Controlador de Autenticación
 */
class AuthController {

  /**
   * Registro de usuario
   * POST /api/auth/registro
   */
  static async registro(req, res) {
    try {
      const { nombre, email, password } = req.body;

      // Validación de campos
      if (!nombre || !email || !password) {
        return res.status(400).json({ 
          error: 'Todos los campos son obligatorios' 
        });
      }

      // Verificar si existe
      const usuarioExistente = UserModel.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ 
          error: 'El usuario ya existe' 
        });
      }

      // Encriptar contraseña
      const passwordHash = await bcrypt.hash(password, 10);

      // Crear usuario
      const nuevoUsuario = UserModel.crear({
        nombre,
        email,
        password: passwordHash
      });

      // Generar token
      const token = jwt.sign(
        { id: nuevoUsuario.id, email: nuevoUsuario.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Respuesta exitosa
      res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        usuario: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          email: nuevoUsuario.email
        },
        token
      });

    } catch (error) {
      res.status(500).json({ 
        error: 'Error en el servidor', 
        detalle: error.message 
      });
    }
  }

  /**
   * Login de usuario
   * POST /api/auth/login
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validación
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email y contraseña son obligatorios' 
        });
      }

      // Buscar usuario
      const usuario = UserModel.buscarPorEmail(email);
      if (!usuario) {
        return res.status(401).json({ 
          error: 'Error en la autenticación - Credenciales inválidas' 
        });
      }

      // Verificar contraseña
      const passwordValida = await bcrypt.compare(password, usuario.password);
      if (!passwordValida) {
        return res.status(401).json({ 
          error: 'Error en la autenticación - Credenciales inválidas' 
        });
      }

      // Generar token
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // ✅ Respuesta exitosa
      res.json({
        mensaje: 'Autenticación satisfactoria',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email
        },
        token
      });

    } catch (error) {
      res.status(500).json({ 
        error: 'Error en el servidor', 
        detalle: error.message 
      });
    }
  }
}

export default AuthController;