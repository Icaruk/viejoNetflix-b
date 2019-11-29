
#

#### Table of Contents  

- [How to run 🚀](#How-to-run-🚀)  
- [Backend 🔙](#Backend-🔙) 
	- [User endpoints](#USER)
	- [Movie endpoints](#MOVIE)
	- [Order endpoints](#ORDER)

- [Frontend 👁‍🗨](#Frontend-👁‍🗨)  

#



<br>

# ¿Qué es? 🌌

Es una aplicación web que emula el antiguo Netflix hecha en 🕒**80 horas** que usa:

- Frontend: 🧧 Angular 8 
- Backend: 🔸 NodeJS + Express
- DB: 🍃 mongoDB 

Durante el desarrollo he usado [este tablón de Trello](https://trello.com/b/XluaxT2E/viejonetflix).


<br>

# How to run 🚀

- Download [backend repo](https://github.com/Icaruk/viejoNetflix-b).
- Download [frontend repo](https://github.com/Icaruk/viejoNetflix-f).
- On the backend run:
	- `npm run dev`
- On the frontend run:
	- `npm start`
- It should open on http://localhost:4200/


<br>

# Backend 🔙

## **Endpoints** 📃

- The endpoints that have a "limit" option are limited to 10, unless you provide a valid token, in which case are limited to 500.


## USER

- Register
	- **POST** /user/register
```json
{
	"username":  "Username",
	"email": "asd@asd.com",
	"password":  "1234",
	"phone": "647123456",
	"address": "c/ Falsa, 123",
	"billing": {
		"cardNumber": 123456789,
		"cardOwner": "Name Name Name",
		"cardExpireDate": [6, 22]
	}
}
```

- Login
	- **POST** /user/login
```json
{
	"username":  "Icaruk",
	"password":  "1234"
}
```

- Logout
	- **GET** user/logout?token={token}
	
- Get user data
	- **GET** user/{userId}?token={token}

- Delete user
	- **DELETE** user/delete/{userId}?token={token}

#
## MOVIE

- Get popular movies
	- **GET** movie/popular?limit=10
	- **GET** movie/popular?limit=500&token={token}

- Get newest movies
	- **GET** movie/newest?limit=10
	- **GET** movie/newest?limit=500&token={token}

- Get oldest movies
	- **GET** movie/oldest?limit=10
	- **GET** movie/oldest?limit=500&token={token}

- Search by title
	- **GET** movie/search?limit=10&title=harry
	- **GET** movie/search?limit=500&title=harry&token={token}

- Search by id
	- **GET** movie/search?id=337154&token={token}

- Search by genreId
	- **GET** movie/search?limit=10&genre=12
	- **GET** movie/search?limit=500&genre=12&token={token}

- Get ALL films *(be careful, there are 10.000)*
	- **GET** movie/all?limit=10&token={token}


#
## ORDER

- New order
	- **POST** order/add?token={token}
```json
{
	"movieId": 458899,
	"userId": "35sdf63j6",
	"city": "Valencia",
	"days": 3
}
```

- Get order info
	- **GET** order/5ddfee8d4c96ff459c115dd7?token={token}

- Get all orders from one client
	- **GET** order/client/{userId}?token={token}

- Change order status (from 0 to 2)
	- **GET** order/setStatus/{userId}?status=1&token={token}

- Delete an order
	- **DELETE** order/delete/{userId}?token={token}



<br>

# Frontend 👁‍🗨

## Features 📃

- Homepage with most popular movies + random genre movies.
- Search by title.
- Users.
- Orders.


## Preview 🔍

- Home
> ![](https://i.gyazo.com/519f71b33bde9428c3fabd660d43aa1c.jpg)

- Genre dropdown
> ![](https://i.gyazo.com/06881dae3f950212a6318909bc65783f.png)

- Register
> ![](https://i.gyazo.com/86c7b8519bd18b50c92f71d1f41cef5b.png)

- Login
> ![](https://i.gyazo.com/d3ee62fe15b5bdee3a459cf675309432.png)

- Profile
> ![](https://i.gyazo.com/e8a56ea1f3ba321440d664e06ed93b7f.png)

- Search
> ![](https://i.gyazo.com/db65979413b9a0837926c0dde9fbde75.jpg)
> https://i.gyazo.com/d2f07a6195ed7a330b824a178a2cf3bf.mp4

- Detail
> ![](https://i.gyazo.com/184c987c56213ccde2be076c4dfe8fbd.jpg)
> https://i.gyazo.com/9b946615597c14a649596f5d9a8916a4.mp4

- New order
> ![](https://i.gyazo.com/62ccc27171926e9c00e34c8be21ea3d4.png)

- User orders
> ![](https://i.gyazo.com/82ed673e41059de6358875b8be871d43.png)
> https://i.gyazo.com/c55e560de90655d3e907a99a141bf915.mp4



<br>

# [🡅 TOP 🡅](#Table-of-Contents)  