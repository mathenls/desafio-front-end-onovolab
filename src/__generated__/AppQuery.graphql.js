/**
 * @flow
 * @relayHash df4fc0bb9fcf89633a94f34c8dfe056c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +allStartups: ?$ReadOnlyArray<?{|
    +name: string,
    +teamCount: number,
    +description: string,
    +imageUrl: string,
    +annualReceipt: number,
    +Segment: ?{|
      +name: string,
      +code: string,
    |},
  |}>
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
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
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "teamCount",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "imageUrl",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "annualReceipt",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AppQuery",
  "id": null,
  "text": "query AppQuery {\n  allStartups {\n    name\n    teamCount\n    description\n    imageUrl\n    annualReceipt\n    Segment {\n      name\n      code\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allStartups",
        "storageKey": null,
        "args": null,
        "concreteType": "Startup",
        "plural": true,
        "selections": [
          v0,
          v1,
          v2,
          v3,
          v4,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "Segment",
            "storageKey": null,
            "args": null,
            "concreteType": "Segment",
            "plural": false,
            "selections": [
              v0,
              v5
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allStartups",
        "storageKey": null,
        "args": null,
        "concreteType": "Startup",
        "plural": true,
        "selections": [
          v0,
          v1,
          v2,
          v3,
          v4,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "Segment",
            "storageKey": null,
            "args": null,
            "concreteType": "Segment",
            "plural": false,
            "selections": [
              v0,
              v5,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b019d3b9b44fa7ad2b489da0e8e609ab';
module.exports = node;
