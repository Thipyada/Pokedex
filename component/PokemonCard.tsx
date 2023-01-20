import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import { Typography } from "@mui/material"
import { pokemonProfile } from '../types/pokedex'


export default function PokemonCard(props: { pokeFilter: pokemonProfile[] }) {
  const { pokeFilter } = props

  return (
    <>
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
    </>
  )
}
