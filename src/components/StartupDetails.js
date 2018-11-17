import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import RatingComponent from './Rating';
import FirebaseService from "../services/firebaseService";

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
        width: '75%'
    },
    button: {
        display: 'block',
        justifyContent: 'center'
    }
});

class StartupDetails extends Component {
    state = {
        startup: this.props.allStartups.find(startup => startup.name.replace(/\s/g, '').toLowerCase() === this.props.params.startup),
        shouldUpdate: false,
        firebaseRatingId: '',
        proposta: 0,
        apresentacaoPitch: 0,
        desenvolvimento: 0,
        enableSubmit: false,
        ratingsObject: {}
    }
    async componentDidMount() {
        const { name } = this.state.startup;
        const rating = sessionStorage.getItem(`${name}`);

        if (rating !== null) {
            const data = await FirebaseService.getUniqueDataBy('avaliacoes', rating);
            const { proposta, apresentacaoPitch, desenvolvimento } = data;

            if (proposta || apresentacaoPitch || desenvolvimento) {
                this.handleUpdateState(rating);
                this.setState({
                    proposta,
                    apresentacaoPitch,
                    desenvolvimento
                }, () => {
                    this.checkIfAllTypesAreRated();
                })
            }
        }
    }

    handleUpdateState = (ratingId) => {
        this.setState({shouldUpdate: true, firebaseRatingId: ratingId});
    }

    handleRatedField = (field, value) => {
        this.setState({[field]: value}, () => {
            this.checkIfAllTypesAreRated();
        });
    }

    checkIfAllTypesAreRated = () => {
        const { proposta, apresentacaoPitch, desenvolvimento, startup } = this.state;

        if (proposta && apresentacaoPitch && desenvolvimento) {
            this.setState({
                enableSubmit: true,
                ratingsObject: {
                    nomeStartup: startup.name,
                    proposta,
                    apresentacaoPitch,
                    desenvolvimento
                }
            });
        }
    }

    setNewRatingId = (name, id) => {
        sessionStorage.setItem(`${name}`, id);
        this.setState({
            firebaseRatingId: id
        });
    }

    handleSubmit = async (object) => {
        const { shouldUpdate, firebaseRatingId } = this.state;
        const { name } = this.state.startup;

        if (shouldUpdate) {
            try {
                await FirebaseService.updateData(firebaseRatingId, 'avaliacoes', object);
                console.log(object);
                console.log(`Atualizou a avaliação da startup ${name} com sucesso. ID da avaliação no Firebase: ${firebaseRatingId}`);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const newId = await FirebaseService.pushData('avaliacoes', object);
                this.handleUpdateState(newId);
                this.setNewRatingId(name, newId);

                console.log(object);
                console.log(`Avaliou a startup ${name} com sucesso. ID da avaliação no Firebase: ${newId}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        const { classes } = this.props;
        const { startup, enableSubmit, ratingsObject, shouldUpdate } = this.state;

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
                            <Typography variant="body1" className={classes.description} align="left">
                                {startup.description}
                            </Typography>
                            {reviewTypes.map((type) => (
                                <RatingComponent
                                    key={type.field}
                                    type={type}
                                    startup={startup}
                                    handleRatedField={this.handleRatedField}
                                    rating={this.state[type.field]}
                                />
                            ))}
                            <Grid container>
                                <Grid item xs={12} style={{textAlign: "center"}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={!enableSubmit}
                                        style={{justifyContent: 'center'}}
                                        onClick={() => this.handleSubmit(ratingsObject)}
                                        size="large"
                                    >
                                        &nbsp;{!shouldUpdate ? 'Submeter Avaliação' : 'Atualizar Avaliação'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(StartupDetails);