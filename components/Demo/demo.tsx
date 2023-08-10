import { useEffect, useState } from 'react'
import Content from './content'

export default function Demo() {
    let [items, setItems] = useState([])
    let [query, setQuery] = useState("")

    // "asc", "desc", or none ""
    let [sort, setSort] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("https://jsonplaceholder.typicode.com/posts")
            const json = await data.json()
            setItems(json)
        }

        fetchData()
            .catch(console.error)
    }, [])

    function filterList(event) {
        let query = event.target.value
        setQuery(query)
    }

    function sortChanged(event) {
        setSort(event.target.value)
    }

    function clearFilter() {
        setQuery('')
    }

    return (
        <>
            <h1>Demo</h1>

            <div>
                <label>
                    Search{' '}
                    <input name="search" value={query} onChange={filterList}></input>
                </label>

                <br /><br />

                <label htmlFor="sort-list">Sort list</label>{' '}
                <select id="sort-list" value={sort} onChange={sortChanged}>
                    <option value="" name="none">None</option>
                    <option value="asc" name="asc">A - Z</option>
                    <option value="desc" name="desc">Z - A</option>
                </select>
            </div>

            <Content items={items} query={query} sort={sort} clearFilter={clearFilter} />
        </>
    )
}