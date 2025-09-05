import { gql } from "@apollo/client";


//Fetch all characters--------------------
export const GET_CHARACTERS = gql`
query GetCharacters($page: Int!){
  characters(page: $page){
    info{
      count,
      pages,
      next
    }
    results{
      id
      name
      species
    }
  }
}
`

//Fetch character by ID
export const GET_BY_ID= gql`
query GetCharacterById($id: ID!) {
  character(id: $id){
    image
    name
    species
    status
    gender
    location{name}
    origin{name}
    episode{name}
  }
}
`