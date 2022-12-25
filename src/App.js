import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./SingleCard";

const cardImages = [
  { matched: false, src: "/img/helmet-1.png" },
  { matched: false, src: "/img/potion-1.png" },
  { matched: false, src: "/img/ring-1.png" },
  { matched: false, src: "/img/scroll-1.png" },
  { matched: false, src: "/img/shield-1.png" },
  { matched: false, src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort((a, b) => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.floor(Math.random() * 1e4) }));
    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (!firstChoice) {
      setFirstChoice(card);
    } else {
      if (firstChoice.id !== card.id) {
        setSecondChoice(card);
      }
    }
  };

  const resetTurn = () => {
    setTimeout(() => {
      setFirstChoice(null);
      setSecondChoice(null);
      setTurns((prevTurns) => prevTurns + 1);
      setDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
        return true;
      } else {
        console.log("Cards don't match :(");
        resetTurn();
        return false;
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="turns">Turns: {turns}</div>

      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={
                card === firstChoice || card === secondChoice || card.matched
              }
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
