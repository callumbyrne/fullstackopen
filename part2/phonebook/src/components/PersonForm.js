import React from "react";

const PersonForm = ({ addPerson, states, handlers }) => (
    <form onSubmit={addPerson}>
        <div>name: <input
            value={states.newName}
            onChange={handlers.handleNameChange} />
        </div>
        <div>number: <input
            value={states.newNumber}
            onChange={handlers.handleNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm