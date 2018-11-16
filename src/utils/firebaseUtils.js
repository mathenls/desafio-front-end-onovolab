import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCraZ2o33R7boLFSDeaf1GIjspdzmTJxq0',
    authDomain: 'desafio-onovolab.firebaseapp.com',
    databaseURL: 'https://desafio-onovolab.firebaseio.com',
    projectId: 'desafio-onovolab',
    storageBucket: '',
    messagingSenderId: '202603122788'
};

export const firebaseImpl = firebase.initializeApp(config);
export const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);