import { api } from './api'
import { deleteResourceEndpoint } from './endpoints'

const deleteResource = async (path: string) => {
    const endpoint = deleteResourceEndpoint()

    path = decodeURI(path)

    try {
        const response = await api.delete(endpoint, {
            params: {
                path,
                permanently: true,
            },
        })

        return response
    } catch (e) {
        console.error(e)
    }
}

export default deleteResource
