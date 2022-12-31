import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import 'react-toastify/dist/ReactToastify.min.css'
import './index.css'

import RootApp from '@pages/Root'

const queryClient = new QueryClient()
const ROOT_ELEMENT = document.getElementById('root')
const REACT_DOM = ReactDOM.createRoot(ROOT_ELEMENT as HTMLElement)

REACT_DOM.render(
	<React.StrictMode>
		<QueryClientProvider
			client={ queryClient }
		>
			<RootApp />
			<ReactQueryDevtools
				initialIsOpen
			/>
		</QueryClientProvider>
	</React.StrictMode>
)