import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Startup from './Startup';

const styles = theme => ({
    root: {
      flexGrow: 1,
    }
});

const StartupsList = (props) => {
    const { allStartups, classes } = props;
    return (
        <Grid container className={classes.root} spacing={16}>
            {
                allStartups.map((startup) =>
                    <Grid item xs={12} key={startup.name}>
                        <Grid container xs={12} justify="center" spacing={0}>
                            <Startup startup={startup} />
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    );
}

export default withStyles(styles, { withTheme: true })(StartupsList);
