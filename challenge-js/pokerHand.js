class PokerHand {
  constructor() {}

  function evaluatePokerHand(hand) {
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['c', 'd', 'h', 's'];
  const handArr = hand.split(' ');
  
  // Count the frequency of each value and suit in the hand
  const valueCount = {};
  const suitCount = {};
  for (let i = 0; i < handArr.length; i++) {
    const value = handArr[i][0];
    const suit = handArr[i][1];
    valueCount[value] = (valueCount[value] || 0) + 1;
    suitCount[suit] = (suitCount[suit] || 0) + 1;
  }
  
  // Check for a royal flush or straight flush
  let flushSuit;
  let straightValue;
  for (let i = 0; i < suits.length; i++) {
    if (suitCount[suits[i]] >= 5) {
      flushSuit = suits[i];
      const flushHand = handArr.filter(card => card[1] === flushSuit).map(card => card[0]);
      flushHand.sort((a, b) => values.indexOf(a) - values.indexOf(b));
      for (let j = 0; j < flushHand.length - 4; j++) {
        if (values.indexOf(flushHand[j]) === values.indexOf(flushHand[j+4]) - 4) {
          straightValue = flushHand[j+4];
          if (straightValue === 'A') {
            return 'Royal Flush';
          } else {
            return 'Straight Flush';
          }
        }
      }
      return 'Flush';
    }
  }
  
  // Check for a straight
  let valueKeys = Object.keys(valueCount);
  valueKeys.sort((a, b) => values.indexOf(a) - values.indexOf(b));
  for (let i = 0; i < valueKeys.length - 4; i++) {
    if (values.indexOf(valueKeys[i]) === values.indexOf(valueKeys[i+4]) - 4) {
      straightValue = valueKeys[i+4];
      return 'Straight';
    }
  }
  
  // Check for four of a kind or full house
  let fourValue;
  let threeValue;
  for (let i = 0; i < valueKeys.length; i++) {
    if (valueCount[valueKeys[i]] === 4) {
      fourValue = valueKeys[i];
      return 'Four of a Kind';
    } else if (valueCount[valueKeys[i]] === 3) {
      threeValue = valueKeys[i];
      if (valueCount[valueKeys[i+1]] === 2 || valueCount[valueKeys[i-1]] === 2) {
        return 'Full House';
      } else {
        return 'Three of a Kind';
      }
    }
  }
  
  // Check for two pairs or one pair
  let pairValues = [];
  for (let i = 0; i < valueKeys.length; i++) {
    if (valueCount[valueKeys[i]] === 2) {
      pairValues.push(valueKeys[i]);
    }
  }
  if (pairValues.length === 2) {
    return 'Two Pair';
    } else if (pairValues.length === 1) {
    return 'One Pair';
  } else {
    return 'High Card';
  }
}

module.exports = PokerHand;
