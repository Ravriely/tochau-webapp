import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
						href="/"
						className={styles.button}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							Start Now <span>-&gt;</span>
						</h2>
					</a>

					<a
						href="/"
						className={styles.button}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							Login <span>-&gt;</span>
						</h2>
					</a>
				</div>

				<div className={styles.grid}>
					<a
						href="/"
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
						href="/"
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
						href="/"
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
						href="/"
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
