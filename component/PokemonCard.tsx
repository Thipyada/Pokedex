import React from 'react'
import { Pokedex, Type, pokemonProfile } from '@/types/pokedex'
import Grid from '@mui/material/Grid'
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import { Button, ListItem, Typography } from "@mui/material"
import Link from "next/link"
import CardActionArea from "@mui/material/CardActionArea"
import { Box } from '@mui/system'
import Chip from '@mui/material/Chip'

type setPoke = {
  PokeList: pokemonProfile[]
  PokeName: string
}

export default function PokemonCard(props: setPoke) {
  const { PokeList, PokeName } = props

  const pokeFilter = PokeList.filter((item) => {
    return item.name.includes(PokeName) || !!(item.typeForSearch.filter((i) => i.includes(PokeName)).length > 0)
  }).sort((a, b) => {
    return a.id - b.id
  })

  const pokeId = (id: number) => {
    if (id < 10) {
      return `#00${id}`
    } else {
      if (id >= 100) {
        return `#${id}`
      } else {
        return `#0${id}`
      }
    }
  }

  const getBackColor = (poke: pokemonProfile, type: string) => {
    let backColor = type === "img" ? "#fffcdb" : "#EEE8AA";
    const pokeTypes = poke.type.map((i) => i.type.name);
    if (pokeTypes.includes("fire")) {
      backColor = type === "img" ? "#fff1ee" : "#FEC5BB";
    } else if (pokeTypes.includes("grass")) {
      backColor = type === "img" ? "#ccfcef" : "#80FFDB";
    } else if (pokeTypes.includes("water")) {
      backColor = type === "img" ? "#f2f5ff" : "#DFE7FD";
    } else if (pokeTypes.includes("bug")) {
      backColor = type === "img" ? "#d6f5ce" : "#B0DEA3";
    } else if (pokeTypes.includes("normal")) {
      backColor = type === "img" ? "#8efafa" : "#E0FFFF";
    } else if (pokeTypes.includes("electric")) {
      backColor = type === "img" ? "#ebfcf2" : "#D8E2DC";
    } else if (pokeTypes.includes("ground")) {
      backColor = type === "img" ? "#ffebf2" : "#FAD2E1";
    } else if (pokeTypes.includes("fairy")) {
      backColor = type === "img" ? "#fcf7f2" : "#FFF1E6";
    } else if (pokeTypes.includes("ghost")) {
      backColor = type === "img" ? "#ffcbc2" : "#F8EDEB";
    } else if (pokeTypes.includes("fighting")) {
      backColor = type === "img" ? "#c2fcae" : "#F1FAEE";
    } else if (pokeTypes.includes("rock")) {
      backColor = type === "img" ? "#c9fdff" : "#A8DADC";
    }
    return backColor;
  };

  const pokeTypeColors = (list: Type) => {
    let backColor = '';
    const pokeTypes = list.type.name;

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

  return (
    <>
      {(pokeFilter.length > 0) ? pokeFilter.map((item) => (
        <Grid item xs={4} md={3} key={item.id}>
          <Link href={`/pokedetail/${item.name}`} style={{ textDecoration: 'none' }} >
            <Card className="pokeCard" sx={{ maxWidth: 345, maxHeight: 345, height: '100%', display: 'flex', backgroundColor: getBackColor(item, "paper") }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardActionArea >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Chip className="pokeId" label={pokeId(item.id)} variant='outlined' color='default' />
                    <h4 className="pokeName" style={{ marginBottom: 5, marginTop: 5 }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h4>
                    <div className="pokeType" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      {item.type.map((list) => (
                        <Chip key={list.slot} label={list.type.name} sx={{ backgroundColor: pokeTypeColors(list), color: 'white' }} variant="filled" />
                      ))}
                    </div>
                  </CardContent>
                </CardActionArea>
              </Box>
              <CardMedia component="img"
                className="pokePic" image={item.image} width='100%' />
            </Card>
          </Link>
        </Grid>

      ))
        :
        (
          <Typography variant="h3" className="pokeAlert">We cannot find your pokemon</Typography>
        )
      }
    </>
  )
}
