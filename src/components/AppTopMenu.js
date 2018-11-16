import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Favorite from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Score from '@material-ui/icons/Score';
import Star from '@material-ui/icons/Star';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuIcon: {
        marginLeft: -12,
        marginRight: 20,
    },
    menuButton: {
        '&:hover': {
            fontWeight: '700',
            transform: 'scale(1.2)',
            transition: 'transform 0.5s',
        }
    }
});

const AppTopMenu = (props) => {
    const { classes, isDetailPage, isResultsPage } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {isDetailPage ? (
                        <IconButton className={classes.menuButton} component={Link} to="/" color="inherit" aria-label="Menu">
                            <ArrowBack />
                        </IconButton>
                    ) : (
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <Score />
                        </IconButton>
                    )}
                    <Typography variant="h5" color="inherit" className={classes.grow}>
                        1ª StartUp Fest
                    </Typography>
                    <Button color="inherit" component={Link} to='/' className={classes.menuButton}>
                        <Star />
                        &nbsp;Avaliar
					</Button>
                    <Button color="inherit" component={Link} to='/resultados' className={classes.menuButton}>
                        <Favorite />
                        &nbsp;Resultados
					</Button>
                </Toolbar>
            </AppBar>
        </div>
    );

}

export default withStyles(styles, { withTheme: true })(AppTopMenu);
