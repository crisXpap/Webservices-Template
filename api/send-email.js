import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { plan, fullName, phoneNumber, email, storeName } = req.body;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'christosmariospappas@gmail.com',
      subject: 'New Order Received',
      html: `
        <h2>New Order Details</h2>
        <p><strong>Plan Selected:</strong> ${plan}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Store/Company Name:</strong> ${storeName}</p>
      `
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
