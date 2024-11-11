// import { NextRequest, NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnection";
// import { User } from "@/models/User";
// import { auth } from "@/auth";

// // Named export for the GET method
// export async function GET(req: NextRequest) {
//   await dbConnect();

//   // Authenticate user session
//   const session = await auth(); // Assuming auth does not take req as a parameter
//   console.log(session);

//   // Check for admin role
//   if (!session || session.user?.role !== "admin") {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
//   }

//   try {
//     // Fetch pending membership requests
//     const pendingRequests = await User.find({ membership_request_status: "pending" });
//     return NextResponse.json({ requests: pendingRequests }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching pending requests:", error);
//     return NextResponse.json(
//       { message: "Server error", error },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnection";
import { User } from "@/models/User";
import { auth } from "@/auth";

// Named export for the GET method
export async function GET(req: NextRequest) {
  await dbConnect();

  // Authenticate user session
  const session = await auth(); // Assuming auth does not take req as a parameter
  console.log(session);

  // Check for admin role
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    // Fetch pending and active membership requests
    const pendingRequests = await User.find({
      membership_request_status: "pending",
    });
    const activeRequests = await User.find({
      membership_request_status: "active",
    });

    return NextResponse.json(
      { pendingRequests, activeRequests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching membership requests:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
