import React from "react";

import { Link } from "react-router-dom";

export const Home = () => (
  <section className="center mt-4">
    <h2 className="title">How To Play - Three Jacks</h2>
    <p>
      This game is designed to be played with 2 players sitting at 1{" "}
      <span role="img" aria-label="keyboard">
        ⌨️.
      </span>
    </p>
    <p>
      Player 1 (left) will use the &quot;A&quot; &nbsp;
      <span role="img" aria-label="key">
        🔑,
      </span>
      &nbsp; and Player 2 (right) will use the &quot;L&quot; &nbsp;
      <span role="img" aria-label="key">
        🔑.
      </span>
      &nbsp;
    </p>

    <p>
      Once the game starts, a card will be shown every second.{" "}
      <strong>
        If that card&nbsp;
        <span role="img" aria-label="flower playing cards">
          🎴
        </span>
        &nbsp; is a &quot;Jack,&quot; dealing will stop and u should hit ur
        button ASAP!
      </strong>
    </p>
    <p>The first player to press their button will get the point.</p>
    <p>Then, cards will continue being dealt.</p>
    <p>
      <strong>
        <span role="img" aria-label="warning">
          ⚠️
        </span>
        &nbsp; Be careful! If you tap your &nbsp;
        <span role="img" aria-label="key">
          🔑,
        </span>
        &nbsp; when there isn&apos;t a Jack, you lose a point!
      </strong>
    </p>
    <p>
      The game will continue until someone scores &quot;3,&quot; or until we are
      out of Jacks; in this case, there would be a 2-2 tie&nbsp;
      <span role="img" aria-label="shrug">
        🤷🏽‍♂️.
      </span>
    </p>
    <footer>
      I actually intended to make <a href="https://bicyclecards.com/how-to-play/slapjack/" target="_blank" rel="noreferrer"> &apos;Slap Jacks&apos;</a> - but didn&apos;t
      realize that rules of that game are much different...so I made this
      one.&nbsp;
      <span role="img" aria-label="shrug">
        🤷🏽‍♂️
      </span>
    </footer>
    <Link to="/game" className="button button-primary mt-2">Start Game!</Link>
  </section>
);
