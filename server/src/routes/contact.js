// server/src/routes/contact.js
import express from 'express';
import nodemailer from 'nodemailer';
import { Message } from '../models/index.js';

const router = express.Router();

// POST a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! It has been received.',
      data: {
        id: newMessage.id,
        name: newMessage.name,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit message. Please try again later.',
      error: error.message,
    });
  }
});

// GET all contact messages (Admin / viewing)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages',
      error: error.message,
    });
  }
});

// PATCH mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const msg = await Message.findByPk(req.params.id);
    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    await msg.update({ isRead: true });
    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST reply to a message & record in database
router.post('/:id/reply', async (req, res) => {
  try {
    const { replyText, subject } = req.body;
    const msg = await Message.findByPk(req.params.id);

    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    if (!replyText || !replyText.trim()) {
      return res.status(400).json({ success: false, message: 'Reply text cannot be empty' });
    }

    // 1. Update message in database
    await msg.update({
      isReplied: true,
      replyText: replyText.trim(),
      repliedAt: new Date(),
      isRead: true, // replying automatically marks as read
    });

    let emailSent = false;
    let emailStatus = 'Recorded in database';

    // 2. If SMTP credentials exist in .env, send real email via Nodemailer
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Mintu Kumari" <${process.env.SMTP_USER}>`,
          to: msg.email,
          subject: subject || `Re: Your message regarding Mintu's Portfolio`,
          text: replyText,
          html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; padding: 20px; border: 1px solid #e0e7ff; border-radius: 12px;">
            <p>Hi <strong>${msg.name}</strong>,</p>
            <p>${replyText.replace(/\n/g, '<br/>')}</p>
            <br/>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 13px; color: #666;">
              Warm regards,<br/>
              <strong>Mintu Kumari</strong><br/>
              Junior Software Developer<br/>
              <a href="mailto:mkmintukumari.0987@gmail.com" style="color: #4F46E5;">mkmintukumari.0987@gmail.com</a>
            </p>
          </div>`,
        });

        emailSent = true;
        emailStatus = 'Direct email sent successfully to ' + msg.email;
      } catch (mailErr) {
        console.error('Nodemailer error:', mailErr);
        emailStatus = 'Saved in database, but SMTP error: ' + mailErr.message;
      }
    }

    res.json({
      success: true,
      message: 'Reply sent and recorded in database!',
      emailSent,
      emailStatus,
      data: msg,
    });
  } catch (error) {
    console.error('Error replying to message:', error);
    res.status(500).json({ success: false, message: 'Failed to process reply', error: error.message });
  }
});

// DELETE contact message
router.delete('/:id', async (req, res) => {
  try {
    const msg = await Message.findByPk(req.params.id);
    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    await msg.destroy();
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
