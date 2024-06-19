import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await fetch(`${process.env.OKTA_DOMAIN}/api/v1/users?activate=true`, {
        method: 'POST',
        headers: {
          'Authorization': `SSWS ${process.env.OKTA_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          profile: {
            email,
            login: email,
          },
          credentials: {
            password: { value: password },
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json({ message: 'User created successfully!' });
      } else {
        res.status(response.status).json({ message: data.errorSummary });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
