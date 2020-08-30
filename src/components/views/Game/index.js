import React, { useEffect, useReducer, useState } from "react";

import { PlayerDetails } from "./PlayerDisplay";

import api from "api";

function findWinner(p1Score, p2Score) {
  if (p1Score > p2Score) {
        return "Player 1 Wins!"
      }
      if (p2Score > p1Score) {
        return "Player 2 Wins!"
      }
      return "It's a Tie!"
}

function reducer(state, action) {
  switch (action.type) {
    case "draw":
      const { card } = action;
      const stopDraw = card.value === "JACK";
      return {
        ...state,
        card: card,
        jacksCount: state.jacksCount + Number(stopDraw),
        stopDraw,
      };
    case "update":
      const { payload } = action;
      return {
        ...state,
        [payload]: state[payload] + (Number(state.card.value === "JACK") || -1),
        stopDraw: false,
        winner: state.jacksCount === 4 && findWinner(state.p1Score, state.p2Score)
      };      
    default:
      return state;
  }
}

export const Game = () => {
  const [gameDeets, dispatch] = useReducer(reducer, {
    card: null,
    jacksCount: 0,
    p1Score: 0,
    p2Score: 0,
    stopDraw: false,
  });

  const [deckId, setDeckId] = useState(null);

  useEffect(() => {
    (async () => {
      const { deck_id: deckId } = await api.index();
      setDeckId(deckId);
    })();
  }, []);

  useEffect(() => {
    // While '!stopDraw' and if there are still jacks, draw a card every second
    while (deckId && gameDeets.jacksCount !== 4 && !gameDeets.stopDraw) {
      const intervalId = setInterval(async () => {
        const { cards } = await api.draw1(deckId);
        dispatch({
          type: "draw",
          card: cards[0],
        });
      }, 100);

      // Cleanup fxn.
      return () => clearInterval(intervalId);
    }
  });

  const playerHandler = ({ key }) => {
    switch (key.toUpperCase()) {
      case "A":
        dispatch({ type: "update", payload: "p1Score" });
        break;
      case "L":
        dispatch({ type: "update", payload: "p2Score" });
        break;
      default:
    }
  };

  return gameDeets.winner ? (
    <section className="section">
      <h2 className="has-text-info is-subtitle is-uppercase mt-6">
        Game Over!
      </h2>
      <p className="is-size-3">{gameDeets.winner}</p>
    </section>
  ) : (
    <>
      <img
        src={gameDeets.card?.image}
        alt={gameDeets.card?.value}
        className="mt-3"
      />
      <div className="flex flex--justify-between container">
        <PlayerDetails points={gameDeets.p1Score} handler={playerHandler} />
        <PlayerDetails points={gameDeets.p2Score} handler={playerHandler} />
      </div>
    </>
  );
};
