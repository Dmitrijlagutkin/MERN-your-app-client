import api from "../http/index"

export const addList = async (listTitle, date, category, listItem, isFavorites) => {
    const response = await api.post("/list", {
        listTitle,
        date,
        category,
        listItem,
        isFavorites
    })
    return response
}

export const update = async (listTitle, date, category, listItem, isFavorites, id) => {
    const response = await api.put(`/list/${id}`, {
        listTitle,
        date,
        category,
        listItem,
        isFavorites
    })
    return response
}

export const remove = async (id) => {
    const response = await api.delete(`/list/${id}`)
    return response
}