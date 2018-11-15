import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
      boxShadow: '0 0 10px 2px rgba(0,0,0,0.18) !important',
      margin: '12px',
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
      minWidth: 210
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
    }
});

const Startup = (props) => {
    const { startup, classes } = props;
    return (
        <div className="startup">
            <Card className={classes.card}>
                <div className="details">
                    <CardMedia
                        className={classes.cover}
                        image={startup.imageUrl}
                        title={startup.name}
                    />
                    <CardContent>
                        <Typography variant="h4" color="textSecondary" align="center">
                            {startup.name}
                        </Typography>
                        <Typography variant="h6" align="center">
                            {startup.Segment.name}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Startup);