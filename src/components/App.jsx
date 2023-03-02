import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Wrapper, Title } from './App.styles';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(LS_KEY));
    if (items !== null) {
      setContacts(items);
    }
  }, []);

  const addContact = ({ name, number }) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const handleDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm contacts={contacts} onSubmit={addContact} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        filter={filter}
        contacts={contacts}
        onDeleteContact={handleDelete}
      />
    </Wrapper>
  );
};


// export class App extends Component {
//   state = {
//     contacts: [
//       {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//       {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//       {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//       {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const items = JSON.parse(localStorage.getItem(LS_KEY));
//     if(items !== null) {
//       this.setState({
//         contacts: items
//       })
//     }
//   };

//   componentDidUpdate(_, prevState) {
//     if(prevState.contacts !== this.state.contacts) {
//       localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts))
//       console.log(this.state.contacts)
//     }
//   };

//   addContact = ({ name, number }) => {
//     const newContact = {
//       name,
//       number,
//       id: nanoid(),
//     };

//     this.setState(prevState => ({
//       contacts: [newContact, ...prevState.contacts],
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   handleDelete = id => {
//     this.setState( prevState => ({
//       contacts:  prevState.contacts.filter(contact => contact.id !== id)
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     return (
//       <Wrapper>
//         <Title>Phonebook</Title>
//         <ContactForm contacts={contacts} onSubmit={this.addContact}/>
//         <Title>Contacts</Title>
//         <Filter value={filter} onChange={this.changeFilter}/>
//         <ContactList
//           filter={filter}
//           contacts={contacts}
//           onDeleteContact={this.handleDelete}
//         />
//       </Wrapper>
//     );
//   };
// };
