export interface Car {
  id?: string
  make: string
  model: string
  registrationNumber: string
}

export interface CreateCar {
  make: string
  model: string
  registrationNumber: string
}