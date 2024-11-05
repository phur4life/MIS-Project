import { User } from "@/models/User";

export async function findOrCreateUser(email,userData={role:'user'}){

    //try to find the user in the database
    let user = await User.findOne({email});
    if(!user){
        user = new User({
            email,
            name:userData.name || "anonymous",
            role:userData.role || "user",
            authProvider:'google',
            ...userData
        });
        await user.save();
    }
    return user
}