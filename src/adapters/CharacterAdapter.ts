import type { GetCharacterByIdQuery } from "../generated/graphql";

export const characterAdapter = (character: GetCharacterByIdQuery | null) =>{
    if (character === null) {
        return null
    }
    const newCharacter = {
        image: character.character?.image ?? '',
        name: character.character?.name ?? 'unknown',
        species: character.character?.species ?? 'unknown',
        status: character.character?.status ?? 'unknown',
        gender: character.character?.gender ?? 'unknown',
        location: character.character?.location?.name ?? 'unknown',
        origin: character.character?.origin?.name ?? 'unknown',
        episode: character.character?.episode.map(ep => ep?.name ?? 'unknown') ?? []
    }

    return newCharacter

}