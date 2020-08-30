import React, { useEffect, useReducer, useState} from 'react'

import api from "api"
  const [deckId, setDeckId] = useState(null)
  
  useEffect(() => {
    (async () => {
      const { deck_id: deckId } = await api.index();
      setDeckId(deckId) 
    })()
  }, [])
