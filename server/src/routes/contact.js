// server/src/routes/contact.js
import express from 'express';
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

export default router;
