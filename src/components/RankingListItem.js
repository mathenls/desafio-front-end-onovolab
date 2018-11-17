import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Rating from 'react-rating';
import Typography from '@material-ui/core/Typography';

const RankingListItem = (props) => {
    const { startup, position, type } = props;

    return (
        <ListItem divider={true} style={{paddingRight: '2px'}}>
            <Typography variant="h5" align="center" style={{marginRight: '8px'}}>
                {position + 1}º
            </Typography>
            <Avatar src={startup.imageUrl} />
            <ListItemText primary={startup.name} secondary={startup.Segment.name} style={{flex: '1 1 0'}} />
            <ListItemText disableTypography primary={<Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                initialRating={parseFloat(startup[type.field])}
                readonly={true}
                className="rating-stars"
            />} secondary={<Typography variant="subtitle1" color="textSecondary" align="center">
                    {startup[type.field]}/5
                </Typography>}
                style={{flex: '1 1 0', padding: '0 4px'}}
            />
        </ListItem>
    );
}

export default RankingListItem
