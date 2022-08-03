
export default class SwapiService {
    
    async getResource(url) {
        this._apiBase = 'https://api.themoviedb.org/3/'
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error ('Server error ' + res.status);
        }
        return await res.json();
    }
}