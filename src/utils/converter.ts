import firebase from "firebase/compat/app";

export const converter = <T extends unknown>() => {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => {
      return snap.data() as T;
    },
  };
};