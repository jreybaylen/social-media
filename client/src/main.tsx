import React from 'react'
import ReactDOM from 'react-dom/client'

const ROOT_ELEMENT = document.getElementById('root')
const REACT_DOM = ReactDOM.createRoot(ROOT_ELEMENT as HTMLElement)

REACT_DOM.render(
	<React.StrictMode>
		<h1 className="text-3xl font-bold underline">
			Hello world!
		</h1>
	</React.StrictMode>
)