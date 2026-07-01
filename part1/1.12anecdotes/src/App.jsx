import { useState } from 'react';

const VoteButton = ({anecdotesObj, setAnecdotesObj, selected}) => {
  const AddVote = () => {
    const newAnecdotesObj = anecdotesObj.map((anecdote, index) =>
      index === selected ? {...anecdote, votes: anecdote.votes + 1} : anecdote);
    setAnecdotesObj(newAnecdotesObj);
  }

  return (
    <>
      <button onClick={AddVote}>vote</button>
    </>
  );
};

const NextButton = ({selected, setSelected, anecdotesObj}) => {
  // Well, it's not really random but... stops the program looking like it crashed
  // because it so happened to roll the same anecdote as currently shown
  const getRandomInt = (max) => {
    let randNum = Math.floor(Math.random() * max);
    while (randNum === selected) randNum = Math.floor(Math.random() * max);
    return randNum;
  }
  const setRandomAnecdote = () => setSelected(getRandomInt(anecdotesObj.length));
  return (
    <>
      <button onClick={() => setRandomAnecdote()}>next anecdote</button>
    </>
  );
}

const App = () => {
  const anecdotes = [{
    quote: 'If it hurts, do it more often.',
    votes: 0
  }, {
    quote: 'Adding manpower to a late software project makes it later!',
    votes: 0
  }, {
    quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  }, {
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  }, {
    quote: 'Premature optimization is the root of all evil.',
    votes: 0
  }, {
    quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  }, {
    quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes:0
  }, {
    quote: 'The only way to go fast, is to go well.',
    votes: 0
  }];
  const [anecdotesObj, setAnecdotesObj] = useState(anecdotes);
  const [selected, setSelected] = useState(0);

  return (
    <>
      <Display header="Anecdote of the day" anecdotesObj={anecdotesObj} selected={selected} />
      <VoteButton anecdotesObj={anecdotesObj}  setAnecdotesObj={setAnecdotesObj} selected={selected}/>
      <NextButton anecdotesObj={anecdotesObj}  setSelected={setSelected} selected={selected} />
      <Display header="Anecdote with most votes" anecdotesObj={anecdotesObj} selected={MostVotes(anecdotesObj)}/>
    </>
  );
};

const Display = ({header, anecdotesObj, selected}) => {
  return (
    <div>
        <h1>{header}</h1>
        {anecdotesObj[selected].quote}
        <p>has {anecdotesObj[selected].votes} votes</p>
    </div>
  );
};

const MostVotes = (anecdotesObj) => {
  let highestVote = {
    index: 0,
    anecdote: "",
    votes: 0
  };
  
  anecdotesObj.forEach((element, index) => {
    if (highestVote.votes < element.votes) {
      highestVote = element;
      highestVote.index = index;
    }
  });
  return highestVote.index;
};

export default App;