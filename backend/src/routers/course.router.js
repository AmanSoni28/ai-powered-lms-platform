import { Router } from "express";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLectures, getCreatorCourses, getCreatorById, getPublishedCourses, removeCourse, removeLecture } from "../controllers/course.controller.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.middleware.js";
import { searchWithAi } from "../controllers/search.controller.js";

const courseRouter = Router()

// for courses
courseRouter.post('/create-course', isAuth, createCourse)
courseRouter.get('/published-courses', getPublishedCourses)
courseRouter.get('/creator-courses', isAuth, getCreatorCourses)
courseRouter.patch('/edit-course/:courseId', isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get('/course/:courseId', isAuth, getCourseById)
courseRouter.delete('/remove-course/:courseId', isAuth, removeCourse)


// for lectures
courseRouter.post('/cteare-lecture/:courseId', isAuth,  createLecture)
courseRouter.get('/course-lecture/:courseId', isAuth, getCourseLectures)
courseRouter.patch('/edit-lecture/:lectureId', isAuth, upload.single("videoUrl"), editLecture)
courseRouter.delete('/remove-lecture/:lectureId', isAuth,  removeLecture)
courseRouter.post('/creator', isAuth,  getCreatorById)

//search
courseRouter.post('/search', searchWithAi)

export default courseRouter
                                                      