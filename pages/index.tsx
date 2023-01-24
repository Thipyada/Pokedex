import Head from 'next/head'
import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { Pokedex, pokemonProfile } from '@/types/pokedex'
import PokemonSearchIndex from '@/component/PokemonSearchIndex'
import PokemonCard from '@/component/PokemonCard'
import { Container } from '@mui/material'

export default function Home() {
  const [pokemonList, setPokemonList] = useState<pokemonProfile[]>([])
  console.log(`pokemon list: `, pokemonList)

  const fetchPokemonData = (pokemon: { url: string }) => {
    const url = pokemon.url
    fetch(url)
      .then(response => response.json())
      .then(function (pokeData: Pokedex) {
        setPokemonList((prevPokeData) => {
          const newPrev = [...prevPokeData]
          newPrev.push({
            name: pokeData.name,
            id: pokeData.id,
            type: pokeData.types,
            typeForSearch: [...pokeData.types.map((item) => item.type.name)],
            image: pokeData.sprites.front_default,
          })
          return newPrev
        })
      })
  }

  const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
      .then((response) => response.json())
      .then((allPokemon) => allPokemon.results.forEach(function (pokemon: { url: string }) {
        fetchPokemonData(pokemon);
      }));
  }

  useEffect(() => {
    fetchData();
  }, [])


  const [pokemonNameInput, setPokemonNameInput] = useState('')

  console.log(pokemonNameInput)
  return (
    <>
      <div className='pokeMain'>
        <Head>
          <title>
            PokeDex
          </title>
        </Head>

        <Box sx={{ flexGrow: 1 }} className="pokeContainer container">

          <PokemonSearchIndex Input={pokemonNameInput} setPokemonNameInput={setPokemonNameInput} />


          <Grid container spacing={1} className="pokeList">
            <PokemonCard PokeList={pokemonList} PokeName={pokemonNameInput} />
          </Grid>
        </Box>
      </div >
    </>
  )
}
