import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ky from 'ky-universal'
import { Voto } from '@openargo/core'
import Button from '@material-ui/core/Button';


const dummy: Voto = {
  datGiorno: '',
  desMateria: '',
  prgMateria: 0,
  prgScuola: 0,
  prgScheda: 0,
  codVotoPratico: 'P',
  decValore: 0,
  codMin: '',
  desProva: '',
  codVoto: '',
  numAnno: 0,
  prgAlunno: 0,
  desCommento: '',
  docente: ''
}

type Inputs = {
  code: string,
  username: string,
  password: string,
};

const Home = () => {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();

  const [headers, setHeaders] = useState<any>()
  const [voti, setVoti] = useState<Voto[]>([dummy])



  const handleLogin = async (data: Inputs) => {
    const response = await ky.post('/api/login', { json: data }).json()
    setHeaders(response)
    alert('logged in')
  }

  const handleRequest = async () => {
    const response: Voto[] = await ky.post('/api/voti', { json: { headers } }).json()
    console.log(response[0])
    setVoti(response)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input name="code" placeholder='codice' ref={register({ required: true })} /> <br />
        <input name="username" placeholder='utente' ref={register({ required: true })} /><br />
        <input name="password" placeholder='password' ref={register({ required: true })} /><br />
        <input type="submit" value='login' />
      </form>
      <button onClick={handleRequest}>Voti</button>
      <div>
        {
          voti.map(voto => (
            <div key={voti.indexOf(voto)}>
              <span>Materia: {voto.desMateria}</span><br />
              <span>Data: {voto.datGiorno}</span><br />
              <span>Voto: {voto.codVoto}</span><br />
              <span>Docente: {voto.docente}</span><br /><hr />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home