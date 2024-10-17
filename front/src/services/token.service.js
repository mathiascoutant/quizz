const handleLogout = () => {
  localStorage.removeItem('token');
};

const handleGetToken = () => {
  return localStorage.getItem('token');
};

const TokenService = {
  handleGetToken,
  handleLogout,
};

export default TokenService;
