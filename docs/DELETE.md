## Delete User

---

Delete a user from the system

- **URL** - http://127.0.0.1/api/users
- **Method** : `DELETE`
- **Header Params**: `Authorization : Bearer xxxx`
- **URL Params**:

  **Required:**

  `id=[integer]`

- **Data Params**: None

- **Success Response:**

  - **Code:** 200 <br />

- **Error Response:**

  - **Code:** 403 FORBIDDEN <br />

  OR

  - **Code:** 401 UNAUTHORIZED <br />

  OR

  - **Code:** 404 NOT FOUND <br />
