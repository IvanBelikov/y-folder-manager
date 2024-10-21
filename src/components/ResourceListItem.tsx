import DeleteResource from '@/components/feature/DeleteResource'
import OpenResourceMoverButton from '@/components/OpenResourceMoverButton'

import { useStores } from '@/rootStoreContext'
import { IResource, ResourceEnum, ResourceMediaEnum } from '@/types/types'
import { resourceFullPath } from '@/utils'

import { Article, Folder } from '@mui/icons-material'
import { runInAction } from 'mobx'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

interface ResourceListItemProps {
    item: IResource
    readonly?: boolean
    localNavigation?: boolean
}

const ResourceListItem: React.FC<ResourceListItemProps> = ({
    item,
    readonly,
    localNavigation,
}) => {
    const [isHovered, setIsHovered] = useState(false)

    const navigate = useNavigate()

    const { imageViewer, resourceMover } = useStores()

    const isCurrentResource =
        item.path.slice(5) ===
        resourceFullPath(resourceMover.currentPath, resourceMover.resourceName)

    const clickHandler = (
        path: string,
        resourceType: ResourceEnum,
        mediaType: ResourceMediaEnum | null = null,
        filePath: string | null = null
    ) => {
        if (!localNavigation) {
            if (resourceType === ResourceEnum.Dir) {
                navigate(path.slice(6))
            } else if (resourceType === ResourceEnum.File) {
                if (mediaType === ResourceMediaEnum.Image && filePath) {
                    imageViewer.openImageViewer()
                    imageViewer.setContentPath(filePath)
                }
            }

            return
        }

        if (!isCurrentResource && resourceType !== ResourceEnum.File) {
            runInAction(() => {
                resourceMover.currentPath = path.slice(5)
            })
        }
    }

    return (
        <div
            className="p-5 flex justify-between cursor-pointer hover:bg-black/10"
            style={
                isCurrentResource && localNavigation ? { color: 'grey' } : {}
            }
            key={item.resource_id}
            onClick={() =>
                clickHandler(item.path, item.type, item?.media_type, item?.file)
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex gap-2">
                {item.type === ResourceEnum.Dir ? <Folder /> : <Article />}
                <p>{item.name}</p>
            </div>
            {!readonly ? (
                <div
                    className="flex gap-1 items-center"
                    style={!isHovered ? { visibility: 'hidden' } : {}}
                >
                    <OpenResourceMoverButton
                        path={item.path}
                        fileName={item.name}
                        type={item.type}
                    />
                    <DeleteResource path={item.path} />
                </div>
            ) : null}
        </div>
    )
}

export default ResourceListItem
