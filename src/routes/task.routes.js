const router = require('express').Router();
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { requireRole } = require('../middleware/role');
const {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask,
  addComment,
} = require('../controllers/task.controller');
const {
  createTaskSchema,
  updateTaskSchema,
  commentSchema,
} = require('../validators/task.validator');

router.use(protect);

router
  .route('/')
  .get(listTasks)
  .post(
    requireRole('admin'),
    validate(createTaskSchema),
    createTask
  );

router
  .route('/:id')
  .get(getTask)
  .put(
    requireRole('admin'),
    validate(updateTaskSchema),
    updateTask
  )
  .delete(requireRole('admin'), deleteTask);

router.post('/:id/comments', validate(commentSchema), addComment);

module.exports = router;
