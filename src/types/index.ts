export type TUser = {
  id: number
  name: string
  major: string | null
  gradYear: string | null
  gender: string | null
  dateOfBirth: string | null
  email: string | null
  mobileNumber: string | null
  imageUrl: string | null
  insta: string | null
  tiktok: string | null
  linkedin: string | null
  bio: string | null
  interest: string | null
  downFor: string | null
  address: string | null
  city: string | null
  country: string | null
  data: string | null
  role: string | null
  isDeleted: boolean
  isActive: boolean
  isVerified: boolean
  createdBy: string | null
  updatedBy: number
  createdAt: string | null
  updatedAt: string | null
}

export type TGetUserByIdResult = {
  data: {
    data: TUser
    success: boolean
  } | null
  error: any
}
