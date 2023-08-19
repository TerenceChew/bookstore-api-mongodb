# Bookstore API

A bookstore API built to practice MongoDB.  
You can perform CRUD operations to interact with the endpoints below.

### CREATE

- Method: POST
- http://localhost:3000/books

### READ

- Method: GET
- http://localhost:3000/books/?page=0 (Each page returns 3 docs)
- http://localhost:3000/books/bookId (To get 1 doc)

### UPDATE

- Method: PATCH
- http://localhost:3000/books/bookId

### DELETE

- Method: DELETE
- http://localhost:3000/books/bookId

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
