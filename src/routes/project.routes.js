const router = require("express").Router();
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { requireRole } = require('../middleware/role');
const {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
  dashboardStats,
} = require("../controllers/project.controller");
const {
  createProjectSchema,
  updateProjectSchema,
} = require("../validators/project.validator");

router.use(protect);

router.get("/stats/dashboard", dashboardStats);

router
  .route("/")
  .get(listProjects)
  .post(requireRole("admin"), validate(createProjectSchema), createProject);

router
  .route('/:id')
  .get(getProject)
  .put(
    requireRole('admin'),
    validate(updateProjectSchema),
    updateProject
  )
  .delete(requireRole('admin'), deleteProject);

router.post(
  '/:id/members',
  requireRole('admin'),
  addMember
);

router.delete(
  '/:id/members/:userId',
  requireRole('admin'),
  removeMember
);

module.exports = router;
