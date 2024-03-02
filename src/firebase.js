const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccountKey = require('../serviceAccountKey.json');

const app = initializeApp({ credential: cert(serviceAccountKey)});

const db = getFirestore(app);

module.exports = { db };