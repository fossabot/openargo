import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form'

import ky from 'ky-universal'
import { Voto } from '@openargo/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

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

const Form = () => {
    const classes = useStyles();

    const [headers, setHeaders] = useState<any>()
    const [voti, setVoti] = useState<Voto[]>([dummy])

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const handleLogin = async (data: Inputs) => {
        console.log(data)
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(handleLogin)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Codice scuola"
                        name="code"
                        autoComplete="codice-scuola"
                        autoFocus
                        inputRef={register({ required: true })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Utente"
                        name="username"
                        autoComplete="username"
                        inputRef={register({ required: true })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        inputRef={register({ required: true })}
                    />

                    <Grid container alignItems='center'>
                        <Grid item xs>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Salva password"
                            />
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                Recupera password
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                </form>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleRequest}

                >
                    Carica Voti
                    </Button>
            </div>
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
        </Container>
    );
}

export default Form