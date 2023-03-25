import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Tasksboards.module.css';
import { Auth } from 'firebase/auth';
import { getFireAuth, GoogleSignIn, readFireData } from '@/services/firebase';
import React, { useState } from 'react';
import { accessDashboard } from '../..';

const inter = Inter({ subsets: ['latin'] });

export default function ChatRoomsDashboard() {
    const [ username, setUsername ] = useState("@");
    const [ chats, setChats ] = useState(Array<any>);

    const loadDashboard = async function (auto: boolean) {
        if (auto && username != "@") return;
        let data = null;
        let auth: Auth;
        let room = new URLSearchParams(document.location.search).get("chat");

        if (room == null)
            return window.location.href = "/dashboard/chatrooms"
        if (await GoogleSignIn() == false) return;
        auth = await getFireAuth();
        data = await readFireData(`chatrooms/rooms/${room}`);
        if (data == null)
            return window.location.href = "/";
        if (auth.currentUser == null) return;
        console.log(data);
        // get and display username
        if (auth.currentUser.displayName != null)
            setUsername(`@${auth.currentUser.displayName}`);
        // get and display tasksboards
        if (data != null && auth.currentUser != null) {
            let chats: Array<any> = [];

            chats.push({
                name: data.name,
                description: data.description,
                id: data.id
            });
            setChats(chats);
        }
    }

    loadDashboard(true);

    return (
        <>
            <Head>
                <title>Tochau - Tasksboards Dashboard</title>
                <meta name="description" content="The next generation of organization app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.topnav}>
                    <ul className={styles.topbtn} onClick={accessDashboard}>Dashboard</ul>
                    <ul className={styles.topbtn} onClick={() => loadDashboard(false)}>Manual Reload</ul>
                </div>

                <div className={styles.center}>
                    <h2 className={inter.className}>
                        Hello, {username}
                    </h2>
                </div>

                <div className={styles.grid}>
                    {chats.map(prop =>
                        <a
                            href={`#`}
                            className={styles.card}
                            key={prop.id}
                        >
                            <h2 className={inter.className} key={prop.name}>
                                {prop.name} <span>-&gt;</span>
                            </h2>
                            <p className={inter.className} key={prop.description}>
                                {prop.description}
                            </p>
                        </a>
                    )}
                </div>
            </main>
        </>
    )
}
