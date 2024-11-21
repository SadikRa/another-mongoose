import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
import studentValidationSchema from './student.validation.z';

const createStudent = async (req: Request, res: Response) => {
  try {
  
    //create a schema validation using zod 

    // console.log('Incoming data:', req.body);
    const { student: studentData } = req.body;
      //creating a schema validation using joi
    //data validation using joi
  //  const {error , value}  = studentValidationSchema.validate(studentData)
   const zodparsedData  = studentValidationSchema.parse(studentData)

  //  console.log(value );
  //  console.log(error);

  //  if(error){
  //   res.status(500).json({
  //     success: false,
  //     message: 'something went wrong',
  //     error,
  //   });
  //  }


    const result = await StudentServices.createStudentIntoDB(zodparsedData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
