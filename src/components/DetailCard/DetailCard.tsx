import './DetailCard.scss'

type DetailProps={
  name: string,
  value?: string;
}

function DetailCard({name,value}: DetailProps) {
  return (
    <div className='detail'>
        <p className='detail_name'>{name}</p>
        <p className='detail_value'>{value}</p>
    </div>
  )
}

export default DetailCard