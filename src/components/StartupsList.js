import React from 'react';
import Grid from '@material-ui/core/Grid';
import Startup from './Startup';

const StartupsList = (props) => {
    const { allStartups } = props;
    return (
        allStartups.map((startup) =>
            <div key={startup.name}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Startup startup={startup} />
                    </Grid>
                </Grid>
            </div>
        )
    );
}

export default StartupsList;
