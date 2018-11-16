import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import RatingComponent from './Rating';

const styles = theme => ({
    card: {
      boxShadow: '0 0 10px 2px rgba(0,0,0,0.18) !important',
      margin: '5px',
      backgroundColor: '#F6F6F7'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      padding: 12,
      position: 'relative',
      minWidth: 500
    },
    cover: {
      minWidth: 130,
      minHeight: 200,
      backgroundSize: 'contain'
    },
    title: {
      fontSize: theme.typography.pxToRem(14),
      flexBasis: '33.33%',
        flexShrink: 0,
        marginTop: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '30ch',
        fontWeight: 'bold'
    },
    shelfTitle: {
        textAlign: 'center',
        fontSize: theme.typography.pxToRem(14)
    },
    root: {
        flexGrow: 1,
    },
    description: {
        borderLeft: '6px solid #64B5F6',
        paddingLeft: '16px',
        fontStyle: 'italic',
        position: 'relative',
        margin: '18px auto 18px auto',
        width: '50%'
    }
});

class StartupDetails extends Component {
    state = {
        shouldUpdate: false,
        firebaseRatingId: ''
    }
    handleUpdateState = (ratingId) => {
        this.setState({shouldUpdate: true, firebaseRatingId: ratingId});
    }
    render () {
        const { allStartups, params, classes } = this.props;
        const { shouldUpdate, firebaseRatingId } = this.state;
        const startup = allStartups.find(startup => startup.name.replace(/\s/g, '').toLowerCase() === params.startup);
        const reviewTypes = [{
            text: 'Proposta',
            field: 'proposta'
        }, {
            text: 'Apresentação / Pitch',
            field: 'apresentacaoPitch'
        }, {
            text: 'Desenvolvimento',
            field: 'desenvolvimento'
        }];

        return (
            <div className="startup">
                <Card className={classes.card} color="inherit" aria-label="Open drawer">
                    <div className="details">
                        <CardMedia
                            className={classes.cover}
                            image={startup.imageUrl}
                            title={startup.name}
                        />
                        <CardContent>
                            <Typography variant="h4" align="center">
                                {startup.name}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" align="center">
                                {startup.Segment.name}
                            </Typography>
                            <Typography variant="body1" className={classes.description} align="left" paragraph={true}>
                                {startup.description}
                            </Typography>
                            {reviewTypes.map((type) => (
                                <RatingComponent
                                    key={type.field}
                                    type={type}
                                    startup={startup}
                                    firebaseRatingId={firebaseRatingId}
                                    shouldUpdate={shouldUpdate}
                                    handleShouldUpdate={this.handleUpdateState}
                                />
                            ))}
                        </CardContent>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(StartupDetails);