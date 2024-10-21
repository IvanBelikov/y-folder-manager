import useScrollBlock from '@/hooks/useScrollBlock'
import { useStores } from '@/rootStoreContext'
import { IResource } from '@/types/types'
import CloseIcon from '@mui/icons-material/Close'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import ResourceList from './ResourceList'

const ResourceMover = observer(() => {
    const { resourceMover, resources } = useStores()
    const [currentResources, setCurrentResources] = useState<IResource[]>([])

    const [blockScroll, allowScroll] = useScrollBlock()

    if (resourceMover.isOpened) {
        blockScroll()
    } else {
        allowScroll()
    }

    useEffect(() => {
        if (resourceMover.isOpened) {
            let cachedResources = resources.cachedResources.find(
                (folder) => folder.path === resourceMover.currentPath
            )?.items

            if (!cachedResources) {
                resources.fetchResources(resourceMover.currentPath)
            }
            setCurrentResources(cachedResources || [])
        }
    }, [resourceMover.currentPath, resources.cachedResources])

    return (
        <>
            {resourceMover.isOpened ? (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-10">
                    <button
                        onClick={() => resourceMover.close()}
                        className="absolute top-0 right-0 p-5"
                    >
                        <CloseIcon fontSize="large" sx={{ color: 'white' }} />
                    </button>
                    <ResourceList
                        resources={currentResources}
                        readonly={true}
                        localNavigation={true}
                        atMover={true}
                    />
                </div>
            ) : null}
        </>
    )
})

export default ResourceMover
