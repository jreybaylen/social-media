import React from 'react'
import ReactDOM from 'react-dom/client'

const ROOT_ELEMENT = document.getElementById('root')
const { render } = ReactDOM.createRoot(ROOT_ELEMENT as HTMLElement)

render(
	<React.StrictMode>
		<div>Hello World!</div>
	</React.StrictMode>
)