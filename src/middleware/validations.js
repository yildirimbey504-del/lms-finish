import { BadRequestError } from "../utils/error.js";
import schema from "../utils/validation.js";

const validate = (rule) => (req, res, next) => {
    const { error } = rule.validate(req.body);
    if (error) return next(new BadRequestError(400, error.message));
    return next();
};

export default {
    createUsers: validate(schema.usersSchema),
    createCourse: validate(schema.coursesSchema),
    login: validate(schema.loginSchema),
    register: validate(schema.registerSchema),
    createRole: validate(schema.roleSchema),
    createCategory: validate(schema.categorySchema),
    createSection: validate(schema.sectionSchema),
    createLesson: validate(schema.lessonSchema),
    createMaterial: validate(schema.materialSchema),
    createHomework: validate(schema.homeworkSchema),
    createExam: validate(schema.examSchema),
};
