import {
    Environment,
    Network,
    RecordSource,
    Store,
  } from 'relay-runtime';

  function fetchQuery(
    operation,
    variables,
  ) {
    return fetch('https://startups-project-mytvsxrgeb.now.sh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
        operationName: operation.name
      }),
    }).then(response => {
      return response.json();
    });
  }

  const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });

  export default environment;