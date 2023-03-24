import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, Auth } from "firebase/auth";
import { getDatabase, ref, onValue, set, DataSnapshot, update } from "firebase/database";

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
const provider = new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' });

export function getFireAuth(): Promise<Auth> {
	return new Promise(function (resolve, reject) {
		const auth = getAuth(app);
		auth.onAuthStateChanged(function (user) {
			resolve(auth);
		});
	});
}

export async function GoogleSignIn(): Promise<boolean> {
	const auth = await getFireAuth();

	if (auth.currentUser == null)
		await signInWithPopup(auth, provider).catch(() => { console.log("error on login") });
	else
		return true;
	if (auth.currentUser != null)
		return true;
	alert("Authentication failed. Be sure that you're connected to internet and your Google account is up.");
	return false;
}

export async function readFireData(path: string): Promise<any> {
	const auth = await getFireAuth();
	const userId = auth.currentUser?.uid;
	const db = getDatabase(app, "https://tochau-ab45e-default-rtdb.europe-west1.firebasedatabase.app");
	const call = ref(db, `users/${userId}/${path}`);
	let data = null;

	return new Promise(function (resolve, reject) {
		onValue(call, (snapshot: DataSnapshot) => {
			data = snapshot.val();
			resolve(data);
		});
	})
}

export function writeUserData(userId: string, path: string, json: object) {
	const db = getDatabase(app, "https://tochau-ab45e-default-rtdb.europe-west1.firebasedatabase.app");

	(path == null) ? path = "" : null;
	update(ref(db, `users/${userId}/${path}`), json);
	console.log("wrote");
}