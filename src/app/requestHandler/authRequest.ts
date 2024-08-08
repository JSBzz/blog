export default async function SignUpRequest(requestParam: { a: 1 }) {
  const response = await fetch("/api/sign-up", {
    method: "post",
    body: JSON.stringify({ requestParam }),
  });
  return response;
}
