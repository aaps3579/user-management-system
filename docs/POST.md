
## Generate Json Web Token
---

Generate Admin Login Token

- **URL** - http://127.0.0.1/token
- **Method** : `POST`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `xxxxxxxx`

---

## Add User

Add user to the system

- **URL** - http://127.0.0.1/api/users
- **Method** : `POST`
- **Header Params**: `Authorization : Bearer xxxx`
- **URL Params**: None
- **Data Params**:

  **Required:**

  `fullname=[string]`

  `email=[string]`

  `password=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12, fullname : "Amanpreet Singh", email : "amanpreet.3579@gmail.com", "password": "$2b$10$AidBEef8GIGE8yQSw8L3xOJx.vlZy8MYVohaviKkPtie2eLGtY63S", "updatedAt": "2021-10-24T07:54:05.510Z","createdAt":"2021-10-24T07:54:05.510Z" }`

- **Error Response:**

  - **Code:** 403 FORBIDDEN <br />

  OR

  - **Code:** 401 UNAUTHORIZED <br />

  OR

  - **Code:** 400 BAD REQUEST <br />
