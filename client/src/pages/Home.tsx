import { useOutletContext } from 'react-router-dom'

import { Ads } from '@containers/Ads'
import { Profile } from '@containers/Profile'
import { NewsFeed } from '@containers/NewsFeed'

export function HomePage (): JSX.Element {
    const outletContext = useOutletContext()

    return (
        <div
            className="flex flex-row mb-5 mt-[95px]"
        >
            <Profile />
            <NewsFeed />
            <Ads />
        </div>
    )
}