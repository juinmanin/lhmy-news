declare const Netlify: {
  env: {
    get: (name: string) => string | undefined;
  };
};

export function getEnv(name: string) {
  try {
    return Netlify.env.get(name);
  } catch {
    return undefined;
  }
}
