import { ListContacts, ItemList, ItemButton } from './ContactList.styles';
import propTypes from 'prop-types';

const ContactList = ({ filter, contacts, onDeleteContact }) => {
    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
    
        return contacts.filter(({ name }) => 
          name.toLowerCase().includes(normalizedFilter)
        );
    };

    const visibleContacts = getVisibleContacts();

    return (
        <ListContacts>
            {visibleContacts.map(({ id, name, number }) => {
                return (
                    <ItemList key={id}>
                        {name}: {number}
                        <ItemButton type="button" onClick={() => onDeleteContact(id)}>Delete</ItemButton>
                    </ItemList>
                )})}
        </ListContacts>    
    )
};

ContactList.propTypes = {
    contacts: propTypes.arrayOf(
        propTypes.shape({
            name: propTypes.string.isRequired,
            number: propTypes.string.isRequired,
            id: propTypes.string.isRequired,
        })
    ),
    onDeleteContact: propTypes.func.isRequired,
};

export default ContactList;
