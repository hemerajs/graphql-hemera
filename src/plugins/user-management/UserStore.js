export class UserStore {
  constructor() {
    this._id = 0
    this.users = [{ id: 1, name: 'peter', email: 'peter@gmail.com' }]
  }
  get getID() {
    return ++this._id
  }
  getUserByEmail(email) {
    const result = this.users.filter(x => x.email === email)
    return result.length ? result[0] : null
  }
  getUserById(id) {
    const result = this.users.filter(x => x.id === id)
    return result.length ? result[0] : null
  }
  createUser(user) {
    user.id = this.getID
    this.users.push(user)
    return user
  }
}
