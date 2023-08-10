const endpoint = 'https://api.github.com/graphql'

// note: these 3 (AddStarMutate, RemoveStarMutate, StarVariables are valid formed inputs)
// these work on GH explorer https://docs.github.com/en/graphql/overview/explorer when logged in

const AddStarMutate = `mutation ($repositoryId: ID!) {
    addStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }`

const RemoveStarMutate = `mutation ($repositoryId: ID!) {
    removeStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }`

const StarVariables = `{
    "repositoryId": "R_kgDOKFat-g"
}`

// ApiMutate makes a star/unstar change
export async function ApiMutate(star: boolean, key: string): Promise<any> {
    let action = AddStarMutate
    if (star) {
        action = RemoveStarMutate
    }

    let body = {
        query: action,
        variables: StarVariables
    }

    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${key}`,
        },
        body: JSON.stringify(body)
    })
}
