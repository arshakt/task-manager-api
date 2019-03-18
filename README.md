## Env variables

|name       |required   |
|-----------|-----------|
| DB_NAME   |true       |
| DB_USER   |true       |
| DB_PASS   |true       |



## Endpoints

### POST ./users

|field      |in       |required   |
|-----------|---------|-----------|
| firstName | body    | true      |
| lastName  | body    | true      |
| email     | body    | true      |
| password  | body    | true      |


### POST ./login

|field      |in       |required   |
|-----------|---------|-----------|
| email     | body    | true      |
| password  | body    | true      |


### POST ./tasks

|field         |in       |required   |
|--------------|---------|-----------|
| name         | body    | true      |
| description  | body    | false     |
| status       | body    | false     |
| parentId     | body    | false     |


### GET ./tasks

|field         |in       |required   |
|--------------|---------|-----------|
| name         | body    | true      |

### GET ./tasks/:id

|field         |in       |required   |
|--------------|---------|-----------|
| id           | params  | true      |

### PATCH ./tasks/:id

|field         |in       |required   |
|--------------|---------|-----------|
| id           | params  | true      |
| name         | body    | false     |
| description  | body    | false     |
| status       | body    | false     |
| parentId     | body    | false     |

### DELET ./tasks/:id

|field         |in       |required   |
|--------------|---------|-----------|
| id           | params  | true      |
