const endpoint = 'https://api.github.com/graphql'

export function ViewLoginQuery(): string {
    return `query { 
    viewer { 
        login
    }
}`
}

// ApiGet queries the GitHub graphQL
export async function ApiGet(query: string, variable: string, key: string): Promise<any> {
    let body = {
        query: query
    }
    if (variable !== '') {
        body.variable = variable
    }

    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${key}`,
        },
        body: JSON.stringify(body)
    })
}