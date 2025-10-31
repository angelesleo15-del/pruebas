import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ titulo, children, isOpen = true, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titulo || 'Modal'}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // click en el backdrop cierra
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // evitar cierre al clicar el contenido
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {titulo && <h2 className="text-lg font-semibold mb-4">{titulo}</h2>}
        {children}
      </div>
    </div>
  )
}