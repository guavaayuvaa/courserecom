import express from 'express';
import cors from 'cors';
import { saveUserCourse, getSavedCourses } from '../controllers/CourseController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();



router.post('/save', authenticateToken, async (req, res) => {
  const { course } = req.body;
  const result = await saveUserCourse(course, req.user.email);
  res.json(result);
});

router.get('/saved', authenticateToken, async (req, res) => {
  const result = await getSavedCourses(req.user.email);
  res.json(result);
});

export default router;

