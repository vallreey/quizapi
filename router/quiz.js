const quizController = require("../controllers/quiz");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/authJwt");

router.post("/", quizController.create);
router.get("/", [verifyToken], quizController.getAll);
router.get("/:id", quizController.findOne);
router.put("/:id", quizController.update);
router.delete("/:id", quizController.delete);
router.get("/category/:id", quizController.getByCategoryId);
router.get("/level/:id", quizController.getByLevelId);

module.exports = router;