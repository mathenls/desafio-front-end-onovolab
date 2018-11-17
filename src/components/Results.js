import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FirebaseService from "../services/firebaseService";
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { orderBy } from 'lodash';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 0.2
    }
});

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

class Results extends Component {
    state = {
		summarizedRatings: []
	}
	async componentDidMount() {
        const allRatings = await FirebaseService.getAll('avaliacoes');
        const { allStartups } = this.props;

		const summarizedRatings = allStartups.map((startup) => {
            const ratings = allRatings.filter(item => item.nomeStartup === startup.name);
            const proposta = (ratings.reduce((accum, value) => accum + value.proposta, 0) / ratings.length).toFixed(2);
            const apresentacaoPitch = (ratings.reduce((accum, value) => accum + value.apresentacaoPitch, 0) / ratings.length).toFixed(2);
            const desenvolvimento = (ratings.reduce((accum, value) => accum + value.desenvolvimento, 0) / ratings.length).toFixed(2);
            return {
                ...startup,
                proposta: proposta !== 'NaN' ? proposta : '0 (Sem avaliações)',
                apresentacaoPitch: apresentacaoPitch !== 'NaN' ? apresentacaoPitch : '0 (Sem avaliações)',
                desenvolvimento: desenvolvimento !== 'NaN' ? desenvolvimento : '0 (Sem avaliações)'
            }
        });

		this.setState({
			summarizedRatings
		});
	}

    render() {
        const { summarizedRatings } = this.state;
        const { classes } = this.props;
        const orderedTypes = reviewTypes.map(type => {
            return {
                ...type,
                ratings: orderBy(summarizedRatings, [type.field], ['desc'])
            }
        });

        return (
            <div>
                <Grid container className={classes.grow} spacing={16}>
                    {orderedTypes.map((type, index) => (
                        <Grid item xs={8} key={type.field}>
                            <List>
                                <Typography variant="h6" align="center" paragraph={true}>
                                    {type.text}
                                </Typography>
                                {type.ratings.map((startup, position) => (
                                    <ListItem>
                                        <Typography variant="h6" align="center">
                                            {position + 1}º
                                        </Typography>
                                        <Avatar src={startup.imageUrl} />
                                        <ListItemText primary={startup.name} secondary={startup.Segment.name} />
                                        <Typography variant="h6" align="center" color="textSecondary">
                                            {startup[type.field]}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Results);
