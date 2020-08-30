export default {
  async index() {
    const deckRes = await "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    return deckRes.json()
  },

  async draw1(deckId) {
    const draw1Res = await `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    return draw1Res.json();
  }
 }