import React from "react";

const DeleteButton = ({ person, deletePerson }) => (
    <button onClick={() => deletePerson(person.id, person.name)}> delete</button >
)

const Person = ({ person, deletePerson }) => (
    <p>{person.name} {person.number} <DeleteButton person={person} deletePerson={deletePerson} /></p>
)

const Persons = ({ peopleToShow, deletePerson }) => (
    <div>
        {peopleToShow.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
    </div>
)

export default Persons