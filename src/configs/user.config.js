const USER_ROLES = {
  ADMIN: 0,
  MANAGER: 1,
  STAFF: 2,
  SUPPLIER: 3,
};

const FILTER_USER = {
  NORMAL_USER: {
    isDeleted: false,
    isVerified: true,
    isActive: true
  },
  DELETED_USER: {
    isDeleted: true
  },
  INACTIVE_USER: {
    isActive: false
  },
  UNVERIFIED_USER: {
    isVerified: false
  }
}

const SELECT_USER = {
  DEFAULT: "fullName email role",
  FULL: "fullName email role isVerified isActive isDeleted"
}

module.exports = { USER_ROLES, FILTER_USER, SELECT_USER };
