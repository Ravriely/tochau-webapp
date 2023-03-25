import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Dashboard.module.css';
import { Auth } from 'firebase/auth';
import { getFireAuth, GoogleSignIn, readFireData, writeUserData } from '@/services/firebase';
import React, { useState } from 'react';
import { accessDashboard } from '..';

const inter = Inter({ subsets: ['latin'] });

export default function Dashboard() {
    const [ username, setUsername ] = useState("@");
    const [ tasksboards, setTasksboards ] = useState(0);
    const [ chatrooms, setChatrooms ] = useState(0);
    const [ evtplanners, setEvtplanners ] = useState(0);
    const [ confidentalerts, setConfidentalerts ] = useState(0);

    const loadDashboard = async function (auto: boolean) {
        if (auto && username != "@") return;
        let auth: Auth;
        let data = null;

        if (await GoogleSignIn() == false) return;
        auth = await getFireAuth();
        data = await readFireData("");
        if (auth.currentUser == null) return;
        console.log(data);
        if (data == null) {
            writeUserData(auth.currentUser.uid, "", {
                username: auth.currentUser.displayName,
                email: auth.currentUser.email,
                profile_picture: auth.currentUser.photoURL,
                tasksboards: {
                    tabs: [
                        {
                            name: "mytab",
                            todos: [
                                {
                                    title: "example of todo",
                                    description: "this todo is an example",
                                    done: 0
                                }
                            ]
                        }
                    ]
                },
                chatrooms: {
                    rooms: [
                        {
                            name: "myroom",
                        }
                    ]
                },
                evtplanners: {
                    planners: [
                        {
                            name: "myevent",
                            activities: [
                                {
                                    title: "myactivity",
                                    description: "example of activity",
                                    from: 1711362499,
                                    to: 1711384099
                                }
                            ]
                        }
                    ]
                },
                confidential: {
                    alerts: [
                        {
                            name: "google account phone number",
                            id: 1,
                            priority: 2,
                            active: 0
                        }
                    ]
                }
            });
            data = await readFireData("");
        }
        // get and display username
        if (auth.currentUser.displayName != null) {
            setUsername(`@${auth.currentUser.displayName}`);
        }
        // get and display tasksboards
        if (data.tasksboards != null && auth.currentUser != null) {
            setTasksboards(data.tasksboards.tabs.length);
        }
        // get and display chatrooms
        if (data.chatrooms != null && auth.currentUser != null) {
            setChatrooms(data.chatrooms.rooms.length);
        }
        // get and display events planners
        if (data.evtplanners != null && auth.currentUser != null) {
            setEvtplanners(data.evtplanners.planners.length);
        }
        // get and display confidential alerts
        if (data.confidential != null && auth.currentUser != null) {
            let active = 0;

            for (let _alert = 0; _alert < data.confidential.alerts.length; _alert++)
                if (data.confidential.alerts[_alert].active == 1)
                    active++;
            setConfidentalerts(active);
        }
    }

    loadDashboard(true);

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
                    <ul className={styles.topbtn} onClick={() => loadDashboard(false)}>Manual Reload</ul>
                </div>

                <div className={styles.center}>
                    <h2 className={inter.className}>
                        Hello, {username}
                    </h2>
                </div>

                <div className={styles.grid}>
                    <a
                        href="/dashboard/tasksboards"
                        className={styles.card}
                    >
                        <p className={inter.className}>
                            You have {tasksboards} tasksboard(s)
                        </p>
                        <h2 className={inter.className}>
                            Tasksboards <span>-&gt;</span>
                        </h2>
                    </a>


                    <a
                        href="#"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className={inter.className}>
                            You have {chatrooms} chatroom(s)
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
                            You have {evtplanners} events planner(s)
                        </p>
                        <h2 className={inter.className}>
                            Events Planners <span>-&gt;</span>
                        </h2>
                    </a>


                    <a
                        href="#"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className={inter.className}>
                            You have {confidentalerts} alert(s)
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
