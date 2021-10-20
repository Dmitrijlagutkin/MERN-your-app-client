import api from "../http/index"

export const login = async (email, password) => {
    const response = await api.post("/login", {
        email,
        password,
    })
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
