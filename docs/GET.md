## Show Users

---

Return json data about all users.

- **URL** - http://127.0.0.1/api/users
- **Method** : `GET`
- **Header Params**: `Authorization : Bearer xxxx`
- **URL Params**: None
- **Data Params**: None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[{ id : 12, fullname : "Amanpreet Singh", email : "amanpreet.3579@gmail.com" },...more]`

- **Error Response:**

  - **Code:** 403 FORBIDDEN <br />

  OR

  - **Code:** 401 UNAUTHORIZED <br />

---

Return json data about single user.

- **URL** - http://127.0.0.1/api/users
- **Method** : `GET`
- **Header Params**: `Authorization : Bearer xxxx`
- **URL Params**:

  **Required:**

  `id=[integer]`

- **Data Params**: None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12, fullname : "Amanpreet Singh", email : "amanpreet.3579@gmail.com", "password": "$2b$10$AidBEef8GIGE8yQSw8L3xOJx.vlZy8MYVohaviKkPtie2eLGtY63S", "updatedAt": "2021-10-24T07:54:05.510Z","createdAt":"2021-10-24T07:54:05.510Z" }`

- **Error Response:**

  - **Code:** 403 FORBIDDEN <br />

  OR

  - **Code:** 401 UNAUTHORIZED <br />

  OR

  - **Code:** 404 NOT FOUND <br />
