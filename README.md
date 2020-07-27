# react-json-ui

> Generate user interface from arbitrary JSON

[![NPM](https://img.shields.io/npm/v/react-json-ui.svg)](https://www.npmjs.com/package/react-json-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-json-ui
```

## Usage

```tsx
import React, { Component } from 'react'

import JSONUI from 'react-json-ui'
import 'react-json-ui/dist/index.css'

class Example extends Component {
  render() {
    return (
      <JSONUI
        data={{
          foo: 'bar',
        }}
      />
    )
  }
}
```

## [License](./LICENSE.md)

react-json-ui

Copyright © 2020 Thibaut Rousseau

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
