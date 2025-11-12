import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArl0odIlbzbYryFBXmhRuLKfFddnOliqQ",
  authDomain: "oncode-e9bd6.firebaseapp.com",
  projectId:  "oncode-e9bd6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
