const { constants } =  require('./constants.js')

function validadeFields (knight) {
  const {name, nickname, weapons, attributes} = knight
  
  if (!name) return { error: true, message: constants.ERROR_MESSAGE.NAME }

  if (!nickname) return { error: true, message: constants.ERROR_MESSAGE.NICKNAME }

  // checking if it has weapons
  if (weapons.length === 0) return { error: true, message: constants.ERROR_MESSAGE.WEAPONS }
  
  // checking if it has a weapon selected
  const areAllEquippedFalse = weapons.every(item => item.equipped === false)
  if (areAllEquippedFalse) return { error: true, message: constants.ERROR_MESSAGE.WEAPON_EQUIPPED }

    //checking if all attr values are setted to 0
    const areAllAttrValuesZero = Object.values(attributes).every(value => value === 0)
    if (areAllAttrValuesZero) return { error: true, message: constants.ERROR_MESSAGE.ATTRIBUTES }
  
  return { error: false, message: constants.SUCCESS.MESSAGE }
}

function parseApiError(errorMessage) {
  const regex = /E11000 duplicate key error collection: ([\w.]+) index: (\w+)_\d+ dup key: \{ (\w+): "(.*?)" \}/;
  const match = errorMessage.match(regex);

  if (match) {
    const [, collection, index, key, value] = match;
    return {
      error: "DuplicateNicknameError",
      collection,
      index,
      key,
      value,
      message: `Nickname has already exists`
    };
  }

  return { error: "UnknownError", message: "Something is wrong :(" };
}

module.exports = {
  validadeFields,
  parseApiError
}