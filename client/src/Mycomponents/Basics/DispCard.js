import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  }));

const DispCard = (props) => {
    const classes = useStyles();
    return (
        <Grid container spacing={3} style={{'marginBottom':'70px'}}>
                {props.arr.map((item,key) => (
                <Grid item key={key} xs={12} sm={6}>
                    <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2" style={{'fontFamily':'Raleway'}}>
                        {item.pn}
                        </Typography>
                        <Typography style={{'fontFamily':'Raleway'}}>
                        {item.qual}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" target="_blank" href={item.more} color="primary" style={{'fontFamily':'Raleway','backgroundColor':'#082032','color':'white'}} >
                          Details
                        </Button>
                        <Button size="medium" color="primary" style={{'fontFamily':'Raleway','backgroundColor':'#082032','color':'white'}}>
                          Apply
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
    )
}

export default DispCard
