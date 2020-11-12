import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Image from 'material-ui-image'
import './list.css';
const List = () => {
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div>
        <Grid container spacing={24}>
        <Grid item md={3}>
            <Card className={classes.root} id="social">
            <CardContent >
                <Typography className={classes.title} color="textSecondary" gutterBottom>

                <Button variant="contained" color="primary">
        SOCIAL
      </Button>
      <Button variant="outlined" color="secondary">
        OVERTIME
      </Button>
        </Typography>
                {/* <div > */}
                  <MonetizationOnIcon/>
                  {/* </div>
                  <div > */}
                  <Image src="hand.png" id="hand"/>
                  {/* </div> */}
                  <Button variant="outlined">Default</Button>
       
            </CardContent>
        </Card>
        </Grid>
        <Grid item md={12}>
            <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
        </Typography>
                <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
        </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
        </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
          <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
        </Grid>
        </Grid>
        </div>
        
    );
}
export default List;