import DetailCard from '../DetailCard/DetailCard'
import './CharacterDetails.scss'
function CharacterDetails() {
  return (
    <div className='details'>
        <h1>General Information</h1>
        <DetailCard/>
        <DetailCard/>
        <DetailCard/>
        <DetailCard/>

        <h1>Vehicles</h1>
        <DetailCard/>
        <DetailCard/>
    </div>
  )
}

export default CharacterDetails