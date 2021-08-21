export default function handler(req, res) {
  if (req.method === 'POST') {
    // Estos console.log se ven en la terminal, porque estan del lado del server
    console.log(req.body)
    
    const {email, password} = req.body
    
    // Una validacion de ejemplo, esta validacion ya la hizo el front, pero por las dudas se vuelve a checkear
    if(email !== '' && password !== '') { 
      // En caso de exito mandamos un 200 y un mensajito de ok
      res.status(200).json({ message: 'ok' })
    } else {
      // En caso de error mandamos un 400 (unprocesable entity) y un mensajito de error.
      // Se podria mejorar para mostrar erorres mas detallados
      res.status(422).json({ message: 'error' })
    }

    // Nota, en un mismo request solo podes hacer un res.status().json(), por eso es importante que caiga en una sola 
    // condicion del if, si hubiera algo asi, fallaria:
    // res.status(200).json({ message: 'ok' })
    // res.status(200).json({ message: 'otro mensaje' })
  } else {
    // Si viene un request GET, respondemos esto (porque solo nos interesa el POST, nadie deberia mandar GET)
    res.status(405).json({ name: 'Method not allowed' })
  }
}