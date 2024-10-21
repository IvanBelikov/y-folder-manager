import { ICachedResource } from '@/types/types'
import { makeAutoObservable, runInAction } from 'mobx'

import api from '@/api'

class ResourcesStore {
    cachedResources: ICachedResource[] = []
    loading = true

    constructor() {
        makeAutoObservable(this)
    }

    async fetchResources(path: string) {
        path = path || '/'
        runInAction(() => (this.loading = true))

        const data = await api.getResources(path)

        if (data) {
            runInAction(() => {
                const newPath: ICachedResource = {
                    path: path,
                    items: data._embedded.items,
                }
                this.cachedResources = [newPath, ...this.cachedResources]
            })
        }

        runInAction(() => (this.loading = false))
    }

    async deleteResource(path: string, currentFolder: string = '/') {
        runInAction(() => (this.loading = true))

        const response = await api.deleteResource(path)

        if (response?.status === 204) {
            runInAction(() => {
                const pathToChangeIndex = this.cachedResources.findIndex(
                    (resource) => resource.path === currentFolder
                )

                this.cachedResources[pathToChangeIndex].items =
                    this.cachedResources[pathToChangeIndex].items.filter(
                        (item) => item.path.slice(6) !== path
                    )
            })
        }

        runInAction(() => (this.loading = false))
    }
}

export default new ResourcesStore()
