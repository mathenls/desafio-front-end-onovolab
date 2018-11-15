import React, { Component } from 'react';
import './App.css';
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from './environment';
import Loading from './components/Loading';
import Startup from './components/Startup';

class App extends Component {
  render() {
    return (
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
            return allStartups.map((startup) => (
              <Startup startup={startup} />
            ));
          }

        }}
      />
    );
  }
}

export default App;