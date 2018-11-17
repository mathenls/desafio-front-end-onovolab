import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FirebaseService from "../services/firebaseService";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import RankingList from './RankingList';

import { orderBy } from 'lodash';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 0.2
    },
    card: {
        boxShadow: '0 0 14px 1px rgba(0,0,0,0.20) !important',
        margin: '2px',
        backgroundColor: '#F6F6F7'
    },
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
            <div className="app-body">
                <Typography variant="h5" align="center" paragraph={true}>
                    Resultados
                </Typography>
                <Card className={classes.card} color="inherit">
                    <RankingList orderedTypes={orderedTypes} />
                </Card>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Results);
