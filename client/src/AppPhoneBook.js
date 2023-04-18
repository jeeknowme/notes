import { useEffect, useState } from 'react'
import Notification from './Notification'
import Phonebook from './Phonebook'
import phoneBookService from './services/phonebook'


const AppPhoneBook = () => {
    const [persons, setPersons] = useState([])

    const hook = () => {
        phoneBookService
            .getAll()
            .then(response => {
                console.log('eyo mga kaibigan ehehhe ',response)
                setPersons(response)
            })
    }


    useEffect(hook, [])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newContent, setNewContent] = useState('')
    const [filter, setFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notifType, setNotifType] = useState(null)


    const addPhonebook = (event) => {
        event.preventDefault()

        const hasName = persons.filter(obj => obj.name === newName )

        const newObject = {
            // id: persons.length > 0 ? persons.reduce((acc, curr) => curr.id > acc.id ).id + 1 : 1,
            name: newName,
            number: newNumber,
            content: newContent,
            important: false
        }

        if (hasName.length > 0) {
            const [{id}] = hasName
            updateNumber(id, {...hasName[0], number: newNumber})
            return
        }

        phoneBookService
            .create(newObject)
            .then(response => {
                setNotifType('success')
                setPersons(persons.concat(newObject))
                newReset()
                setNotificationMessage(`${newObject.name} was added to the server`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })
            .catch(error => {
                console.log('wala lagi error')
                setNotifType('error')
                setNotificationMessage(error.response.data.error)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })

    }

    const newReset = () => {
        setNewName('')
        setNewNumber('')
        setNewContent('')
    }

    const removeName = (id) => {
        if(window.confirm(`Delete you from earth ?`) === true){
            phoneBookService
            .delete8(id)
            .then(response => {
                setPersons(persons.filter(person=>person.id!==id))
            })
            .catch(error => {
                const person = persons.filter(person=>person.id === id)
                setNotifType('error')
                setNotificationMessage(`The information of  ${person[0].name} has already been removed from the server`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })
        }
    }

    const updateNumber = (id, newObject) => {
        phoneBookService
            .update(id, newObject)
            .then(response => {
                    setNotifType('success')
                    setPersons(persons.map(person => person.id === id ? newObject : person))
                    setNotificationMessage(`${newObject.name} was added to the server`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
                }
            )
    }


    const handleNameChange = (event) => setNewName(event.target.value)

    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const handleContentChange = (event) => setNewContent(event.target.value)

    const handleFilter = (event) => setFilter(event.target.value)

    return (
        <div>
            <h2>Phonebook</h2>

            <div>filter shown with <input value={filter} onChange={handleFilter} /></div>

            <h2>Add a new</h2>
            <form onSubmit={addPhonebook}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    Content: <input value={newContent} onChange={handleContentChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                <Phonebook filter={filter} persons={persons} removeName={removeName}/>
            </ul>
            <Notification message={notificationMessage} type={notifType}/>
        </div>
    )
}


export default AppPhoneBook
