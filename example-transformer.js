module.exports = personJson => {
  const {name} = JSON.parse(personJson);
  return { name: name.toUpperCase(), length: name.length};
};