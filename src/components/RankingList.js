import React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RankingListItem from './RankingListItem';

const RankingList = (props) => {
    const { orderedTypes } = props;
    return (
        orderedTypes.map((type) => (
            <CardContent style={{padding: 0}}>
                <Grid container  spacing={16}>
                    <Grid item xs={12} key={type.field}>
                        <List>
                            <Typography variant="h6" align="center" paragraph={true}>
                                {type.text}
                            </Typography>
                            {type.ratings.map((startup, position) => (
                                <RankingListItem startup={startup} position={position} type={type} />
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        ))
    );
}

export default RankingList


