export interface Lesson {
  id: string,
  startTime: Date,
  endTime: Date,
  instructorId: string,
  traineeId: string,
  carId?: string
}

export interface CreateLesson {
  startTime: Date,
  endTime: Date,
  instructorId: string,
  traineeId: string,
  carId?: string
}