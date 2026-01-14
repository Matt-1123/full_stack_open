const Person = ({ id, name, number, handleDelete }) => {
    return (
        <>
            <p>{name} {number}
                <button style={{ margin: '0 8px' }} onClick={() => handleDelete(id, name)}>Delete</button>
            </p>
        </>
    )
}

export default Person