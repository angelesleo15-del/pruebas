// Simulación de base de datos en memoria
let usuarios = [];

/**
 * Modelo de Usuario
 */
class UserModel {
  
  /**
   * Buscar usuario por email
   */
  static buscarPorEmail(email) {
    return usuarios.find(user => user.email === email) || null;
  }

  /**
   * Crear nuevo usuario
   */
  static crear(userData) {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      ...userData,
      fechaCreacion: new Date()
    };
    usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  /**
   * Obtener todos los usuarios
   */
  static obtenerTodos() {
    return usuarios.map(({ password, ...user }) => user);
  }
}

export default UserModel;