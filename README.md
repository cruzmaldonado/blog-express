# Blog API

- Front:
    - Obtener todas todas las publicaciones
    - Obtener 1 publicaión es especifico
    - Obtener todos los posts de una categoría
    - Obtener todos los posts que he creado
    - Obtener todos los posts de un usuario especifico
    - Podemos páginar los posts
    - Acciones de CRUD sobre posts
    - Crear Categorías

   <!--! se vera nustra respuesta -->
    ``` json
    {
        
    <!--? total de publciaciones -->
    "total":68, 
    <!--? esto para paginacion -->
    "prev":"localhost:9000/api/v1/posts?start=51&limit=60",
    "next":"localhost:9000/api/v1/posts?start=61&limit=68",
    "data":[
        {
            "id" :"941300c5-b3ef-41c4-bbdd-0f1c68b81f15",
            "title" :"ejemplo",
            "content":"lorem ipsum",
            "createBy":{
                <!--? id usuario -->
                "id":"4d8f4592-2847-46e8-8735-50d16c702f56", 
                "name":"sahid",
                "email":"sahid@gmail.com"
            },
            "category" :{
                    "id": 4,
                    "name" :"Tecnology"
            }
        }

    ]
    }

    ``` 

    /api/v1

    /users
        -/me
            -/me/posts
            -/me/posts/:id
        -/:id

    /categories
        -/:id
        -/:id/posts

    /posts
        -/:id
        