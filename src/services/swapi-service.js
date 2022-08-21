export default class SwapiService {
  constructor() {
    this.apiBase = 'https://api.themoviedb.org/3/'
  }

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Server error ${res.status}`)
    }
    const result = await res.json()
    return result
  }

  async createGuestSession(url) {
    const res = await fetch(`${this.apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Server error ${res.status}`)
    }
    const result = await res.json()
    return result
  }

  async getGuestSessionRatedMovie(url, page = 1) {
    const res = await fetch(
      `${this.apiBase}guest_session/${url}/rated/movies?api_key=a2fbb8a8510cd68f6c08fbbdeffcb92d&page=${page}`
      // `${this.apiBase}guest_session/${url}/rated/movies?api_key=d019d5a6023ae30666fb845af41ca028&page=${page}`
    )
    if (!res.ok) {
      throw new Error(`Server error ${res.status}`)
    }
    const result = await res.json()
    return result
  }

  async postRating(sessionId, movieId, rating) {
    const ratingData = {
      value: rating,
    }
    await fetch(
      `${this.apiBase}movie/${movieId}/rating?api_key=a2fbb8a8510cd68f6c08fbbdeffcb92d&guest_session_id=${sessionId}`,
      // `${this.apiBase}movie/${movieId}/rating?api_key=d019d5a6023ae30666fb845af41ca028&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(ratingData),
      }
    )
  }
}
