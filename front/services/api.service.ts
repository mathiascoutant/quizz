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

<<<<<<< HEAD
=======
  console.log("token api service", token);

>>>>>>> 784c757 ([ADD] : ranking page)
  return fetch(constructUrl(url), {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};
