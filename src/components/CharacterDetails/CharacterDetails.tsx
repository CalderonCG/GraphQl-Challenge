import type { GetCharacterByIdQuery } from '../../generated/graphql'
import DetailCard from '../DetailCard/DetailCard'
import './CharacterDetails.scss'


type DetailsProps={
  characterDetails: GetCharacterByIdQuery | undefined
}
function CharacterDetails({characterDetails}: DetailsProps) {
  if (characterDetails === undefined){
    return <p>Please select a character</p>
  }
  const character = characterDetails.character

  console.log(character?.episode)
  return (
    <div className='details'>
      <img  className='details_image'
      src={character?.image ?? ''} alt={character?.name ?? 'character image'} />
        <h1>General Information</h1>
        <DetailCard name='Name' value={character?.name}/>
        <DetailCard name='Species'value={character?.species}/>
        <DetailCard name='Status' value={character?.status}/>
        <DetailCard name='Gender' value={character?.gender}/>
        <DetailCard name='Location (name)' value={character?.location?.name}/>
        <DetailCard name='Origin (name)' value={character?.origin?.name}/>

        <h1>Episodes</h1>
        {character?.episode.slice(0,5).map((ep, index)=>
        <DetailCard key={index} name={ep?.name}/>
        )}
    </div>
  )
}

export default CharacterDetails