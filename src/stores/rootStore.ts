import imageViewerStore from './imageViewerStore'
import resourceMoverStore from './resourceMoverStore'
import resourcesStore from './resourcesStore'

class RootStore {
    resources = resourcesStore
    imageViewer = imageViewerStore
    resourceMover = resourceMoverStore
}

export default RootStore
