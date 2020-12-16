function parseJson(path) {
  return fetch(path).then((response) => response.json());
}

export default parseJson;
