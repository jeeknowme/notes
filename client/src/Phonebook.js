const Phonebook = ({persons, filter, removeName}) => {
    return persons
        .map((person, index)=> person.name.includes(filter) ?
            <li key={person.name + index}>{person.name} {person.number}
                <button onClick={()=>removeName(person.id)}>delete</button>
            </li> :
            null
        )
}

export default Phonebook
