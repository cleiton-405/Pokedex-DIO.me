const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 1302
const limit = 10
let offset = 0

/*

1, 2, 3, 4, 5       0 - 5
6, 7, 8, 9, 10      5 - 5
11                  10 - 5 (remove o botao)

*/


function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{ 
    // Fizemos uma requisição HTTP para buscar a lista e passamos por parâmetro uma lista vazia
    
    const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" 
                     alt="${pokemon.name}">
            </div>
        </li>
        `).join('')
    // Usando .map para listar os pokemons em uma li
    pokemonList.innerHTML += newHtml 
    // Mostrando a lista com innerHtml  
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () =>{ 
    // Botão criado com o evento de clique e um limitador
    
    offset += limit

    const qtdRecordsWithNexPage = offset + limit // Quantidade de páginas = 0 + 5

    if(qtdRecordsWithNexPage >= maxRecords){ // If que mostra as páginas e faz o cálculo
        const newLimit = maxRecords - offset // Cálculo do novo limite
        loadPokemonItens(offset, newLimit) 
        // Caso ele atinja um valor maior que 15, remove o botão

        loadMoreButton.parentElement.removeChild(loadMoreButton) // Remover o botão
    }else{
        loadPokemonItens(offset, limit)
        // Esse botão ao ser clicado, vai mostrar de 5 em 5 á mais na lista de pokemons
    }
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

-----------------------------------------------------------------------------------------------

${pokemon.sprites.other.dream_world.front_default} - Estamos buscando as respectivas imagens dos pokemons, acessando esses locais (sprites, other, dream_world e front_default) dentro da Api dos pokemons

-----------------------------------------------------------------------------------------------

*/