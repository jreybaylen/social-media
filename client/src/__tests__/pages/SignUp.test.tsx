import { render, screen } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'

import { SignUpPage } from '@pages/SignUp'

const TEST_PREFIX = 'sign-up'

describe('<SignUpPage />', () => {
    beforeEach(() => {
        render(<SignUpPage />)
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
})