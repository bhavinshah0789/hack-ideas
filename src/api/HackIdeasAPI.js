// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
// constants
import EventSortFilterConstants from '../data/EventSortFilterConstants';

const HackIdeasAPIConstants = {
  firebaseApp: null,
  firebaseDb: null,
};

const HackIdeasAPI = {
  initializeFirebaseApp: async () => {
    const firebaseConfig = {
      apiKey: "AIzaSyAv19KwhpBIOktAqDM1ob8h0TNwFHzVmMw",
      authDomain: "hack-ideas-333.firebaseapp.com",
      // The value of `databaseURL` depends on the location of the database
      databaseURL: "https://hack-ideas-333-default-rtdb.firebaseio.com",
      projectId: "hack-ideas-333",
      storageBucket: "hack-ideas-333.appspot.com",
      messagingSenderId: "418459786395",
      // appId: "APP_ID",
      // // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
      // measurementId: "G-MEASUREMENT_ID",
    };

    HackIdeasAPIConstants.firebaseApp = initializeApp(firebaseConfig);
    HackIdeasAPIConstants.firebaseDb = getFirestore(HackIdeasAPIConstants.firebaseApp);
  },
  addEvent: async (eventData) => {
    const eventRef = doc(HackIdeasAPIConstants.firebaseDb, "events", eventData.eventId);
    await setDoc(eventRef, eventData);
  },
  getEvents: async (sortFilter, setEventList) => {
    const eventCollection = collection(HackIdeasAPIConstants.firebaseDb, 'events');
    sortFilter = sortFilter || EventSortFilterConstants.eventCreationDate;
    let eventQuery = await query(eventCollection, orderBy(sortFilter, "desc"));
    const eventSnapshot = await getDocs(eventQuery);
    const eventList = await eventSnapshot.docs.map(doc => doc.data());
    return eventList;
  },
};

export default Object.freeze(HackIdeasAPI);
