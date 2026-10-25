// server/src/routes/projects.js
import express from 'express';
import { Project } from '../models/index.js';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message,
    });
  }
});

// GET single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: error.message,
    });
  }
});

// POST new project
router.post('/', async (req, res) => {
  try {
    const { title, subtitle, description, tags, demo, github, featured, theme, order } = req.body;
    if (!title || !description || !github) {
      return res.status(400).json({
        success: false,
        message: 'title, description, and github are required',
      });
    }

    const project = await Project.create({
      title,
      subtitle,
      description,
      tags: tags || [],
      demo: demo || '#',
      github,
      featured: Boolean(featured),
      theme: theme || {},
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message,
    });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    await project.update(req.body);
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message,
    });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    await project.destroy();
    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message,
    });
  }
});

export default router;
