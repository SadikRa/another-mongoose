import Joi from 'joi';

const userNameSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .required()
      .regex(/^[A-Z][a-z]*$/)
      .messages({
        'string.pattern.base': 'First Name must be capitalized correctly.',
        'string.max': 'First Name cannot exceed 20 characters.',
        'any.required': 'First Name is required.',
      }),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
      .required()
      .regex(/^[A-Za-z]+$/)
      .messages({
        'string.pattern.base':
          'Last Name must only contain alphabetic characters.',
        'any.required': 'Last Name is required.',
      }),
  });

  // Guardian Joi schema
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().max(20).required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });

  // Local Guardian Joi schema
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });

  // Student Joi schema
  const studentValidationSchema = Joi.object({
    id: Joi.string().optional(),
    name: userNameSchema.required(),
    gender: Joi.string().valid('male', 'female').required().messages({
      'any.only': 'The gender should be either male or female.',
      'any.required': 'Gender is required.',
    }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address.',
      'any.required': 'Email is required.',
    }),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional(),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().uri().optional(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });

  export default studentValidationSchema;