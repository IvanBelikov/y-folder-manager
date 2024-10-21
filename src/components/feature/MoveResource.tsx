import { useStores } from '@/rootStoreContext'
import { runInAction } from 'mobx'
import { useNavigate } from 'react-router-dom'

import { ResourceEnum } from '@/types/types'
import { getResourceFolder, resourceFullPath } from '@/utils'

const MoveResource = () => {
    const { resourceMover, resources } = useStores()

    const navigate = useNavigate()

    const clickHandler = async () => {
        runInAction(() => {
            resources.loading = true
        })

        const path = resourceFullPath(
            resourceMover.currentPath,
            resourceMover.resourceName
        )

        const response = await resourceMover.moveResource(
            resourceMover.from,
            path
        )

        if ([201, 202].includes(response.status)) {
            console.log(response.data.href)
            updateResources()

            runInAction(() => {
                resources.loading = false
                navigate(resourceMover.currentPath)
                resourceMover.close()
            })
        }
    }

    const updateResources = () => {
        const fromPathIndex = resources.cachedResources.findIndex(
            (folder) =>
                decodeURI(folder.path) === getResourceFolder(resourceMover.from)
        )

        const pathIndex = resources.cachedResources.findIndex(
            (folder) => decodeURI(folder.path) === resourceMover.currentPath
        )

        const resource = resources.cachedResources[fromPathIndex].items.filter(
            (item) => item.name == resourceMover.resourceName
        )[0]

        resource.path = `disk:${resourceFullPath(
            resourceMover.currentPath,
            resourceMover.resourceName
        )}`

        if (resourceMover.resourceType === ResourceEnum.File) {
            resources.cachedResources[pathIndex].items = [
                ...resources.cachedResources[pathIndex].items,
                resource,
            ]
        } else {
            resources.cachedResources = resources.cachedResources.filter(
                (folder) => {
                    return decodeURI(folder.path) !== resourceMover.currentPath
                }
            )
        }

        resources.cachedResources[fromPathIndex].items =
            resources.cachedResources[fromPathIndex].items.filter(
                (item) => item.name !== resourceMover.resourceName
            )
    }

    return (
        <>
            <button
                disabled={
                    getResourceFolder(resourceMover.from) ===
                        resourceMover.currentPath || resources.loading
                }
                onClick={clickHandler}
                className="p-2 bg-slate-200 disabled:bg-black/5 disabled:cursor-not-allowed hover:bg-slate-100"
            >
                Move here
            </button>
        </>
    )
}

export default MoveResource
