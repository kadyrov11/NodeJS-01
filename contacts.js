const fs = require('fs').promises;
const path = require('path');

const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "db", "contacts.json")

const contactsList = async () => {
    try {
        const file = await fs.readFile(contactsPath)
        const data = JSON.parse(file)
        return data
    }
    catch (error) {
        throw error
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await contactsList()
        const oneContact = contacts.find(({ id }) => id === contactId)
        return oneContact
    }
    catch (error) {
        throw error
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await contactsList()
        const newContacts = contacts.filter(({ id }) => id !== contactId)
        const contactsStr = JSON.stringify(newContacts)
        fs.writeFile(contactsPath, contactsStr)

        return newContacts
    }
    catch (error) {
        throw error
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await contactsList()
        const newContact = {
            id: v4(),
            name,
            email,
            phone
        }
        const newContacts = [...contacts, newContact]
        const contactsStr = JSON.stringify(newContacts)

        fs.writeFile(contactsPath, contactsStr)

        return newContacts
    }
    catch (error) {
        throw error
    }
}
module.exports = {
    contactsList,
    getContactById,
    removeContact,
    addContact
}