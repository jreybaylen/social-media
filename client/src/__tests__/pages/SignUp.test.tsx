import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'

import { SignUpPage } from '@pages/SignUp'
import { TestQueryClientProvider } from '@tests/components/QueryClient'

const TEST_PREFIX = 'sign-up'

describe('<SignUpPage />', () => {
    beforeEach(() => {
        render(
            <TestQueryClientProvider>
                <SignUpPage />
            </TestQueryClientProvider>
        )
    })

    it(
        'Should display "Sign Up" as heading',
        async () => {
            const HEADING = await screen.findByTestId(`${ TEST_PREFIX }-heading`)

            expect(HEADING.tagName).toBe('H1')
            expect(HEADING.textContent).toBe('Sign Up')
        }
    )

    it(
        'Should render form with "autoComplete" is equal to "off"',
        async () => {
            const HEADING = await screen.findByTestId(`${ TEST_PREFIX }-form`)

            expect(HEADING).toBeInTheDocument()
            expect(HEADING.getAttribute('autoComplete')).toBe('off')
        }
    )

    it(
        'Should display disable the button on initial load',
        async () => {
            const BUTTON_SUBMIT = await screen.findByTestId(`${ TEST_PREFIX }-submit`)

            expect(BUTTON_SUBMIT.hasAttribute('disabled')).toBe(true)
        }
    )

    it(
        'Should enable the button after fill out the required fields',
        async () => {
            const USER_ACTION = userEvent.setup()
            const FIRST_NAME = await screen.findByTestId(`${ TEST_PREFIX }-firstName`)
            const LAST_NAME = await screen.findByTestId(`${ TEST_PREFIX }-lastName`)
            const EMAIL = await screen.findByTestId(`${ TEST_PREFIX }-email`)
            const PASSWORD = await screen.findByTestId(`${ TEST_PREFIX }-password`)
            const BUTTON_SUBMIT = await screen.findByTestId(`${ TEST_PREFIX }-submit`)

            await USER_ACTION.type(FIRST_NAME, 'John')
            await USER_ACTION.type(LAST_NAME, 'Doe')
            await USER_ACTION.type(EMAIL, 'john.doe@gmail.com')
            await USER_ACTION.type(PASSWORD, 'admin12345')
            
            expect(BUTTON_SUBMIT.hasAttribute('disabled')).toBe(false)
        }
    )
})