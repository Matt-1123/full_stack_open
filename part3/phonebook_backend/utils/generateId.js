const generateId = () => {
  // generate a random 7 digit number (between 1000000 and 9999999)
  const id = Math.floor(Math.random() * 9000000) + 1000000;
  
  return id
}

module.exports = generateId;