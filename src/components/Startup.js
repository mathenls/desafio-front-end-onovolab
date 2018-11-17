import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    card: {
        maxWidth: '100vw',
        boxShadow: '0 0 14px 1px rgba(0,0,0,0.20) !important',
        margin: '12px auto 12px auto',
        backgroundColor: '#F6F6F7',
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 0 24px 4px rgba(0,0,0,0.20) !important',
        }
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
    startupImage: {
        width: 300,
        height: 300,
        margin: '0 auto 8px auto',
        objectFit: 'cover',
        border: '2px solid black',
        transition: 'transform 0.3s',
        boxShadow: '0 0 14px 0px rgba(0,0,0,0.20) !important',
        '&:hover': {
            transform: 'scale(1.05)'
        }
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
    root: {
        flexGrow: 1,
    },
    alreadyRated: {
        color: '#4BB543'
    }
});

class Startup  extends Component {
    render () {
        const { startup, classes } = this.props;
        const {name, Segment, rated, imageUrl} = startup;
        const startupRoute = `/startups/${startup.name.replace(/\s/g, '').toLowerCase()}`;

        return (
            <Link to={startupRoute} style={{ textDecoration: 'none' }}>
                <div className="startup">
                    <Card className={classes.card} color="inherit" aria-label="Open drawer">
                        <div className="details">
                            <Avatar src={imageUrl} className={classes.startupImage} />
                            <CardContent>
                                <Typography variant="h5" align="center">
                                    {name}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" align="center" paragraph={rated}>
                                    {Segment.name}
                                </Typography>
                                {rated ? (
                                    <Typography variant="h6" className={classes.alreadyRated} align="center">
                                        Você já avaliou essa startup
                                    </Typography>
                                ) : (
                                    <Typography variant="h6" color="textSecondary" align="center">
                                        Você ainda não avaliou essa startup
                                    </Typography>
                                )}
                            </CardContent>
                        </div>
                    </Card>
                </div>
            </Link>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Startup);