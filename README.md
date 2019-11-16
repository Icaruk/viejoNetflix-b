
# Users

## **POST** /users/register
Register a user.
``` json
{
	"username":  "Icaruk",
	"email":  "asd@asd.com",
	"password":  "1234",
	"phone":  "600123456",
	"address":	"c/ ASD"
}
```

## **GET** /user/all?token={token}
Returns all users.


## **POST** /user/login
Login a user and returns a token.
``` json
{
	"username":  "Icaruk",
	"password":  "1234"
}
```

## **GET** /user/{user_id}?token={token}
Returns the user data.

## **GET** /user/logout?token={token}
Returns the user data.

## **DELETE** /user/delete/{user_id}?token={token}
Delete a user.



# Movies

## **GET** /movie/search?{title}?token={token}
## **GET** /movie/search?{id}?token={token}
## **GET** /movie/search?{genre}?token={token}
## **GET** /movie/popular/{result_limit}?token={token}
## **GET** /movie/newest/{result_limit}?token={token}
## **GET** /movie/oldest/{result_limit}?token={token}

## **POST** /movie/add?token={token}

``` json
{
	"id": 1,
	"title": "Titulo", 
	"original_title": "Titulo original",
	"release_date": "2019-11-13",
	"runtime": 60,
	"overview": "resumen",
	"poster_path": "link poster",
	"backdrop_path": "link back",
	"video": false,
	"genre_ids": [1, 2, 3],
	"adult": false,
	"original_language": "ES",
	"popularity": 40,
	"vote_count": 50,
	"vote_average": 60
}
```

## **DELETE** /movie/delete/{movie_id}?token={token}



# Orders


## **POST** /order/add?token={token}
``` json
{
	"movieId": 458897,
	"clientId": "5dcd7652394fde1938a80f02",
	"startDate": [2019, 11, 15, 14, 24],
	"endDate": [2019, 11, 16, 14, 24],
	"city": "Valencia"
}
```


## **GET** /order/{order_id}?token={token}
## **GET** /order/setStatus/{order_id}=status={status_id}&token={token}
## **DELETE** /order/delete/{order_id}?token={token}
