import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({ filters: { type: event.target.value }})
  }

  onFindPetsClick = () => {
    let url = this.state.filters.type == 'all' ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`
    fetch(url)
    .then((resp) => resp.json())
    .then((json) => this.setState({ pets: json }))
    .catch((err) => console.error(err))
  }

  onAdoptPet = (pet_id) => {
    let pets = this.state.pets
    pets.find(p => p.id == pet_id).isAdopted = true
    this.setState({ pets: pets })
    // console.log(this.state.pets.find(p => p.id == pet_id).isAdopted)
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet}
                pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
