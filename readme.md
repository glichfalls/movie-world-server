# Movie World Server

Express REST API server to load, add and delete favourite movies.

The data is saved to a mongo db collection. (see /config/config.ts for the mongo db config)

All movie ids represent the tmdb (https://themoviedb.org) internal movie ids.



## JSON API

### Response scheme:

``{status: number, message: string, payload: any}`` 

### Routes

``GET /likes``

returns an array of movie ids.

Possible status codes: 

- 200: success
- 500: error

``GET /movie/:movie_id``

returns status code 204 (No Content) if the movie is liked or status code 404 (Not Found) if not.

Possible status codes: 

- 204: movie is liked
- 404: movie is not liked

``POST /movie/:movie_id/like``

create a like entry for the sent movie id.

Possible status codes:

- 200: success
- 409: movie is already liked
- 500: error

``DELETE /movie/:movie_id/like``

deletes the like of the sent movie id.

Possible status codes:

- 200: success
- 409: movie is already liked
- 500: error
