import { useEffect, useState } from 'react'
import { useRouter } from "next/router"

import ErrorMessage from '../components/ErrorMessage'

const Index = () => {
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('email@test.com')
  const [password, setPassword] = useState('password')
  const router = useRouter()

  const validate = () => {
    // dejo mensajes de error para cada campo, retorno false ni bien hubo error
    if(email === '') {
      setError('email')
      return false
    }

    if(password === '') {
      setError('password')
      return false
    }

    // Si ningun error sucedio, retornamos true y limpiamos el state de error
    setError(null)
    return true
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(validate()) { // si la validacion devolvio true, ejecutamos el fetch
      const response = await fetch('/api/register', { 
        method: 'POST',
        body: JSON.stringify({
          email, password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const message = await response.json() // parseamos el json

      if(response.ok) { // si el status fue 200, esta ok
        router.push('/success')
      } else {
        setError(message.message) // Si hubo algun error del api, mostramos el contenido
      }
    }
  }

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  useEffect(() => {
    validate()

    // En cada cambio de email o password, validamos (se podria hacer mejor, ahora valida ambos campos,
    // cuando deberia validar solo el campo que se esta cambiando)
  }, [password, email])
  
  return (
    <div>
      {error && <ErrorMessage error={error}/>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <input type="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange}/>

        <input type="submit" value="Registrar!" disabled={error}/>
      </form>
    </div>
  )
}

export default Index