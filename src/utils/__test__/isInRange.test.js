import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {isInRange} from '../isInRange'
beforeEach(cleanup)

test('should return true', () => {
const result = isInRange('13:00',['08','22'])
    expect(result).toBe(true);
})
test('should return false', () => {
    const result = isInRange('13:00',['17','22'])
        expect(result).toBe(false);
    })
