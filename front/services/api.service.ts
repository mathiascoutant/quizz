export const constructUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
};

export const api = (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
) => {
  const storage = JSON.parse(localStorage.getItem('session-storage') || '{}');
  const token = storage.state.session.token;

  return fetch(constructUrl(url), {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
