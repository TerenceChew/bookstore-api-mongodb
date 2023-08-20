# Bookstore API

A bookstore API built to practice MongoDB.  
You can perform CRUD operations to interact with the endpoints below.

### CREATE

- Method: POST
- https://bookstore-api-rpeg.onrender.com/books

### READ

- Method: GET
- https://bookstore-api-rpeg.onrender.com/books/?page=0 (Each page returns 3 docs)
- https://bookstore-api-rpeg.onrender.com/books/bookId (To get 1 doc)

### UPDATE

- Method: PATCH
- https://bookstore-api-rpeg.onrender.com/books/bookId

### DELETE

- Method: DELETE
- https://bookstore-api-rpeg.onrender.com/books/bookId

## Sample result

```
{
    "_id": "64ddb58033a3a28945ee65c2",
    "title": "The Great Gatsby",
    "pages": 550,
    "author": "F. Scott Fitzgerald",
    "genres": [
        "fiction",
        "novel",
        "tragedy"
    ],
    "rating": 9
}
```
