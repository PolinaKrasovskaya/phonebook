import { useState } from 'react';
import {
  FormWrapper,
  InputLabel,
  FormInrut,
  SubmitButton,
} from './ContactForm.styles';

const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameToFind = checkContactInPhoneBook();
    if (nameToFind) {
      reset();
      return alert(`${name} is already in contacts!`);
    }
    onSubmit({ name, number });
    reset();
  };

  const checkContactInPhoneBook = () => {
    const nameToFind = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    return nameToFind;
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <InputLabel>Name</InputLabel>
      <FormInrut
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={handleChange}
        required
      />
      <InputLabel>Number</InputLabel>
      <FormInrut
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={handleChange}
        required
      />
      <SubmitButton type="submit">Add contact</SubmitButton>
    </FormWrapper>
  );
};

export default ContactForm;

// export default class ContactForm extends Component {
//     state = {
//         name: '',
//         number: ''
//     };

//     handleChange = e => {
//         const { name, value } = e.target;
//         this.setState({[name]: value});
//     };

//     handleSubmit = e => {
//         e.preventDefault();
//         const nameToFind = this.checkContactInPhoneBook();
//         if (nameToFind) {
//             this.reset();
//             return alert(`${this.state.name} is already in contacts!`);
//         };
//         this.props.onSubmit(this.state);
//         console.log(this.state)
//         console.log(this.props.onSubmit)
//         this.reset();
//     };

//     checkContactInPhoneBook = () => {
//         const { name } = this.state;

//         const nameToFind = this.props.contacts.find(contact =>
//             contact.name.toLowerCase() === name.toLowerCase()
//         );

//         return nameToFind;
//     };

//     reset = () => {
//         this.setState(() => ({
//             name: '',
//             number: ''
//         }))
//     };

//     render() {
//         const { name, number } = this.state;
//         return (
//             <FormWrapper onSubmit={this.handleSubmit}>
//                 <InputLabel>Name</InputLabel>
//                 <FormInrut
//                     type="text"
//                     name="name"
//                     value={name}
//                     pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                     title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                     onChange={this.handleChange}
//                     required
//                 />
//                 <InputLabel>Number</InputLabel>
//                 <FormInrut
//                     type="tel"
//                     name="number"
//                     value={number}
//                     pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                     title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                     onChange={this.handleChange}
//                     required
//                 />
//                 <SubmitButton type="submit">Add contact</SubmitButton>
//             </FormWrapper>
//         )
//     }
// };
