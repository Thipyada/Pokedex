import React, { SetStateAction, Dispatch, useState, useEffect } from 'react'
import { TextField } from "@mui/material"
import { Pokedex, pokemonProfile } from '@/types/pokedex'
import Link from 'next/link'
import Router from 'next/router'

type setProps = {
  Input: string
  PokeList: pokemonProfile[]
  setPokePageInput: Dispatch<SetStateAction<string>>
}

export default function PokemonSearchPage(props: setProps) {

  const { setPokePageInput, Input, PokeList } = props

  const [pokemonResult, setPokemonResult] = useState<pokemonProfile[]>([])

  useEffect(() => {
    const clearPokePageInput = () => setPokePageInput('');

    Router.events.on('routeChangeComplete', clearPokePageInput)

    return () => {
      Router.events.off('routeChangeComplete', clearPokePageInput)
    }
  }, [])

  const handleChange = (value: string) => {
    const pokeInput = value
    setPokePageInput(pokeInput)

    let matchingPokemon: pokemonProfile[] = [];

    if (value.length > 0) {
      for (let pokemon of PokeList as pokemonProfile[]) {

        // break when the searching result is >=10
        if (matchingPokemon.length >= 10) {
          break;
        }

        // make all the input and Pokemon's name to lowercase in case somebody type in uppercase -> easier to compare
        const match = pokemon.name.toLowerCase().startsWith(value.toLowerCase())

        // add that pokemon into the array
        if (match) {
          const pokemonData = {
            ...pokemon,
            pokemon: `${pokemon.name.toLowerCase()}`
          }
          matchingPokemon.push(pokemonData);
        }
      }
    }

    console.log(matchingPokemon);
    return setPokemonResult(matchingPokemon);
  }

  // console.log('onInputChange', setPokePageInput)



  return (
    <div className="pokeSearchPage">
      <div>
        <h2 style={{ textAlign: 'center', color: 'white' }}>POKEDEX</h2>
      </div>
      <TextField
        type="text"
        value={Input}
        onChange={(e) => handleChange(e.target.value)}
        label='Name or Type'
        fullWidth
        margin="normal" />

      {Input.length > 0 && (
        <ul>
          {pokemonResult.length > 0 ? (
            // if there is a result we need to map through that result
            pokemonResult.map((pokemon, index) => (
              <li key={pokemon.name}>
                <Link legacyBehavior href={`/pokedetail/${pokemon.name}`}>
                  <a>
                    {pokemon.name}
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <li className="search_no-result">No result</li>
          )}
        </ul>
      )}
    </div>
  )
}



