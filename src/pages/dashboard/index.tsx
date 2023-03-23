import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Dashboard.module.css';
import { Auth, getAuth } from 'firebase/auth';
import { getFireAuth, GoogleSignIn, readFireData, writeUserData } from '@/services/firebase';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

async function accessDashboard() {
	let auth: Auth;
	let data = null;

	if (await GoogleSignIn() == false) return window.location.href = "/";
	auth = await getFireAuth();
	data = await readFireData();
	if (auth.currentUser == null) return window.location.href = "/";
	console.log(data);
	if (data == null) {
		writeUserData(auth.currentUser.uid, null, {
			username: auth.currentUser.displayName,
			email: auth.currentUser.email,
			profile_picture: auth.currentUser.photoURL
		});
	}
}

export default function Dashboard() {
	return (
		<>
			<Head>
				<title>Tochau</title>
				<meta name="description" content="The next generation of organization app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.heading}>
					<h1>Tochau</h1>
					<h2>The next generation of organization apps</h2>
				</div>

				<div className={styles.center}>
					<a
						href="#"
						onClick={accessDashboard}
						className={styles.button}
					>
						<h2 className={inter.className}>
							Start Now <span>-&gt;</span>
						</h2>
					</a>
				</div>

				<div className={styles.grid}>
					<a
						href="#"
						className={styles.card}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							Tasks Management
							<Image
								src="https://img.icons8.com/fluency/48/null/bookmark-ribbon.png"
								alt="Bookmark Icon"
								className={styles.cardIcon}
								width={32}
								height={32}
								priority
							/>
						</h2>
						<p className={inter.className}>
							Organize yourself or your team with our task management dashboard.
						</p>
					</a>


					<a
						href="#"
						className={styles.card}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							InApp Chatting
							<Image
								src="https://img.icons8.com/fluency/48/null/speech-bubble.png"
								alt="Speach Bubble Icon"
								className={styles.cardIcon}
								width={32}
								height={32}
								priority
							/>
						</h2>
						<p className={inter.className}>
							Share your troughts and ideas directly in our app for each task.
						</p>
					</a>


					<a
						href="#"
						className={styles.card}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							Events Planner
							<Image
								src="https://img.icons8.com/fluency/48/null/calendar.png"
								alt="Bookmark Icon"
								className={styles.cardIcon}
								width={32}
								height={32}
								priority
							/>
						</h2>
						<p className={inter.className}>
							Plan your outcoming patches, meetings and more in our modular planner.
						</p>
					</a>


					<a
						href="#"
						className={styles.card}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							Tasks Management
							<Image
								src="https://img.icons8.com/fluency/48/null/lock-2.png"
								alt="Free and Secure"
								className={styles.cardIcon}
								width={32}
								height={32}
								priority
							/>
						</h2>
						<p className={inter.className}>
							We protect your data with account login from Google or Microsoft.
						</p>
					</a>
				</div>
			</main>
		</>
	)
}
