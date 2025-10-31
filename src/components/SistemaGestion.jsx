import React, { useState } from 'react'
import {
  Menu,
  Home,
  Package,
  FolderTree,
  Users,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  ShoppingCart
} from 'lucide-react'
import Modal from './Modal'
import CarritoCompras from './CarritoCompras'

const SistemaGestion = () => {
  // Estados del carrito
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [itemsCarrito, setItemsCarrito] = useState([])

  // Estados existentes
  const [vistaActiva, setVistaActiva] = useState('dashboard')
  const [menuAbierto, setMenuAbierto] = useState(true)
  // ...existing code...

  // Agregar al MenuLateral el botón del carrito
  const MenuLateral = () => (
    <div className={`${menuAbierto ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 flex flex-col`}>
      {/* ...existing code... */}
      <nav className="flex-1 p-4">
        {/* ...existing buttons... */}
        
        {/* Botón del carrito */}
        <button 
          onClick={() => setCarritoAbierto(true)}
          className="w-full flex items-center gap-3 p-3 rounded mb-2 hover:bg-gray-700"
        >
          <ShoppingCart className="w-5 h-5" />
          {menuAbierto && (
            <span>Carrito {itemsCarrito.length > 0 && `(${itemsCarrito.length})`}</span>
          )}
        </button>
      </nav>
      {/* ...existing code... */}
    </div>
  )

  // Modificar el return para incluir el carrito
  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral />
      <div className="flex-1 overflow-y-auto">{renderVistaActiva()}</div>
      {renderModal()}
      
      {/* Carrito */}
      {carritoAbierto && (
        <CarritoCompras 
          items={itemsCarrito}
          onClose={() => setCarritoAbierto(false)}
          onUpdateCantidad={(id, cantidad) => {
            setItemsCarrito(items => 
              items.map(item => 
                item.id === id ? {...item, cantidad} : item
              )
            )
          }}
          onRemoveItem={(id) => {
            setItemsCarrito(items => items.filter(item => item.id !== id))
          }}
        />
      )}
    </div>
  )
}

export default SistemaGestion