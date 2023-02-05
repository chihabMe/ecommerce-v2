import dotenv from "dotenv"
dotenv.config()

export const PORT = process.env.PORT ?? 3001
export const MODE = process.env.MODE??"DEVELOPMENT"
export const DOMAIN = process.env.DOMAIN??""

export const isProduction=()=>  MODE==="PRODUCTION"
export const getAccessSecret=()=>{
    const accessSecret = process.env.ACCESS_SECRET
    if(!accessSecret)throw new Error("provide a ACCESS_SECRET")
    return accessSecret
}
export const getRefreshSecret=()=>{
    const refreshSecret = process.env.REFRESH_SECRET
    if(!refreshSecret)throw new Error("provide a REFRESH_SECRET")
    return refreshSecret
}