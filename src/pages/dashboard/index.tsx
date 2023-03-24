import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Dashboard.module.css';
import { Auth, User } from 'firebase/auth';
import { getFireAuth, GoogleSignIn, readFireData, writeUserData } from '@/services/firebase';
import React, { useState } from 'react';
import { accessDashboard } from '..';

const inter = Inter({ subsets: ['latin'] });
let user: User | null;

async function loadDashboard() {
    let auth: Auth;
    let data = null;

    if (await GoogleSignIn() == false) return user = null;
    auth = await getFireAuth();
    data = await readFireData();
    if (auth.currentUser == null) return user = null;
    console.log(data);
    if (data == null) {
        writeUserData(auth.currentUser.uid, null, {
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
            profile_picture: auth.currentUser.photoURL
        });
    }
    user = auth.currentUser;
}

export default function Dashboard() {
    const [ username, setUsername ] = useState("e");
    const getUsername = async function () {
        await loadDashboard();
        if (user == null || user.displayName == null)
            return setUsername("null");
        setUsername(user.displayName);
    }

    getUsername();

    return (
        <>
            <Head>
                <title>Tochau - Dashboard</title>
                <meta name="description" content="The next generation of organization app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.topnav}>
                    <ul className={styles.topbtn} onClick={accessDashboard}>Dashboard</ul>
                    <ul className={styles.topbtn} onClick={loadDashboard}>Manual Reload</ul>
                </div>

                <div className={styles.center}>
                    <h2 className={inter.className}>
                        Hello, {username}
                    </h2>
                </div>

                <div className={styles.grid}>
                    <a
                        href="#"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className={inter.className}>
                            Organize yourself or your team with our task management dashboard.
                        </p>
                        <h2 className={inter.className}>
                            Tasks Managers <span>-&gt;</span>
                        </h2>
                    </a>


                    <a
                        href="#"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className={inter.className}>
                            Share your troughts and ideas directly in our app for each task.
                        </p>
                        <h2 className={inter.className}>
                            Chatrooms <span>-&gt;</span>
                        </h2>
                    </a>


                    <a
                        href="#"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className={inter.className}>
                            Plan your outcoming patches, meetings and more in our modular planner.
                        </p>
                        <h2 className={inter.className}>
                            Events Planner <span>-&gt;</span>
                        </h2>
                    </a>


                    <a
                        href="#"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className={inter.className}>
                            We protect your data with account login from Google or Microsoft.
                        </p>
                        <h2 className={inter.className}>
                            Confidentiality <span>-&gt;</span>
                        </h2>
                    </a>
                </div>
            </main>
        </>
    )
}
