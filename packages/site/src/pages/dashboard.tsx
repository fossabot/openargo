import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import ky from 'ky-universal'
import { Voto } from '@openargo/core'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

const Sections = () => {
    return (
        <div>
            <Divider />
            <List>
                {['Cosa è successo oggi?', 'Assense giornaliere',
                    'Voti giornalieri', 'Note disciplinari', 'Voti scrutinio',].map((text, index) => (
                        <ListItem button key={text} onClick={() => { console.log('click') }}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
            </List>
            <Divider />
            <List>
                {['Compiti assegnati', 'Orario classe', 'Ricevimento docenti', 'Bacheca'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Documenti Alunno', 'Documenti docenti',
                    'Dati anagrafici', 'Informazioni'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
            </List>
        </div>
    )
}

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

export default function ClippedDrawer() {
    const classes = useStyles();

    const [voti, setVoti] = useState<Voto[]>([dummy])

    useEffect(() => {
        const getVoti = async () => {
            const headers = JSON.parse(localStorage.getItem('argo-headers'))
            const response: Voto[] = await ky.post('/api/voti', { json: { headers } }).json()
            console.log(response[0])
            setVoti(response)
        }
        getVoti()

    }, [])

    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Clipped drawer
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <Sections />
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
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
            </main>
        </div>
    );
}
