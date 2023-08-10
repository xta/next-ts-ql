import { useState, useEffect } from 'react';

import styles from './explorer.module.css'

export default function Explorer() {

    const [key, setKey] = useState('loading')

    // on load: get GH secret key from .env.local
    useEffect(() => {
        const secret = process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN as string
        setKey(secret)
    }, [])

    let keyMessageStyles = [styles.keyMessage]
    if (key === '') {
        keyMessageStyles.push(styles.keyMessageError)
    } else {
        keyMessageStyles.push(styles.keyMessageSuccess)
    }

    return (
        <>
            <div className={keyMessageStyles.join(' ')}>
                {key === '' ? 'Error: GH Key not found' : 'GH Key found.'}
            </div>
        </>
    )
}