import React from "react";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = (props) => {
  const anecdotes = props.anecdotes
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const filter = props.filter.toLowerCase()
  const orderedFilteredAnecdotes = orderedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {orderedFilteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

const maptStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  maptStateToProps,
  { voteAnecdote, setNotification }
)(Anecdotes)