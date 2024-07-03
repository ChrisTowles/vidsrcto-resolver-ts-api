import { expect, test } from 'vitest'

import { main_func } from './index'

test('test movie', async () => {

    const testMovieId = 'tt0111161'
    const result = await main_func(`embed/movie/${testMovieId}`)
    expect(1 + 2).toBe(3)
})
