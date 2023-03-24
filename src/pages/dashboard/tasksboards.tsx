import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Tasksboards.module.css';
import { Auth } from 'firebase/auth';
import { getFireAuth, GoogleSignIn, readFireData, writeUserData } from '@/services/firebase';
import React, { useState } from 'react';
import { accessDashboard } from '..';

const inter = Inter({ subsets: ['latin'] });

export default function TasksBoardsDashboard() {
    const [ username, setUsername ] = useState("@");
    const [ tasksboards, setTasksboards ] = useState(Array<any>);

    const loadDashboard = async function (auto: boolean) {
        if (auto && username != "@") return;
        let data = null;
        let auth: Auth;

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
        }
        // get and display username
        if (auth.currentUser.displayName != null)
            setUsername(`@${auth.currentUser.displayName}`);
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
            let task: Array<any> = [];
            task.push({ name: "mytab" });
            setTasksboards(task);
        } else {
            let tasks: Array<any> = [];
            for (let _board = 0; _board < data.tasksboards.amount; _board++)
                tasks.push({ name: data.tasksboards.tabs[_board].name });
                setTasksboards(tasks);
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
                    {tasksboards.map(prop =>
                        <a
                            href={`/dashboard/tasksboard?board=${prop.name}`}
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
