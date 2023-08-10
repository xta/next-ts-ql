export default function ({ item, clearFilter }) {
    return (
        <li>{item.title} <button onClick={() => clearFilter()}>X</button></li>
    )
}