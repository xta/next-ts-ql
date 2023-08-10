import Row from './row'

export default function DemoContent({ items, query, sort, clearFilter }) {

    let visible = items.filter(item => item.title.includes(query))
    let display = [...visible]

    if (sort !== '') {
        if (sort === 'asc') {
            display.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sort === 'desc') {
            display.sort((a, b) => b.title.localeCompare(a.title))
        }
    }

    return (
        <>
            <h3>Content ({visible.length})</h3>
            <ul>
                {display.map(item => <Row key={item.id} item={item} clearFilter={clearFilter} />)}
            </ul>
        </>
    )
}
