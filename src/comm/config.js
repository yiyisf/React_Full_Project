/**
 * Created by zgx on 2017/6/23.
 */
import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyBGLNP9QB_SXLxQgHxE0dmgFe-a01tPVsk",
    authDomain: "yiyisandra.firebaseapp.com",
    databaseURL: "https://yiyisandra.firebaseio.com",
    projectId: "project-1731787035673686380",
    storageBucket: "project-1731787035673686380.appspot.com",
    messagingSenderId: "844858131123"
};

const fb = firebase.initializeApp(config);

export default fb;