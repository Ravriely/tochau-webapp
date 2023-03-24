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
                profile_picture: auth.currentUser.photoURL
            });
            data = await readFireData("");
        }
        // get and display username
        if (auth.currentUser.displayName != null) {
            setUsername(`@${auth.currentUser.displayName}`);
        }
        // get and display tasksboards
        if (data.tasksboards == null && auth.currentUser != null) {
            writeUserData(auth.currentUser.uid, "tasksboards", {
                amount: 1,
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
            });
            setTasksboards(1);
        } else {
            setTasksboards(data.tasksboards.amount);
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
                        <h2 className={inter.className}>
                            Confidentiality <span>-&gt;</span>
                        </h2>
                    </a>
                </div>
            </main>
        </>
    )
}
