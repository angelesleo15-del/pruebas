import React, { useState } from 'react'
import SistemaAutenticacion from './components/SistemaAutenticacion'
import SistemaGestion from './components/SistemaGestion'

function App() {
  const [logueado, setLogueado] = useState(false)

  return (
    <div className="App">
      {logueado ? (
        <SistemaGestion />
      ) : (
        <SistemaAutenticacion onLogin={() => setLogueado(true)} />
      )}
    </div>
  )
}

export default App



