import React, { useEffect, useReducer, useState } from "react";

import { PlayerDetails } from "./PlayerDisplay";

import api from "api";

function reducer(state, action) {
  switch (action.type) {
    case "draw":
      return { ...state, currCard: action.card, stopDraw: action.stopDraw };
    case "update": {
      const { payload } = action;
      console.log(payload)
      return {
        ...state,
        [payload]: state[payload] + (Number(state.currCard.value === "JACK") || -1),
        stopDraw: false,
      };
    }
    default:
      return state;
  }
}

export const Game = () => {
  const [gameDeets, dispatch] = useReducer(reducer, {
    currCard: null,
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
    // While '!stopDraw', draw a card every second
    while (!gameDeets.stopDraw) {
      const intervalId = setInterval(async () => {
        const { cards } = await api.draw1(deckId);
        dispatch({
          type: "draw",
          card: cards[0],
          stopDraw: cards[0].value === "JACK",
        });
      }, 1000);

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

  return (
    <>
      <img
        src={gameDeets.currCard?.image}
        alt={gameDeets.currCard?.value}
        className="mt-3"
      />
      <div className="flex flex--justify-between container">
        <PlayerDetails points={gameDeets.p1Score} handler={playerHandler} />
        <PlayerDetails points={gameDeets.p2Score} handler={playerHandler} />
      </div>
      ;
    </>
  );
};
