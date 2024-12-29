class User {
  constructor({ email, username, password, role }) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role || 'user';
    this.createdAt = new Date();
  }
}

module.exports = User;