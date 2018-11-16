import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Startup from './Startup';

const styles = theme => ({
    root: {
      flexGrow: 1,
    }
});

const StartupsList = (props) => {
    let { allStartups, classes } = props;
    allStartups = allStartups.map((item) => ({
        ...item,
        rated: localStorage.getItem(item.name) !== null
    }));
    const ratings = allStartups.filter(startup => startup.rated).length;

    return (
        <div>
            <Typography variant="h5" color="textSecondary" align="center" paragraph={true}>
                {ratings < allStartups.length ? (
                    <span> <b>{`${ratings}`}</b> de <b>{`${allStartups.length}`}</b> startups avaliadas</span>
                ) : (
                    <span> Você avaliou todas as startups! Obrigado! </span>
                )}
            </Typography>
            <Grid container className={classes.root} spacing={16}>
                {
                    allStartups.map((startup) =>
                        <Grid item xs={12} key={startup.name}>
                            <Grid container justify="center" spacing={0}>
                                <Startup startup={startup} />
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(StartupsList);
