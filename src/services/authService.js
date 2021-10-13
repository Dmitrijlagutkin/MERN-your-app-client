import axios from "axios"
import api from "../http/index"

export const login = async (email, password) => {
    const response = await api.post("/login", {
        email,
        password,
    })
    console.log(response)
    return response
}

export const registration = async (email, password) => {
    const response = await api.post("/registration", { email, password })
    return response
}

export const logout = async (refreshToken) => {
    const response = await api.post("/logout", {refreshToken})
    return response
}
