import type { GetCharacterByIdQuery } from "../generated/graphql";

// This adapter returns either null or a character without null or undefined values
export const characterAdapter = (character: GetCharacterByIdQuery | null | undefined
) =>{
    //If character is either null or undefined returns null
    if (character === null || character === undefined) {
        return null
    }

    //Any null value is returned as unknown
    const newCharacter = {
        image: character.character?.image ?? '',
        name: character.character?.name ?? 'unknown',
        species: character.character?.species ?? 'unknown',
        status: character.character?.status ?? 'unknown',
        gender: character.character?.gender ?? 'unknown',
        location: character.character?.location?.name ?? 'unknown',
        origin: character.character?.origin?.name ?? 'unknown',
        //The episode array turns into an array of only the names, if the episode name is undefined then it's set to unknown
        //If the array doesnt exist then returns an empty array
        episode: character.character?.episode.map(ep => ep?.name ?? 'unknown') ?? []
    }

    return newCharacter

}