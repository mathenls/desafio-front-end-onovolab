import React, { Component } from 'react';
import Rating from 'react-rating';
import Typography from '@material-ui/core/Typography';

class RatingComponent extends Component {
    state = {
        rating: 0,
        averageRating: 0,
        ratingsCount: 0,
        rated: 0,
        yourRating: 0
    }
    handleChange = (value) => {
        this.setState((currentState) => {
            const { averageRating, ratingsCount, rated } = currentState;
            const average = ratingsCount === 0
                            ? value.toFixed(1)
                            : (((averageRating * ratingsCount) + value) / (ratingsCount + 1)).toFixed(1)

            return ({
                rating: average,
                averageRating: average,
                ratingsCount: !rated ? ratingsCount + 1 : ratingsCount || 1,
                rated: true,
                hovered: true,
                yourRating: value
            })
        });
    }
    handleHover = (value) => {
        value ? this.setState((currentState) => ({
            rating: currentState.yourRating,
            hovered: true
        })) : this.setState((currentState) => ({
            rating: currentState.averageRating,
            hovered: false
        }))
    }
    render() {
        const { rating, ratingsCount, hovered, rated } = this.state;
        const { text } = this.props;

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
                            fractions={10}
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