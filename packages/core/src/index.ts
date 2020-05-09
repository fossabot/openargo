import got from 'got'
import moment from 'moment'
import { URLSearchParams } from 'url';

const baseHeaders = {
    'x-version': '2.1.0',
    'x-key-app': 'ax6542sdru3217t4eesd9',
    'x-produttore-software': 'ARGO Software s.r.l. - Ragusa',
    'X-Requested-With': 'XMLHttpRequest',
    'x-app-code': 'APF',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
};

async function argoRequest(endpoint: string, headers: any, params = '') {
    const prefixUrl = 'https://www.portaleargo.it/famiglia/api/rest';
    const searchParams = new URLSearchParams(`_dc=${moment().valueOf()}&&${params}&&page=1&&start=0&&limit=25`);
    try {
        const response = await got(endpoint, { prefixUrl, searchParams, headers })
        return JSON.parse(response.body)
    } catch (error) {
        console.log(error.response.body)
        console.log(searchParams.toString())
    }

}

async function verify() {
    return await argoRequest('verifica', baseHeaders)
}

export async function login(code: string, username: string, password: string) {
    const loginHeaders = {
        ...baseHeaders,
        'x-pwd': password,
        'x-auth-token': '',
        'x-cod-min': code,
        'x-user-id': username
    }

    const data = await argoRequest('login', loginHeaders)

    const fullHeaders = {
        ...baseHeaders,
        'x-prg-scheda': '0',
        'x-auth-token': data['token'],
        'x-cod-min': code,
        'x-prg-scuola': '0',
        'x-prg-alunno': '0'
    };

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
    codVotoPratico: 'S' | 'N' | 'P',
    decValore: number,
    codMin: string,
    desProva: string,
    codVoto: string,
    numAnno: number,
    prgAlunno: number,
    desCommento: string,
    docente: string
}

export interface Giorno {
    dati: any,
    giorno: string,
    numAnno: number,
    prgAlunno: number,
    prgScheda: number,
    prgScuola: number,
    tipo: string,
    titolo: string,
    ordine: number,
    codMin: string
}

export interface ArgoResponse<T> {
    dati: T[],
    abilitazioni: any,
    nuoviElementi: number
}

export async function getVoti(headers: any): Promise<ArgoResponse<Voto>> {
    return await argoRequest('votigiornalieri', headers);
}

export async function getGiorno(headers: any): Promise<ArgoResponse<Giorno>> {
    return await argoRequest('oggi', headers, 'datGiorno=2020-05-09');
}
