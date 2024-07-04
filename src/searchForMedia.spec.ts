import { describe, expect, test } from 'vitest'
import { searchForMedia } from './searchForMedia'
import { MediaType } from './models/media'


describe('Search for Media', async () => {
    

    test('test tv show', async () => {

        const testMovieId = 'tt0944947' // Game of Thrones
        const result = await searchForMedia({
            mediaType: MediaType.tv,
            id: testMovieId,
            ifTV: {
                season: 1,
                episode: 1
            }
      
        })

        expect(result.status).toBe(200)

    })


    test.skip('test movie - The Godfather', async () => {

        const testMovieId = 'tt0068646'  // The Godfather
        const result = await searchForMedia({
            mediaType: MediaType.movie,
            id: testMovieId
        })

        expect(result.status).toBe(200)

    })

    test.skip('test movie - Oppenheimer', { timeout: 2 * 60 * 1000 }, async () => {

        const testMovieId = 'tt15398776'  // Oppenheimer
        const result = await searchForMedia({
            mediaType: MediaType.movie,
            id: testMovieId
        })

        expect(result.status).toBe(200)

    })

})  