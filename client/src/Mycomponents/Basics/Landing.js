import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Footer } from '../Basics/Footer'
import { Header } from '../Basics/Header'
import Button from '@material-ui/core/Button';
import DispCard from './DispCard';

const useStyles = makeStyles((theme) => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      
    }
  }));

const Pforall = () => {
    const classes = useStyles();
    const [message,setMessage] = useState([])
   

    return (
        <div>
            <Header/>

            <main >
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={{'fontFamily':'Raleway'}}>
                Album layout
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph style={{'fontFamily':'Raleway'}}>
                Something short and leading about the collection below—its contents, the creator, etc.
                Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                entirely.
                </Typography>
                <div className={classes.heroButtons}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                    <Button variant="contained" color="primary" style={{'fontFamily':'Raleway','backgroundColor':'#082032','color':'white'}}>
                        Main call to action
                    </Button>
                    </Grid>
                    <Grid item>
                    <Button variant="outlined" color="primary" style={{'fontFamily':'Raleway','backgroundColor':'#082032','color':'white'}}>
                        Secondary action
                    </Button>
                    </Grid>
                </Grid>
                </div>
            </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
              <DispCard arr={message} />
            </Container>
        </main>
        <Footer/>
            
        </div>
    )
}

export default Pforall
