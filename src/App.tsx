import { useState, useEffect, ChangeEvent } from 'react'
import './App.css';

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

import { getData } from './utils/data.util';

export type Monster = {
  id: string
  name: string;
  email: string;
}

const App = () => {

  const [searchField, setSearchField] =  useState('')
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [filterMonsters, setFilterMonsters] = useState(monsters)

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then((response) => response.json())
    //   .then((users) => setMonsters(users))
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const newFilterMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })

    setFilterMonsters(newFilterMonsters)
  }, [monsters, searchField])

  const onSearchChange =  (e: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  }

  return (
    <div className="App">
    <h1 className="app-title">Monster Rolodex</h1>
    <SearchBox placeholder={'search monsters'} className={'search-box'} onChangeHandler={onSearchChange}/>
      <CardList monsters={filterMonsters} />
    </div>
  )
}

export default App;
