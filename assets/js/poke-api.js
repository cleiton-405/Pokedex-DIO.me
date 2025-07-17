const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){ 
    // Pegamos o modelo normal e fizemos o nosso
    
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => { // Transformando em uma nova lista de promises para detalhar os pokemons
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) =>{ 
    // offset e limit como padrão
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json()) // Then é usado para manipular o resultado de uma promise, que tbm conhecida como requisição. Convertemos a lista para json
    .then((jsonBody) => jsonBody.results) // Pegando a lista
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests)) // Pegando os detalhes e esperando terminar o promise
    .then((pokemonDetails) => pokemonDetails)
}

Promise.all([ // Uma lista de promises)
    fetch(`https://pokeapi.co/api/v2/pokemon/1`),
    fetch(`https://pokeapi.co/api/v2/pokemon/2`),
    fetch(`https://pokeapi.co/api/v2/pokemon/3`),
    fetch(`https://pokeapi.co/api/v2/pokemon/4`)
]).then((results) => {
    console.log(results)
})

/*

Resumo do pokeApi.getPokemons

Buscando a lista de pokemons com a url;
Recebemos um response que transformamos para json;
O json vem com uma lista mt detalhada e queremos apenas o que procuramos (pokemons);
Mapeamos essa lista em uma lista de requisições sobre os detalhes dos pokemons;
Criando um novo fetch para transformar em json;
Promises executa a lista e as requisições;
Após o término, ele mostra a lista com os detalhes.

*/