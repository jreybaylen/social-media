import { ReactQueryDevtools  } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type TestProvider = {
    children: JSX.Element | Array<JSX.Element>
}

const queryClient = new QueryClient()

export function TestQueryClientProvider (PROPS: TestProvider) {
    return (
        <QueryClientProvider
            client={ queryClient }
        >
            { PROPS.children }
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}