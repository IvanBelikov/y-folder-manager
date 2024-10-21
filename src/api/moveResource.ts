import { api } from './api'
import { moveResourceEndpoint } from './endpoints'

interface MoveResourceResponse {
    href: string
}

const moveResource = async (from: string, path: string) => {
    const endpoint = moveResourceEndpoint()

    from = decodeURI(from)
    path = decodeURI(path)

    const response = await api.post<MoveResourceResponse>(endpoint, null, {
        params: {
            from,
            path,
            overwrite: true,
        },
    })

    return response
}

export default moveResource
