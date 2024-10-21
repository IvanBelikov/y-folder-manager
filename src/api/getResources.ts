import { api } from './api'

import { IResources } from '../types/types'

import { getResourcesEndpoint } from './endpoints'

const getResources = async (path = '/') => {
    const endpoint = getResourcesEndpoint()

    path = decodeURI(path)

    try {
        const response = await api.get<IResources>(endpoint, {
            params: {
                path,
            },
        })

        return response.data
    } catch (e) {
        console.error(e)
    }
}

export default getResources
