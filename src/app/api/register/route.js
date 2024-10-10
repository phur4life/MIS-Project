import { NextResponse } from "next/server";
import { createUser } from "../../queries/users";
import bcrypt from "bcryptjs/dist/bcrypt";
// import {dbConnect} from '@/lib/dbConnection'
export const POST = async (request) => {
  const { name, email, password } = await request.json();
  console.log(name,email,password);

  //create a DB Connection
  // await dbConnect()
  //Encrypt the password
  const hashedPassword = await bcrypt.hash(password,5)
  //Form a DB Payload
  const newUser = {
    name,
    password: hashedPassword,
    email
  }

  try {
    await createUser(newUser)
  } catch (error) {
    console.error(error);
    return new NextResponse(error,{
      status: 500
      
    });

    
  }
  //Update the DB

  return new NextResponse("User has been created",{
    status: 201
  });
};
