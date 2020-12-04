const fetcher = (url) =>
  fetch(`${process.env.API_URL}${url}`, { mode: 'no-cors' }).then((r) => r.json());

export default fetcher;
