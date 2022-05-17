# JWT-User-Authentication-Authorization

> This is not for distribution purposes you are not allowed to use this on a production environment without my (the owner of this repository) permission.

**After cloning the project on your own personal machine**
Start off by installing all required dependancies in the `Package.json` By Running the following command:

```
npm i
```

**_OPTIONAL_** You will find a postman **`jwt-user-authentication-authorization.postman-collection.json`** file in the cloned project , feel free to import in into your postman client to use the endpoints at ease.

**_Now_** you need to create a **`.env `** file on your root directory which follows the given **`.env.example`** file that was provided when cloning the project.

**For Development purposes**
We've gone ahead and filled out the **`.env.example`** File with valid data that can be used for Development / Testing our API. \*\*Don't Forget to never expose your production`.env` file.\*\*

**Now that everything is setup correctly, start the server in development mode by running:**

```
npm run dev
```

**OR You can run the tests by running this script in the terminal:**

```
npm test
```

This Will run your server on [localhost:3000](localhost:3000).

---

## Now That Everything is setup correctly, you can start using our API through the following routes:

### _1. User Authentication Routes:_

**\*All routes are prefixed with `/api/users`**.

| Route       | Method | Function        | require Authentication |
| ----------- | ------ | --------------- | ---------------------- |
| `/register` | POST   | Create new user | No                     |

**Parameters:**

```


username: minimum 6 characters (required)

email:(required)

password: minimum 6 characters (required)


```

---

| Route    | Method | Function            | require Authentication |
| -------- | ------ | ------------------- | ---------------------- |
| `/login` | POST   | login verified user | No                     |

**Parameters:**

> ( username or email must be provided )

```

username: minimum 6 characters

email:String

password: minimum 6 characters,(required)


```

---

| Route     | Method | Function                            | require Authentication |
| --------- | ------ | ----------------------------------- | ---------------------- |
| `/logout` | POST   | logout user and nullify their token | Yes                    |

**Parameters:**

```
No Parameters Needed.
```

---

| Route            | Method | Function                      | require Authentication |
| ---------------- | ------ | ----------------------------- | ---------------------- |
| `/user-by-token` | GET    | Get user details from the JWT | Yes                    |

**Parameters:**

```
No Parameters Needed.
```

---

| Route     | Method | Function             | require Authentication |
| --------- | ------ | -------------------- | ---------------------- |
| `/update` | PUT    | Updated User Details | Yes                    |

**Parameters:**

```

username: minimum 6 characters

email

oldPassword: the old password to be changed

newPassword:new password to be set ( minimum 6 characters)


```

---

| Route     | Method | Function    | require Authentication |
| --------- | ------ | ----------- | ---------------------- |
| `/delete` | DELETE | Remove User | Yes                    |

**Parameters:**

```

email (required)

```

---

| Route           | Method | Function                   | require Authentication      |
| --------------- | ------ | -------------------------- | --------------------------- |
| `/create-admin` | PUT    | Updated User Role to admin | Yes (With Admin Privileges) |

**Parameters:**

```

email (required)

```

---

> **_NOTE:_** This is for development purposes only and is to be removed on production .

| Route                 | Method | Function                   | require Authentication |
| --------------------- | ------ | -------------------------- | ---------------------- |
| `/create-super-admin` | PUT    | Updated User Role to admin | Yes                    |

> **_NOTE:_** If the account that's being made into an admin is the same account that's being used to make the admin you need to login again to re sign the JWT with the admin Role.

**Parameters:**

```

email (required)

```

---

| Route                                    | Method | Function                  | require Authentication |
| ---------------------------------------- | ------ | ------------------------- | ---------------------- |
| `/verify/resendVerificationEmail/:email` | POST   | Resend verification Email | No                     |

**Parameters:**

```

email (required)

```

---

| Route                                      | Method | Function                                                                  | Params | require Authentication |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------- | ------ | ---------------------- |
| `/verify/:userId/:hashedVerificationToken` | GET    | Verify Email (from the email sent to the user with the verification link) | No     |

**Parameters:**

> These are provided automatically on the verification E-mail that is sent to the user upon registering

```


userId: string

hashedVerificationToken: string


```
