const Person = ({ id, name, number, handleDelete }) => {
    return (
        <>
            <p>{name} {number}
                <button className='delete' onClick={() => handleDelete(id, name)}>Delete</button>
            </p>
        </>
    )
}

export default Person