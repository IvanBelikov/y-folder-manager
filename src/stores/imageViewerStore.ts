import { makeAutoObservable } from 'mobx'

class ImageViewerStore {
    isOpened = false
    isLoading = true
    contentPath: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    closeImageViewer() {
        this.isLoading = true
        this.isOpened = false
        this.contentPath = ''
    }

    openImageViewer() {
        this.isOpened = true
    }

    setContentPath(contentPath: string) {
        this.contentPath = contentPath
    }
}

export default new ImageViewerStore()
