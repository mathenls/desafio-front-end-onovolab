import React, { Component } from 'react';
import Rating from 'react-rating';
import Typography from '@material-ui/core/Typography';

class RatingComponent extends Component {
    state = {
        rating: 0,
        averageRating: 0,
        ratingsCount: 0,
        rated: false,
        yourRating: 0,
    }

    handleHover = (value) => {
        value ? this.setState((currentState) => ({
            hovered: true
        })) : this.setState((currentState) => ({
            hovered: false
        }))
    }
    handleChange = (value) => {
        const { field } = this.props.type;

        this.setState({
            rating: value,
            rated: true
        }, () => {
            this.props.handleRatedField(field, value);
        });
    }
    render() {
        const { hovered  } = this.state;
        const { text } = this.props.type;
        const { rating } = this.props;

        return (
            <div>
                <div className={hovered ? 'rating-stars-rated' : 'rating-stars'}>
                    <Typography variant="h5" color="textSecondary" align="center">
                        {text}
                    </Typography>
                    <div style={{margin: '4px auto 12px auto', width: '75%', textAlign: 'center'}}>
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
        );
    }

}

export default RatingComponent