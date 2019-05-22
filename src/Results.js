import React from "react";
import pf from 'petfinder-client';
import SearchBox from './SearchBox';
import { Consumer } from './SearchContext';
// components
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
})

class Results extends React.Component {

  state = {
    pets: []
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    petfinder.pet
    .find({
     output: 'full',
      location: this.props.searchParams.location,
      animal: this.props.searchParams.animal,
      breed: this.props.searchParams.breed
    })
    .then(data => {
        let pets

        // check if pets returned something
        if(data.petfinder.pets && data.petfinder.pets.pet) {
          // check if it found more than one pet else
          if(Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet

          //return the one pet but still in an array
          } else {
            pets = [data.petfinder.pets.pet]
          }

        // if it finds nothing make it an empty array
        } else {
          pets = []
        }

        this.setState({ pets }) // same as this this.setState({ pets: pets })
      })
  }

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          // sometimes pets have multiple breeds, so we need to check that
          let breed
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ")
          } else {
            breed = pet.breeds.breed
          }

          return(
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          )
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  )
};
