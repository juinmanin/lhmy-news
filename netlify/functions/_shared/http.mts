export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  });
}

export async function readJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}
