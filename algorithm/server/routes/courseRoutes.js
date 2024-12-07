import express from 'express';
import cors from 'cors';
import { saveTopCourses} from '../controllers/CourseController.js';

const router = express.Router();

router.use(cors());

router.post('/save', async (req, res) => {
    console.log("object")
  const { courses } = req.body;
  const result = await saveTopCourses(courses);
  res.json(result);
});

export default router;

