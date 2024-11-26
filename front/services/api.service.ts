export const constructUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
};

export const api = <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: T
) => {
  const storage = JSON.parse(localStorage.getItem("session-storage") || "{}");
  const token = storage.state.session.token;

  console.log("token api service", token);

  return fetch(constructUrl(url), {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};
