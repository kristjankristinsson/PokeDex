// Fetch pokemon details
async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const pokemonData = await response.json();
    return pokemonData;
}



// Fetch pokemons
async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
    const pokemons = await response.json();
    return pokemons;
}



// Filter pokemons based on input value
function filterPokemons(inputValue) {
    const pokemonDivs = document.querySelectorAll(".pokemon");
    pokemonDivs.forEach(pokemonDiv => {
        const pokemonName = pokemonDiv.getAttribute("data-name").toLowerCase();
        if (pokemonName.includes(inputValue.toLowerCase())) {
            pokemonDiv.style.display = "block";
        } else {
            pokemonDiv.style.display = "none";
        }
    });
}


// Fetching pokemons data
fetchPokemons().then(pokemons => {
    let pokemonContainer = document.getElementById("pokemon-container")
    pokemons.results.forEach((pokemon => {
        let pokemonDiv = document.createElement("div")
        pokemonDiv.className = `pokemon`;
        pokemonDiv.setAttribute("data-name", pokemon.name)
        pokemonDiv.innerHTML = `${pokemon.name}`;
        pokemonDiv.style.cursor = "pointer";
        

        fetchPokemonDetails(pokemon.url).then(pokemonData => {
        // Concatenating name and image URL directly   
        pokemonDiv.innerHTML = `${pokemon.name.toUpperCase()} <img src="${pokemonData.sprites.front_default}" alt="${pokemon.name}">`;
        });

        pokemonContainer.appendChild(pokemonDiv); 
        pokemonContainer.style.display = "grid";
        pokemonContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
       
        // Styling individual pokemon div container
        pokemonDiv.style.backgroundColor = "hsla(0, 0%, 17%, 0.87)"
        pokemonDiv.style.border = "1px solid #999"
        pokemonDiv.style.color = "#fff"
        pokemonDiv.style.padding = "50px"
        pokemonDiv.style.width = "100px";
        pokemonDiv.style.height = "100px;"
        
        // Styling pokemonContainer

        
}))


 // Add event listener to input field for filtering
// Add event listener to input field for filtering
let inputField = document.querySelector(".inputField");
inputField.addEventListener("input", function(event) {
    filterPokemons(event.target.value);
});

});

   

