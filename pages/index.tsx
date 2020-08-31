import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { Program } from '../components/Program'
import { GetStaticProps } from 'next'
import { Plan } from '../data/types'
import { resetServerContext } from 'react-beautiful-dnd'
import { getPlan } from '../data/plan'

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
                <link rel="manifest" href="manifest.json" />

                <link rel="icon" sizes="16X16" href="/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="16X16"
                    href="/favicon.ico"
                />

                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="application-name" content="Gymalaya" />
                <meta name="apple-mobile-web-app-title" content="Gymalaya" />
                <meta name="theme-color" content="#f32121" />
                <meta name="msapplication-navbutton-color" content="#f32121" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta name="msapplication-starturl" content="/" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>

            {plan.map((program, index) => {
                return <Program {...program} key={program.name} index={index} />
            })}
        </div>
    )
}
