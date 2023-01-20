import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { TextField } from "@mui/material"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import { Pokedex, Type } from '../types/pokedex'
import { Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import Head from "next/head"

interface pokemonProfile {
  name: string
  id: number
  typeForSearch: string[]
  type: Type[]
  image: string
}
export default function Home() {

  // store pokemon list
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
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((allPokemon) => allPokemon.results.forEach(function (pokemon: { url: string }) {
        fetchPokemonData(pokemon);
      }));
  }

  useEffect(() => {
    fetchData();
  }, [])

  // store user's input
  const [pokemonName, setPokemonName] = useState('')

  // result of Pokemon found
  // const [pokemonResult, setPokemonResult] = useState<pokemonProfile[]>([])


  const handleChange = (value: string) => {
    const pokeNameInput = value

    // if (pokeNameInput !== '') {
    //   const newPokemonList = pokemonList.filter((item) => {
    //     return item.name.toLowerCase().includes(pokeNameInput.toLowerCase())
    //   })
    //   setPokemonResult(newPokemonList)
    // } else {
    //   setPokemonResult(pokemonList)
    // }

    setPokemonName(pokeNameInput)
  }


  // console.log(`pokemonResult`, pokemonResult)

  // const pokemonCard = () => {
  //   if (pokemonResult.length < 1) {
  //     return pokemonList.filter((item) => {
  //       return item.name === pokemonName
  //     }).sort((a, b) => {
  //       return a.id - b.id
  //     }).map((item) => (
  //       <div className="pokeCard" key={item.id}>
  //         <img className="pokePic" src={item.image} />
  //         <div className="pokeName">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
  //         <div className="pokeId">#{item.id}</div>
  //         <div className="pokeType">
  //           {item.type.map((list) => (
  //             <li key={list.slot}>{list.type.name}</li>
  //           ))}
  //         </div>
  //       </div>
  //     ))
  //   } else {
  //     return pokemonResult.sort((a, b) => {
  //       return a.id - b.id
  //     }).map((item) => (
  //       <div className="pokeCard" key={item.id}>
  //         <img className="pokePic" src={item.image} />
  //         <div className="pokeName">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
  //         <div className="pokeId">#{item.id}</div>
  //         <div className="pokeType">
  //           {item.type.map((list) => (
  //             <li key={list.slot}>{list.type.name}</li>
  //           ))}
  //         </div>
  //       </div>
  //     ))
  //   }
  // }

  const pokeFilter = pokemonList.filter((item) => {
    return item.name.includes(pokemonName) || !!(item.typeForSearch.filter((i) => i.includes(pokemonName)).length > 0)
  }).sort((a, b) => {
    return a.id - b.id
  })

  return (
    <div className='pokeMain'>
      <Head>
        <title>
          PokeDex
        </title>
      </Head>

      <header className="pokeHead">
        <Typography variant="h4">PokeDex</Typography>
      </header>

      <Box sx={{ flexGrow: 1 }} className="pokeContainer container">

        <div className="pokeSearch">
          <TextField
            type="text"
            value={pokemonName}
            onChange={(e) => handleChange(e.target.value)}
            label='Name or Type'
            fullWidth
            margin="normal" />
        </div>

        <Grid container spacing={1} className="pokeList">

          {/* {pokemonCard()} */}
          {(pokeFilter.length > 0) ? pokeFilter.map((item) => (
            <Grid item xs={3} key={item.id}>

              <Card className="pokeCard" sx={{ maxWidth: 345, height: '100%' }}>
                <CardMedia component="img"
                  className="pokePic" image={item.image} width='100%' />
                <CardContent>
                  <div className="pokeName">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                  <div className="pokeId">#{item.id}</div>
                  <div className="pokeType">
                    {item.type.map((list) => (
                      <li key={list.slot}>{list.type.name}</li>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </Grid>
          ))
            :
            (
              <Typography variant="h3" className="pokeAlert">We cannot find your pokemon</Typography>
            )}
        </Grid>
      </Box>

    </div >
  )
}
