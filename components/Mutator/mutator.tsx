import { useState, useEffect, useCallback } from 'react';

import { ApiMutate } from '../../models/githubMutate';

const OWNER = 'xta'
const REPO = 'next-ts-ql'

export default function Mutator() {

    const endpoint = 'https://api.github.com/graphql'

    // key is GH api key
    const [key, setKey] = useState('loading')

    const [repoID, setRepoID] = useState('')
    const [starred, setStarred] = useState(false)
    const [loading, setLoading] = useState(true)

    const getStarStatus = async (query: string, variable: string, key: string): Promise<any> => {
        let body = {
            query: query,
            variables: variable
        }
        return await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${key}`,
            },
            body: JSON.stringify(body)
        })
    }

    const query = `query IsRepoStarred($owner: String!, $repo: String!) {
        repositoryOwner(login: $owner) {
          repository(name: $repo) {
            id
            viewerHasStarred
          }
        }
      }`

    const variable = `{
        "owner": "${OWNER}",
        "repo": "next-ts-ql"
      }`

    useEffect(() => {
        // get GH secret key from .env.local
        const secret = process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN as string
        setKey(secret)

        if (key == 'loading') return

        const fetchData = async () => {
            const data = await getStarStatus(query, variable, key)
            const json = await data.json()
            setStarred(json.data.repositoryOwner.repository.viewerHasStarred)
            setRepoID(json.data.repositoryOwner.repository.id)

            setLoading(false)
        }

        fetchData()
            .catch(console.error)
    }, [key, starred])

    const toggleState = useCallback(() => {
        const post = async () => {
            // Note: currently not functional as GH does not let personal access token mutate repo stars
            // Error: "Resource not accessible by personal access token"
            const data = await ApiMutate(starred, key)
            const json = await data.json()

            console.log({ json })

            setStarred(!starred)
            setLoading(false)
        }

        post()
            .catch(console.error)
    }, [loading])

    function toggleStar() {
        setLoading(true)
        toggleState()
    }

    if (loading) {
        return (<div>Loading...</div>)
    }

    return (
        <>
            <div>This hardcoded example allows you to star & unstar a repo (if you have access...)</div>

            <h3>Current Repo Status {(repoID !== '') && `(${repoID} ${REPO})`}</h3>
            {starred ? 'Starred' : 'Not starred'}

            <h3>Change</h3>
            <button onClick={() => toggleStar()}>{starred ? 'Unstar' : 'Star it'}</button>
        </>
    )
}