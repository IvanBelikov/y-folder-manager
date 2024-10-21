import { ICachedResource } from '@/types/types'
import { makeAutoObservable, runInAction } from 'mobx'

import { resourceFullPath } from '@/utils'

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

    async deleteResource(folder: string, fileName: string) {
        runInAction(() => (this.loading = true))

        const path = resourceFullPath(folder, fileName)

        const response = await api.deleteResource(path)

        if (response?.status === 204) {
            runInAction(() => {
                const pathToChangeIndex = this.cachedResources.findIndex(
                    (resource) => resource.path === folder
                )

                this.cachedResources[pathToChangeIndex].items =
                    this.cachedResources[pathToChangeIndex].items.filter(
                        (item) => item.name !== fileName
                    )
            })
        }

        runInAction(() => (this.loading = false))
    }
}

export default new ResourcesStore()
