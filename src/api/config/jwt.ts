import jwt from "jsonwebtoken"

export const generateToken = (user:any) =>{
    return jwt.sign(
        {id: user._id, provider: user.provider, name: user.name},
        "GovindKashyap",
        {expiresIn: "10d"}
    )
}

export const verifyToken = (token:string) =>{
    return jwt.verify(token, "GovindKashyap")
}



