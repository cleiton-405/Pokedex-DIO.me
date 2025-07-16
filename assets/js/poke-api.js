const pokeApi = {}

pokeApi.getPokemons = (offset = 0, limit = 10) =>{ // offset e limit como padrão
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json()) // arrow function
    .then((jsonBody) => jsonBody.results)
    .catch((error) => console.log(error))
}