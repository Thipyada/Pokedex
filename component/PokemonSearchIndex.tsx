import React, { SetStateAction, Dispatch } from 'react'
import { TextField } from "@mui/material"

type setProps = {
  Input: string
  setPokemonNameInput: Dispatch<SetStateAction<string>>
}

export default function PokemonSearchIndex(props: setProps) {

  const { setPokemonNameInput, Input } = props

  const handleChange = (value: string) => {
    const pokeInput = value
    setPokemonNameInput(pokeInput)
  }

  console.log('onInputChange', setPokemonNameInput)



  return (
    <div className="pokeSearch">
      <h2 style={{ textAlign: 'center', color: 'white' }}>POKEDEX</h2>
      <TextField
        type="text"
        value={Input}
        onChange={(e) => handleChange(e.target.value)}
        label='Name or Type'
        fullWidth
        margin="normal" />
    </div>
  )
}



