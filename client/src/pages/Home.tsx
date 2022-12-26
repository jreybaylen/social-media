import { Profile } from '@containers/Profile'
import { NewsFeed } from '@containers/NewsFeed'
import { useOutletContext } from 'react-router-dom'

export function HomePage (): JSX.Element {
    const outletContext = useOutletContext()

    console.log(outletContext)

    return (
        <div
            className="flex flex-row"
        >
            <Profile />
            <NewsFeed />
        </div>
    )
}