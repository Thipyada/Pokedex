import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Ability, PokeProfile, Pokedex, Stat, Type, pokemonProfile } from '@/types/pokedex'
import PokemonSearchPage from '@/component/PokemonSearchPage'
import Link from 'next/link'
import PokemonSwiper from '@/component/PokemonSwiper'
import { Box } from '@mui/system'
import { Chip } from '@mui/material'

export default function PokeDetail() {
  const router = useRouter()
  // console.log('eiei', router?.query?.name)

  const [pokemonList, setPokemonList] = useState<pokemonProfile[]>([])
  // console.log(`pokemon list: `, pokemonList)

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
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((response) => response.json())
      .then((allPokemon) => allPokemon.results.forEach(function (pokemon: { url: string }) {
        fetchPokemonData(pokemon);
      }));
  }

  useEffect(() => {
    fetchData();
  }, [])

  //store pokemon Data
  const [pokemonData, setPokemonData] = useState<PokeProfile>()


  const fetchDataEach = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${router?.query?.name}`)
      .then((response) => response.json())
      .then((allPokemon) => {
        const newPokeData = {

          // first letter to uppercase
          name: allPokemon?.name.charAt(0).toUpperCase() + allPokemon?.name.slice(1),

          id: allPokemon?.id,

          // unit: change from decimeter to meter
          height: ((allPokemon?.height) * 0.1).toFixed(1),

          // unit: change from hectograms to kilograms
          weight: ((allPokemon?.weight) * 0.1).toFixed(1),

          type: allPokemon?.types,
          typeForSearch: [...allPokemon?.types.map((item: Type) => item.type.name)],

          image: {
            back: allPokemon?.sprites.back_default,
            front: allPokemon?.sprites.front_default,
            frontShiny: allPokemon?.sprites.front_shiny,
            backShiny: allPokemon?.sprites.back_shiny
          },

          stats: [...allPokemon?.stats.map((item: Stat) => ({
            ...item,
            statName: item?.stat?.name
          }))],

          abilities: allPokemon?.abilities,
          abilityForDisplay: [...allPokemon?.abilities.map((item: Ability) => item.ability.name)]

        } as unknown as PokeProfile

        const newPrev = { ...newPokeData }
        setPokemonData(newPrev)
      });
  }

  useEffect(() => {
    if (router?.query?.name) {
      // console.log('1',);
      fetchDataEach();
    }
  }, [router.query])


  console.log('pokemonData', pokemonData)

  const [pokePageInput, setPokePageInput] = useState('')

  const pokeTypeColors = (item: string) => {
    let backColor = '';
    const pokeTypes = item;

    if (pokeTypes.includes("normal")) {
      backColor = '#A8A77A'
    } else if (pokeTypes.includes("fire")) {
      backColor = '#EE8130'
    } else if (pokeTypes.includes("water")) {
      backColor = '#6390F0'
    } else if (pokeTypes.includes("electric")) {
      backColor = '#F7D02C'
    } else if (pokeTypes.includes("grass")) {
      backColor = '#7AC74C'
    } else if (pokeTypes.includes("ice")) {
      backColor = '#96D9D6'
    } else if (pokeTypes.includes("fighting")) {
      backColor = '#C22E28'
    } else if (pokeTypes.includes("poison")) {
      backColor = '#A33EA1'
    } else if (pokeTypes.includes("ground")) {
      backColor = '#E2BF65'
    } else if (pokeTypes.includes("flying")) {
      backColor = '#A98FF3'
    } else if (pokeTypes.includes("psychic")) {
      backColor = '#F95587'
    } else if (pokeTypes.includes("bug")) {
      backColor = '#A6B91A'
    } else if (pokeTypes.includes("rock")) {
      backColor = '#B6A136'
    } else if (pokeTypes.includes("ghost")) {
      backColor = '#735797'
    } else if (pokeTypes.includes("dragon")) {
      backColor = '#6F35FC'
    } else if (pokeTypes.includes("dark")) {
      backColor = '#705746'
    } else if (pokeTypes.includes("steel")) {
      backColor = '#B7B7CE'
    } else if (pokeTypes.includes("fairy")) {
      backColor = '#D685AD'
    }
    return backColor
  };


  if (!pokemonData?.name) {
    return (
      <>
        not found
      </>
    )
  }

  return (
    <Box className='PokeDetail'>
      {/* <Link href='/' id='link' className='back-link'>
        &larr; Back
      </Link> */}
      <PokemonSearchPage Input={pokePageInput} setPokePageInput={setPokePageInput} PokeList={pokemonList} />

      <div className="PokeProfile">
        <div className="PokeProfileLeft">
          <div className="PokemonTitle">
            <h1 className="PokemonName">{pokemonData?.name}</h1>
            {pokemonData?.typeForSearch.map((item) => (
              <Chip className="thisPokeType" label={item} sx={{ backgroundColor: pokeTypeColors(item), color: 'white' }} />
            ))}
          </div>
          <div className="PokemonDetail">
            <div className="PokemonHeight">Height: {pokemonData?.height} meters</div>
            <div className="PokemonWeight">Weight: {pokemonData?.weight} kilograms</div>
            <div className='PokemonAbilities'>Ability: {pokemonData?.abilityForDisplay.map((item) => (
              <span style={{ paddingRight: 10 }}>{item}</span>
            ))}</div>
          </div>
          <div className="PokemonStat">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pokemonData?.stats.map((item) => (
                <li>{item.statName} : {item.base_stat}</li>
              ))}
            </ul>
          </div>
        </div>
        <PokemonSwiper pokemonSwiperProps={pokemonData} />
      </div>
    </Box >
  )
}
