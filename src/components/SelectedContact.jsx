import { useState } from "react";
import { useEffect } from "react";
import ContactList from "./ContactList";

export default function SelectedContact({
  selectedContactId,
  setSelectedContactId,
}) {
  const [contact, setContact] = useState(null);

  const fetchContact = async () => {
    try {
      const response = await fetch(
        `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
      );
      const data = await response.json();
      setContact(data);
      //   console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  //   console.log(contact);
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div>
      {contact ? (
        <div className="contactCard">
          <h2 className="h2">{contact.name}</h2>
          <p className="topinfo">Username: {contact.username}</p>
          <p className="topinfo">Website: {contact.website}</p>
          <div className="selected">
        
            <ul className="ul">
              <li className="contact">{contact.address.street} {contact.address.suite}</li>
              <li className="contact">{contact.address.city} {contact.address.zipcode}</li>
            </ul>
            <div className="lineinfo">
              <div className="phone">{contact.phone}</div>
              <div className="email">{contact.email}</div>
            </div>
          </div>
          <p>
            <button
              className="return"
              onClick={() => setSelectedContactId(null)}
            >
              Return to List
            </button>
          </p>
        </div>
      ) : (
        <ContactList />
      )}
    </div>
  );
}
