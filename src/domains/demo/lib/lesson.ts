import rawLesson from '../config/lesson.json';
import { demoLessonSchema } from '../model/contracts';

/** 체험 자료는 빌드에 포함된 JSON만 사용한다. */
export const demoLesson = demoLessonSchema.parse(rawLesson);
