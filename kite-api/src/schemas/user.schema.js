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

  input PreferencesConfigInput {
    theme: String
  }

  input UserInput {
    forceReset: Boolean,
    name: String,
    preferences: PreferencesConfigInput,
    scope: [String]
  }
`;

module.exports = { userType };