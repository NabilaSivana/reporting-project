// src/models/UserData.js
import PropTypes from "prop-types";

export const UserData = {
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
};
