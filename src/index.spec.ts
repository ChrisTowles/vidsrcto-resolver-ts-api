import { expect, test } from 'vitest'
import { main_func } from './main_func'



test('test tv show', {timeout: 2 * 60 * 1000}, async () => {

    const testMovieId = 'tt0944947' // Game of Thrones
    const result = await main_func(`embed/tv/${testMovieId}`)

    expect(result.status).toBe(200)

})


test.skip('test movie - The Godfather', {timeout: 2 * 60 * 1000}, async () => {

    const testMovieId = 'tt0068646'  // The Godfather
    const result = await main_func(`embed/movie/${testMovieId}`)

    expect(result.status).toBe(200)

})

test.skip('test movie - Oppenheimer', {timeout: 2 * 60 * 1000}, async () => {

    const testMovieId = 'tt15398776'  // Oppenheimer
    const result = await main_func(`embed/movie/${testMovieId}`)

    expect(result.status).toBe(200)

})
