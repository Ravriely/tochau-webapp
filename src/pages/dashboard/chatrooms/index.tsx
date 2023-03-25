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
    const [ chatrooms, setChatrooms ] = useState(Array<any>);

    const loadDashboard = async function (auto: boolean) {
        if (auto && username != "@") return;
        let data = null;
        let auth: Auth;

        if (await GoogleSignIn() == false) return;
        auth = await getFireAuth();
        data = await readFireData("chatrooms");
        if (data == null)
            return window.location.href = "/";
        if (auth.currentUser == null) return;
        console.log(data);
        // get and display username
        if (auth.currentUser.displayName != null)
            setUsername(`@${auth.currentUser.displayName}`);
        // get and display chatrooms
        if (data.rooms != null && auth.currentUser != null) {
            let rooms: Array<any> = [];

            for (let _room = 0; _room < data.rooms.length; _room++)
                rooms.push({
                    name: data.rooms[_room].name,
                    id: data.rooms[_room].id
                });
            setChatrooms(rooms);
        }
    }

    loadDashboard(true);

    return (
        <>
            <Head>
                <title>Tochau - chatrooms Dashboard</title>
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
                    {chatrooms.map(prop =>
                        <a
                            href={`/dashboard/chatrooms/room?chat=${prop.id}`}
                            className={styles.card}
                            key={prop.name}
                        >
                            <h2 className={inter.className}>
                                {prop.name} <span>-&gt;</span>
                            </h2>
                        </a>
                    )}
                </div>
            </main>
        </>
    )
}
