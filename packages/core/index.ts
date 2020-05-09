import {login, getGiorno, getVoti} from './src'

(async()=>{

    const headers= await login('sg27722','barbarabandiera', '15598to43')
    console.log('logged')
    const data = await getGiorno(headers)
    console.log(data.dati[0].dati)
})()