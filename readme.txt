
API Express
- Seguridad token JWT, cada peticion actualiza el token.

Endpoints

tipo: POST
url: /auth/login
parametros: (JSON)
    {
        user: string
        password: string
    }
resultado:
    {
        status: number
        token: string
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: POST
url: /auth/register
parametros: (JSON)
    {
        user: string
        password: string
        rol: 'ADMIN' | 'USUARIO'
    }
resultado:
    {
        status: number
        user: userModel
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: GET
url: /app/movies/:page/:search?
parametros: (JSON)
    {
        page: string (URL)
        search: string (URL opcional)
    }
resultado:
    {
        status: number
        token: string
        movies: movieModel[]
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: GET
url: /app/movie/:id
parametros: (JSON)
    {
        id: string (URL)
    }
resultado:
    {
        status: number
        token: string
        movie: movieModel
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: GET
url: /app/comments/:id
parametros: (JSON)
    {
        id: string (URL)
    }
resultado:
    {
        status: number
        token: string
        comments: commentModel[]
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }


tipo: GET
url: /admin/users/:search?
headers:
    {
        Authorization: `Bearer ${token}`
    }
parametros: (JSON)
    {
        search: string
    }
resultado:
    {
        status: number
        token: string
        users: userModel[]
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: GET
url: /admin/comments/:id
headers:
    {
        Authorization: `Bearer ${token}`
    }
parametros: (JSON)
    {
        id: string
    }
resultado:
    {
        status: number
        token: string
        comments: commentModel[]
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: DELETE
url: /admin/comment/:id
headers:
    {
        Authorization: `Bearer ${token}`
    }
parametros: (JSON)
    {
        id: string
    }
resultado:
    {
        status: number
        token: string
        comment: commentModel
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: POST
url: /admin/aceptRequestMovie/:id
headers:
    {
        Authorization: `Bearer ${token}`
    }
parametros: (JSON)
    {
        id: string
    }
resultado:
    {
        status: number
        token: string
        movie: movieModel
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: POST
url: /user/comment/:id
headers:
    {
        Authorization: `Bearer ${token}`
    }
parametros: (JSON)
    {
        id: string (URL),
        comment: string,
        qualification: number,
        idMovie: string,
        idUser: string
    }
resultado:
    {
        status: number
        token: string
        movie: movieModel
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }

tipo: POST
url: /user/requestMovie
headers:
    {
        Authorization: `Bearer ${token}`
    }
parametros: (JSON)
    {
        id: string (URL),
        name: string,
        idUser: string,
    }
resultado:
    {
        status: number
        token: string
        movie: movieModel
    }
error:
    {
        status: number
        error: string
        errorDetail: string
    }