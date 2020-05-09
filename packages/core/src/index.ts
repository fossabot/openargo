import got from 'got'
import moment from 'moment'
import { verifyHeaders, loginHeaders, fullHeaders } from './headers'
import { URLSearchParams } from 'url';


async function argoRequest(endpoint: string, headers: any, params = '') {
    const prefixUrl = 'https://www.portaleargo.it/famiglia/api/rest';

    const searchParams = new URLSearchParams(`_dc=${moment().valueOf()}&&${params}`);

    const response = await got(endpoint, { prefixUrl, searchParams, headers })

    return JSON.parse(response.body)
}

async function verify() {
    return await argoRequest('verifica', verifyHeaders)
}

export async function login(username: string, password: string, code: string) {
    loginHeaders['x-pwd'] = password;
    loginHeaders['x-cod-min'] = code;
    loginHeaders['x-user-id'] = username;

    const data = await argoRequest('login', loginHeaders)

    fullHeaders['x-auth-token'] = data['token'];
    fullHeaders['x-cod-min'] = code;

    const info = await argoRequest('schede', fullHeaders)

    fullHeaders['x-prg-scheda'] = info[0]['prgScheda'].toString();
    fullHeaders['x-prg-scuola'] = info[0]['prgScuola'].toString();
    fullHeaders['x-prg-alunno'] = info[0]['prgAlunno'].toString();
    return fullHeaders
}

export interface Voto {
    datGiorno: string,
    desMateria: string,
    prgMateria: number,
    prgScuola: number,
    prgScheda: number,
    codVotoPratico: string,
    decValore: number,
    codMin: string,
    desProva: string,
    codVoto: string,
    numAnno: number,
    prgAlunno: number,
    desCommento: string,
    docente: string
}


export async function getVoti(headers: any): Promise<Voto[]> {
    return (await argoRequest('votigiornalieri', headers, 'page=1&&start=0&&limit=25')).dati;
}