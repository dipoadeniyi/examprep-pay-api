// api/paystack-charge.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { email, amount, metadata } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ error: "Email and amount are required" });
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount,
      metadata,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}

