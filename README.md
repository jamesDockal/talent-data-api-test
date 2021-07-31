## Getting Started

### `npm install`

To install the project dependencies run </br>

### `npm run start:dev`

It gonna start the server in the localhost on port 3000 by default

> ## Routes
>
> > POST `users/login`
> > login the user and getting in the response the token
> > Body
> >
> > ```
> > {
> >   "email": "user_email",
> >   "password": "user_password"
> > }
> > ```
> >
> > Response:
> >
> > ```json
> > {
> >   "token": "eyJhbGciOiJIUzI1NiJ9.MzUwMTE5YzItMzFkYy00YTUzLWExNjYtYTk2YWQ1NWEzOGFj.W_TBtC5gRY6hssrK6JGHRKr3ETzFXQDctXVZVPOuPjY"
> > }
> > ```
>
> > GET `products/
