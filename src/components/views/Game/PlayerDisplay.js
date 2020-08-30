import PropTypes from "prop-types";
import React, {useEffect} from "react";

export const PlayerDetails = ({ points, handler }) => {
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", handler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <p className="is-size-2">
      Points: <span className="is-size-1">{points}</span>
    </p>
  );
}
PlayerDetails.defaultProps = { points: 0 };

PlayerDetails.propTypes = { points: PropTypes.number, handler: PropTypes.func };
