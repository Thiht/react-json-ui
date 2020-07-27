import React, { useState } from 'react'

import { JSONUI, listKeys } from 'react-json-ui'
import 'react-json-ui/dist/index.css'

const App = () => {
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const [renderNulls, setRenderNulls] = useState(true)
  const [renderImages, setRenderImages] = useState(false)
  const [renderLinks, setRenderLinks] = useState(true)
  const [renderHTML, setRenderHTML] = useState(true)
  const [humanizeKeys, setHumanizeKeys] = useState(true)
  const [filterKeys, setFilterKeys] = useState([] as string[])

  const fetchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetch(event.target.value)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message)
        }
        setError(err + '')
      })
  }

  const toggleRenderNulls = () => {
    setRenderNulls(!renderNulls)
  }

  const toggleRenderImages = () => {
    setRenderImages(!renderImages)
  }

  const toggleRenderLinks = () => {
    setRenderLinks(!renderLinks)
  }

  const toggleRenderHTML = () => {
    setRenderHTML(!renderHTML)
  }

  const toggleHumanizeKeys = () => {
    setHumanizeKeys(!humanizeKeys)
  }

  const changeFilterKeys = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilterKeys([...filterKeys, event.target.value])
    } else {
      setFilterKeys(filterKeys.filter((item) => item !== event.target.value))
    }
  }

  return (
    <form>
      {error !== '' && <div>{error}</div>}
      <label>
        API URL:{' '}
        <input
          type='text'
          list='sample-data'
          onChange={fetchData}
          placeholder='Double click to show suggestions'
        />
      </label>
      <datalist id='sample-data'>
        <option value='https://api.github.com/repos/thiht/smocker/stargazers'>
          Thiht/smocker stargazers
        </option>
        <option value='https://api.spacexdata.com/v4/launches/latest'>
          SpaceX latest launches
        </option>
        <option value='https://api.magicthegathering.io/v1/cards'>
          Magic The Gathering cards
        </option>
        <option value='http://api.tvmaze.com/search/shows?q=friends'>
          TV Shows containing "Friends" on TVmaze
        </option>
        <option value='https://world.openfoodfacts.org/api/v0/product/737628064502.json'>
          Open Food Facts - Rice Noodles
        </option>
      </datalist>

      <div>
        <h2>Options</h2>
        <label>
          <input
            type='checkbox'
            onChange={toggleRenderNulls}
            checked={renderNulls}
          />
          Render Nulls
        </label>
        <label>
          <input
            type='checkbox'
            onChange={toggleRenderImages}
            checked={renderImages}
          />
          Render Images
        </label>
        <label>
          <input
            type='checkbox'
            onChange={toggleRenderLinks}
            checked={renderLinks}
          />
          Render Links
        </label>
        <label>
          <input
            type='checkbox'
            onChange={toggleRenderHTML}
            checked={renderHTML}
          />
          Render HTML
        </label>
        <label>
          <input
            type='checkbox'
            onChange={toggleHumanizeKeys}
            checked={humanizeKeys}
          />
          Humanize Keys
        </label>
      </div>

      {Object.keys(data).length > 0 && (
        <div>
          <h2>Filter Keys</h2>
          {listKeys(data).map((key) => (
            <>
              <label>
                <input
                  type='checkbox'
                  value={key}
                  key={key}
                  onChange={changeFilterKeys}
                />
                {key}
              </label>
            </>
          ))}
        </div>
      )}

      <hr />

      <JSONUI
        data={data}
        options={{
          renderNulls,
          renderImages,
          renderLinks,
          renderHTML,
          humanizeKeys,
          filterKeys,
        }}
      />
    </form>
  )
}

export default App
