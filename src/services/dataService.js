import api from "../http/index"

export const getData = async (id) => {
    const response = await api.get("/userData", { id })
    return response
}
