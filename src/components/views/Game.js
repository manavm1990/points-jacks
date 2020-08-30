import React, { useEffect, useReducer, useState } from "react";

import api from "api";

function reducer(state, action) {
  switch (action.type) {
    case "draw": {
      return { ...state, ...{ currCard: action.card, stopDraw: action.stopDraw } };
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
        console.log(cards[0].value);
        dispatch({ type: "draw", card: cards[0].image, stopDraw: cards[0].value === "JACK" });
      }, 1000);

      // Cleanup fxn.
      return () => clearInterval(intervalId);
    }
  });

  return <h1>Game!</h1>;
};
