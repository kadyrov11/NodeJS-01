const argv = require('yargs').argv;

const { contactsList, getContactById, removeContact, addContact } = require('./contacts.js');

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const allContacts = await contactsList()
            console.table(allContacts);
            break;

        case 'get':
            const oneContact = await getContactById(id)
            console.log(oneContact);
            break;

        case 'add':
            const addNewContact = await addContact(name, email, phone);
            console.log(addNewContact);
            break;

        case 'remove':
            const removeContactById = await removeContact(id);
            console.log(removeContactById);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);

// 1
    // (async () => {
    //     // const allContacts = await contactsList()
    //     // console.log(allContacts);

    //     // const oneContact = await getContactById(2)
    //     // console.log(oneContact);

    //     // const removeContactById = await removeContact(1);
    //     // console.log(removeContactById);

    //     const addNewContact = await addContact("John Cena", "cena@gmail.com", "(111)-888-999");
    //     console.log(addNewContact);
    // })();

