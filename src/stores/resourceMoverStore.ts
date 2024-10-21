import { makeAutoObservable } from 'mobx'

import api from '@/api'

class ResourceMoverStore {
    protected _from = ''
    protected _currentPath = ''
    protected _resourceName = ''

    isOpened = false

    constructor() {
        makeAutoObservable(this)
    }

    get from() {
        return decodeURI(this._from)
    }

    set from(value) {
        this._from = value
    }

    get currentPath() {
        return decodeURI(this._currentPath)
    }

    set currentPath(value) {
        this._currentPath = value
    }

    get resourceName() {
        return decodeURI(this._resourceName)
    }

    set resourceName(value) {
        this._resourceName = value
    }

    open(currentPath: string) {
        this.isOpened = true
        this._currentPath = currentPath
    }

    close() {
        this.isOpened = false
        this._currentPath = ''
        this._from = ''
    }

    async moveResource(from: string, path: string) {
        const response = await api.moveResource(from, path)

        return response
    }
}

export default new ResourceMoverStore()
