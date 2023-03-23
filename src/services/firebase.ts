import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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
export async function GoogleSignIn() {
	const auth = getAuth();

	await signInWithPopup(auth, provider)
	.then((result) => {
		
		// This gives you a Google Access Token. You can use it to access Google APIs.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		var token;
		(credential != null) ? token = credential.accessToken : null;
		// The signed-in user info.
		const user = result.user;
		// IdP data available using getAdditionalUserInfo(result)
		// ...
	}).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		// ...
	});;
}