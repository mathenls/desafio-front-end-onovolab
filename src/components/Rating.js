import React, { Component } from 'react';
import Rating from 'react-rating';
import Typography from '@material-ui/core/Typography';
import FirebaseService from "../services/firebaseService";

class RatingComponent extends Component {
    state = {
        rating: 0,
        averageRating: 0,
        ratingsCount: 0,
        rated: false,
        yourRating: 0,
    }
    async componentDidMount() {
        const { name } = this.props.startup;
        const rating = localStorage.getItem(`${name}`);

        if (rating !== null) {
            const data = await FirebaseService.getUniqueDataBy('avaliacoes', rating);
            this.setState({rating: data[this.props.type.field]}, () => {
                if (data.proposta || data.apresentacaoPitch || data.desenvolvimento) {
                    this.props.handleShouldUpdate(rating);
                }
            });
        }
    }
    handleChange = async (value) => {
        this.setState({
            rating: value,
            rated: true
        }, async () => {
            const { shouldUpdate, firebaseRatingId } = this.props;
            const { field } = this.props.type;
            const { name } = this.props.startup;

            if (shouldUpdate) {
                try {
                    await FirebaseService.updateData(firebaseRatingId, 'avaliacoes', field, value);
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    const newId = await FirebaseService.pushData('avaliacoes', {
                        [field]: value,
                        nomeStartup: name
                    });
                    this.props.handleShouldUpdate(newId);
                    this.setNewRatingId(name, newId);
                } catch (err) {
                    console.log(err);
                }
            }
        });
    }
    setNewRatingId = (name, id) => {
        localStorage.setItem(`${name}`, id);
        this.setState({
            firebaseRatingId: id
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
                    <Typography variant="h5" color="textSecondary" align="center" paragraph={true}>
                        {text}
                    </Typography>
                    <div style={{marginLeft: 'auto', marginRight: 'auto', width: '75%', textAlign: 'center'}}>
                        <Rating
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(value) => {this.handleChange(value)}}
                            initialRating={parseFloat(rating)}
                            onHover={(value) => {this.handleHover(value)}}
                        />
                    </div>

                </div>
            </div>
        )
    }

}

export default RatingComponent