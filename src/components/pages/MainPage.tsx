import ImageViewer from '@/components/ImageViewer'
import ResourceList from '@/components/ResourceList'
import ResourceMover from '@/components/ResourceMover'

import { useStores } from '@/rootStoreContext'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const MainPage = observer(() => {
    const { resources } = useStores()

    const location = useLocation()

    let ignore = false

    useEffect(() => {
        if (
            !resources.cachedResources.find(
                (resource) => resource.path === decodeURI(location.pathname)
            ) &&
            !ignore
        ) {
            resources.fetchResources(decodeURI(location.pathname))
        }

        return () => {
            ignore = true
        }
    }, [location.pathname])

    const currentResources = resources.cachedResources.find(
        (folder) => folder.path === decodeURI(location.pathname)
    )?.items

    return (
        <>
            <ImageViewer />
            <ResourceMover />
            <ResourceList
                resources={currentResources ? currentResources : []}
            />
        </>
    )
})

export default MainPage
