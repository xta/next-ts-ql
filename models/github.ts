const endpoint = 'https://api.github.com/graphql'

// ApiGet queries the GitHub graphQL
export async function ApiGet(query: string, variable: string, key: string): Promise<any> {
    let body = {
        query: query
    }
    if (variable !== '') {
        body.variables = variable
    }

    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${key}`,
        },
        body: JSON.stringify(body)
    })
}

export function ViewLoginQuery(): string {
    return `query { 
    viewer { 
        login
    }
}`
}

export function ViewReposQuery(): string {
    return `query Repos($owner: String!) {
    repositoryOwner(login: $owner) {
        repositories(
            first: 10
            ownerAffiliations: OWNER
            privacy: PUBLIC
            isFork: false
            isLocked: false
            orderBy: { field: NAME, direction: ASC }
        ) {
            totalCount
                        
            pageInfo {
                hasNextPage
                endCursor
            }
                        
            nodes {
                name
                description
            }
        }
    }
}`
}

interface QueryVariable {
    owner: string
}

export function ViewReposVariables(owner: string): string {
    return `{
    "owner": "${owner}" 
}
    `
}