const userType = `
  type PreferencesConfig {
    theme: String
  }

  type User {
    _id: String,
    userid: String,
    forceReset: Boolean,
    logins: Int,
    name: String,
    containers: [String],
    preferences: PreferencesConfig,
    scope: [String]
  }
`;

module.exports = { userType };