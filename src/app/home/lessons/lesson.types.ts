export interface Lesson {
  id: string,
  startTime: string,
  endTime: string,
  instructorId: string,
  traineeId: string,
  carId?: string,
}

export interface CreateLesson {
  startTime: string,
  endTime: string,
  instructorId: string,
  traineeId: string,
  carId?: string | null
}

export interface LessonEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'lesson' | 'exam' | 'meeting';
  // Original IDs for editing/deleting
  instructorId?: string;
  traineeId?: string;
  carId?: string;
}