import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { Program } from '../components/Program'
import { GetStaticProps } from 'next'
import { Plan } from '../data/plan'
import { resetServerContext } from 'react-beautiful-dnd'
import { getPlan } from '../data/utils'

export const getStaticProps: GetStaticProps = async () => {
    const plan = await getPlan('dean')
    resetServerContext()

    return {
        props: { plan },
        revalidate: 1,
    }
}

export default function Home({ plan }: { plan: Plan }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Gymalaya</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {plan.map((program, index) => {
                return <Program {...program} key={program.name} index={index} />
            })}
            <main className={styles.main}></main>
        </div>
    )
}
