function convertPokemonToLi(pokemon){ // Função para retornar um li padrão para os pokemons
    return `
    <li class="pokemon">
        <span class="number">#001</span>
        <span class="name">${pokemon.name}</span>
                
        <div class="detail">
            <ol class="types">
                <li class="type">grass</li>
                <li class="type">poison</li>
            </ol>

            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
        </div>
    </li>
    `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) =>{ // Passando por parâmetro uma lista vazia
    
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    // Usando .map para listar os pokemons em uma li
})

/* 

fetch (usando GET)- Faz uma busca dentro dessa URL e assim receber um processamento assíncrono (resposta demorada) 

catch - Erro na requisição

finally - Independente do sucesso ou erro ele chama o finally

-----------------------------------------------------------------------------------------------

Uma forma diferente de usar, porém não tão usada nos dias atuais

const listItems = [] // array para listar os pokemons

    for(let i = 0; i < pokemons.length; i++){
        const pokemon = pokemons[i]
        console.log(convertPokemonToLi(pokemon)) 
        // Usando for para buscar a lista da API e transcrevendo a lista gerada no HTML

        listItems.push(convertPokemonToLi(pokemon)) // Puxando uma lista com todos pokemons
    }

*/