import React from 'react'
import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

  const[porcentaje, setPorcentaje] = useState(0)
  const[disponible, setDisponible] = useState(0)
  const[gastado, setGastado] = useState(0)
  
  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => {
      return gasto.cantidad + total
    }, 0)
    setGastado(totalGastado)
    
    const totalDisponible = presupuesto - totalGastado
    setDisponible(totalDisponible)

    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);

  }, [gastos])


  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-CR', {
      style: 'currency',
      currency: 'CRC'
    })
  }

  const handleResetApp = () =>{
    const resultado = confirm('¿Deseas reinciar presupuesto y gastos?')

    if (resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
    // setPresupuesto(0)
    // console.log(gastos)
    // console.log(presupuesto)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
          <CircularProgressbar
            styles={buildStyles({
              pathColor: porcentaje > 100 ? '#dc2626' : '#3b83F6',
              trailColor: '#F5F5F5',
              textColor: porcentaje > 100 ? '#dc2626' : '#3b83F6',
            })}
            value={porcentaje}
            text={`${porcentaje}% Gastado`}
          />
        </div>
        <div className="contenido-presupuesto">
            <button
              className="reset-app"
              type='button'
              onClick={handleResetApp}
            >
              Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto