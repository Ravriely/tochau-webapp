import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAA7TDmyg3BOIY4XuNS_ayvVOikTVfMLC0",
	authDomain: "tochau-ab45e.firebaseapp.com",
	projectId: "tochau-ab45e",
	storageBucket: "tochau-ab45e.appspot.com",
	messagingSenderId: "239074637095",
	appId: "1:239074637095:web:612bf57a6b29cc32772502",
	measurementId: "G-S61954XMWB"
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' });
export async function GoogleSignIn(): Promise<UserCredential> {
	const auth = getAuth();

	return await signInWithPopup(auth, provider);
}