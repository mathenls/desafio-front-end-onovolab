import React, { Component } from 'react';
import './App.css';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from './environment';
import Loading from './components/Loading';
import AppTopMenu from './components/AppTopMenu';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StartupsList from './components/StartupsList';
import StartupDetails from './components/StartupDetails';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
	marginLeft: -12,
	marginRight: 20,
  }
});

class App extends Component {
	render() {
    	const  { classes } = this.props;

    	return (
			<div>
				<Route exact path='/' render={() => (
					<div>
						<AppTopMenu />
						<div className="app-body">
							<Typography variant="h5" align="center" paragraph={true}>
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
											return <StartupsList allStartups={[...allStartups]} />;
										}
									}}
								/>
							</Grid>
						</div>
					</div>
				)}
			/>
			<Route path='/:startup' render={({ location, match }) => (
				<div>
					<AppTopMenu isDetailPage={true}/>
					<Grid className={classes.root}>
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
									return <StartupDetails allStartups={allStartups} params={match.params} />;
								}
							}}
						/>
					</Grid>
				</div>
			)}/>
		</div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);