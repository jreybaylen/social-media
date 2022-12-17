import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import RootApp from '@pages/Root'

const ROOT_ELEMENT = document.getElementById('root')
const REACT_DOM = ReactDOM.createRoot(ROOT_ELEMENT as HTMLElement)

REACT_DOM.render(
	<React.StrictMode>
		<RootApp />
	</React.StrictMode>
)