import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import plan from '../data/plan'
import { Program } from '../components/Program'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Gymalaya</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {plan.map(program => {
                return <Program {...program} key={program.name} />
            })}
            <main className={styles.main}></main>
        </div>
    )
}
