import React, { Component } from 'react';
import Rating from 'react-rating';
import Typography from '@material-ui/core/Typography';
import FirebaseService from "../services/firebaseService";

class RatingComponent extends Component {
    state = {
        rating: 0,
        firebaseRatingId: {},
        averageRating: 0,
        ratingsCount: 0,
        rated: false,
        yourRating: 0,
        shouldUpdate: false
    }
    async componentDidMount() {
        const rating = localStorage.getItem(`${this.props.startup.name}`);
        if (rating !== null) {
            const data = await FirebaseService.getUniqueDataBy('avaliacoes', rating);
                this.setState({firebaseRatingId: rating}, () => {
                this.setState({rating: data[this.props.type.field]}, () => {
                    if (data.proposta || data.apresentacaoPitch || data.desenvolvimento) {
                        this.setState({shouldUpdate: true});
                    }
                });
            })
        }
    }
    handleChange = async (value) => {
        this.setState( {
            rating: value,
            rated: true
        }, async () => {
            const { field, text } = this.props.type;
            const { name } = this.props.startup;
            const { firebaseRatingId, shouldUpdate } = this.state;

            if (shouldUpdate) {
                try {
                    await FirebaseService.updateData(firebaseRatingId, 'avaliacoes', field, value);
                    console.log(`Atualizou avaliacao ${firebaseRatingId}, setando a avaliacao de ${text} para ${value}`);
                } catch (err) {
                    console.log(err);
                }
            } else {
                const newId = await FirebaseService.pushData('avaliacoes', {
                    [field]: value,
                    nomeStartup: name
                });
                this.setState({shouldUpdate: true}, () => {
                    console.log(`Criou avaliacao ${newId}, setando a avaliacao de ${text} para ${value}`);
                    localStorage.setItem(`${name}`, newId);
                });
            }
        });
    }
    handleHover = (value) => {
        value ? this.setState((currentState) => ({
            hovered: true
        })) : this.setState((currentState) => ({
            hovered: false
        }))
    }
    render() {
        const { rating, hovered  } = this.state;
        const { text } = this.props.type;

        return (
            <div>
                <div className={hovered ? 'rating-stars-rated' : 'rating-stars'}>
                    <Typography variant="h5" color="textSecondary" align="center">
                        {text}
                    </Typography>
                    <div style={{marginLeft: 'auto', marginRight: 'auto', width: '75%', textAlign: 'center'}}>
                        <Rating
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(value) => {this.handleChange(value)}}
                            initialRating={parseFloat(rating)}
                            onHover={(value) => {this.handleHover(value)}}
                            quiet={!hovered}
                        />
                    </div>

                </div>
            </div>
        )
    }

}

export default RatingComponent