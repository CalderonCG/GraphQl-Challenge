import { gql } from "@apollo/client";

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