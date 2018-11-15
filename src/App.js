import React, { Component } from 'react';
import './App.css';
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from './environment';
import Loading from './components/Loading';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StartupsList from './components/StartupsList';
import StartupDetails from './components/StartupDetails';
import { Route } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class App extends Component {
  render() {
    const  { classes } = this.props;

    return (
		<div>
			<Route exact path='/' render={() => (
				<div>
					<Typography variant="h5" align="center">
						Escolha sua StartUp!
					</Typography>
					<Grid container className={classes.root} spacing={16}>
						<QueryRenderer
							environment={environment}
							query={graphql`
							query AppQuery {
								allStartups {
									name
									teamCount
									description
									imageUrl
									annualReceipt
									Segment {
										name
										code
									}
								}
							}
							`}
							variables={{}}
							render={({error, props}) => {
								if (error) {
									return <div>Error!</div>;
								}
								if (!props) {
									return <Loading />;
								} else {
									const { allStartups } = props;
									return <StartupsList allStartups={allStartups} />;
								}
							}}
						/>
					</Grid>
				</div>
			)}

		/>
		<Route path='/:startup' render={({ location, match }) => (
			<Grid className={classes.root} spacing={0}>
				<QueryRenderer
					environment={environment}
					query={graphql`
					query AppQuery {
						allStartups {
							name
							teamCount
							description
							imageUrl
							annualReceipt
							Segment {
								name
								code
							}
						}
					}
					`}
					variables={{}}
					render={({error, props}) => {
						if (error) {
							return <div>Error!</div>;
						}
						if (!props) {
							return <Loading />;
						} else {
							const { allStartups } = props;
							return <StartupDetails allStartups={allStartups} params={match.params}/>;
						}
					}}
				/>
			</Grid>
		)}/>
	</div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);