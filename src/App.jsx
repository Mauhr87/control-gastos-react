import { useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import {generateId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([]);


  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  }

  const guardarGasto = gasto => {
    gasto.id = generateId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              alt="Icono nuevo gasto"
              src={IconoNuevoGasto}
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
      />}

    </div>
  )
}

export default App
