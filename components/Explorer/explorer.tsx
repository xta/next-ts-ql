import { useState, useEffect } from 'react';
import * as api from '../../models/github'

import styles from './explorer.module.css'

const USERNAME = 'xta'

export default function Explorer() {
    // key is GH api key
    const [key, setKey] = useState('loading')

    // choices are login or repos
    const [choice, setChoice] = useState('login')

    const [query, setQuery] = useState(api.ViewLoginQuery)
    const [variables, setVariables] = useState('')
    const [cursor, setCursor] = useState('')

    const [response, setResponse] = useState('loading')
    const [responseJson, setResponseJson] = useState({})

    // user is the github username or login
    const [user, setUser] = useState(USERNAME)

    useEffect(() => {
        // get GH secret key from .env.local
        const secret = process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN as string
        setKey(secret)

        if (key == 'loading' || query == '') return

        const fetchData = async () => {
            const data = await api.ApiGet(query, variables, key)
            const json = await data.json()
            setResponseJson(json)
            setResponse(prettyJsonString(json))
        }

        fetchData()
            .catch(console.error)
    }, [key, choice, query, variables, cursor, user, response])

    let keyMessageStyle = ''
    if (key !== 'loading') {
        keyMessageStyle = styles.keyMessageSuccess
    }

    function prettyJsonString(json: object): string {
        return JSON.stringify(json, null, 2)
    }

    let loginButtonSelected = choice === 'login'

    function handleChoice(option: string) {
        setChoice(option)
        setResponse('loading')

        if (option === 'login') {
            setQuery(api.ViewLoginQuery)
            setVariables('')
            setResponseJson({})
        } else if (option === 'repos') {
            setQuery(api.ViewReposQuery)
            setVariables(api.ViewReposVariables(user, ''))
            setResponseJson({})
        }
    }

    function handleNextRepo() {
        if (responseJson && responseJson.data && responseJson.data.repositoryOwner && responseJson.data.repositoryOwner.repositories && responseJson.data.repositoryOwner.repositories.pageInfo && responseJson.data.repositoryOwner.repositories.pageInfo.endCursor) {
            setCursor(responseJson.data.repositoryOwner.repositories.pageInfo.endCursor)
            setVariables(api.ViewReposVariables(user, responseJson.data.repositoryOwner.repositories.pageInfo.endCursor))
            setResponse('loading')
        }
    }

    return (
        <>
            <div className={`${styles.section} ${keyMessageStyle}`}>
                {key === '' ? 'Error: GH Key not found' : 'GH Key found.'}
            </div>

            <div className={styles.section}>
                <h3>Input(s)</h3>
                <label>
                    Username <input name="username" value={user} onChange={(e) => { setUser(e.target.value) }} disabled={loginButtonSelected} />
                </label>

                <div>
                    <button className={`${styles.buttonChoice} ${loginButtonSelected && styles.selected}`} onClick={() => handleChoice('login')}>View Login</button>
                    <button className={`${styles.buttonChoice} ${!loginButtonSelected && styles.selected}`} onClick={() => handleChoice('repos')}>View Repos</button>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Query</h3>
                <pre className={styles.preWrap}>
                    {query}
                </pre>
            </div>

            <div className={styles.section}>
                <h3>Variable(s)</h3>
                <pre className={styles.preWrap}>
                    {(variables === '') ? 'N/A' : variables}
                </pre>
            </div>

            <div className={styles.section}>
                <h3>Result</h3>
                {!loginButtonSelected && <button onClick={() => handleNextRepo()}>Next</button>}

                <pre className={styles.preWrap}>
                    {(response === 'loading') ? 'Loading...' : response}
                </pre>
            </div>
        </>
    )
}