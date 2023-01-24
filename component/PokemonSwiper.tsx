import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination } from "swiper";

import { PokeProfile } from '@/types/pokedex'


export default function PokemonSwiper(props: { pokemonSwiperProps: PokeProfile }) {
  const {
    pokemonSwiperProps
  } = props

  // console.log('pokeprofile', pokemonSwiperProps)

  return (
    <div className="pokeSwiperBox">
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: false,
          slideShadows: true,
          shadowOffset: 0,
          shadowScale: 0,
        }}
        loop={true}
        pagination={false}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={pokemonSwiperProps?.image?.front} width='100%' height='100%' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={pokemonSwiperProps?.image?.back} width='100%' height='100%' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={pokemonSwiperProps?.image?.frontShiny} width='100%' height='100%' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={pokemonSwiperProps?.image?.backShiny} width='100%' height='100%' />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
