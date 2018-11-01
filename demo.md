# Create a User

```gql
mutation {
  createUser(input: { email: "foo@bar.de", name: "foo" }) {
    id
  }
}
```

# Listen on `userAdded` Events in realtime

After you executed the query in the playground you have to open another tab to create users.

```gql
subscription {
  userAdded {
    id
  }
}
```

# Receive a single User by Email

```gql
{
  getUserByEmail(email: "foo@bar.de") {
    name
  }
}
```

# Receive a single User by Id

```gql
{
  getUserById(id: 1) {
    name
  }
}
```
