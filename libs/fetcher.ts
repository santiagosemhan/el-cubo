const fetcher = (url) => fetch(`${process.env.API_URL}${url}`).then((r) => r.json());

export default fetcher;
