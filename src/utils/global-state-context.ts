import _ from 'lodash'
import React from 'react'

const GlobalStateContext = React.createContext([{}, _.noop])

export default GlobalStateContext
