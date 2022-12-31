import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Navbar } from '@shared/NavBar'
import { SignInPage } from './SignIn'
import { SignUpPage } from './SignUp'
import { HomePage } from './Home'
import { ProfilePage } from './Profile'
import { AuthRoute } from '@routes/Auth'

export default function Root (): JSX.Element {
    return (
        <BrowserRouter>
            <Navbar />
			<ToastContainer />
            <Routes>
                <Route
                    path="/sign-in"
                    element={ <SignInPage /> }
                />
                <Route
                    path="/sign-up"
                    element={ <SignUpPage /> }
                />
                <Route
                    path="/"
                    element={ <AuthRoute /> }
                >
                    <Route
                        index
                        element={ <HomePage /> }
                    />
                    <Route
                        path="profile"
                        element={ <ProfilePage /> }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}