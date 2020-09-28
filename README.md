# Authentication app
This is an authentication app where we can Register, Login and Log out.

---
## Authentication
- [X] Create Server
- [X] Add auth router
- [ ] Create user with POST /auth/signup
  - [x] validate required fields
  - [x] check if email is unique
  - [x] hash password with bcrypt
  - [x] insert into db
- [ ] Login user with POST /auth.login
  - [ ] check if email in db
    - [ ] compare password with nashed password in db
    - [ ] created and sign a JWT
      - [ ] Respond with JWT
- [ ] Create login form; show errors; redirected;
  - [ ] validate required fields
- [ ] Create sign up form; show error; redirect;
  - [ ] validate required fields

---
## Authorization
- [ ] Visitors can only see the homepage
  - [ ] isLoggedIn middleware
    - [ ] Validate JWT in header
      - [ ] set req.user to be JWT payload
    - [ ] send an unauthorized error message
  - [ ] redirect to login form
- [ ] Logged in users can only see their page
  - [ ] allowAcess middleware
    - [ ] id in url must match id in req.user
    - [ ] send an unauthorized error message
  - [ ] redirect to user page if they visit homepage
    - [ ] set user_id in localStorage after login/signup
- [ ] Add GET /auth/logout to clear user_id cookie

