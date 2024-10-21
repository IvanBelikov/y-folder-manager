import MainLoader from '@/components//UI/MainLoader'
import MoveResource from '@/components/feature/MoveResource'
import { useStores } from '@/rootStoreContext'
import { IResource } from '@/types/types'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import BackButton from './BackButton'
import ResourceListItem from './ResourceListItem'

interface ResourceListProps {
    resources: IResource[]
    readonly?: boolean
    localNavigation?: boolean
    atMover?: boolean
}

const ResourceList: React.FC<ResourceListProps> = observer(
    ({ resources, readonly, localNavigation, atMover }) => {
        const { resources: resourcesStore, resourceMover } = useStores()
        const location = useLocation()

        return (
            <div className="resource-list flex flex-col w-[80%] bg-zinc-300 p-5 rounded gap-5">
                <div className="self-start flex gap-2 justify-between w-[100%]">
                    <div
                        style={
                            location.pathname === '/' ||
                            resourceMover.currentPath === '/'
                                ? { visibility: 'hidden' }
                                : {}
                        }
                    >
                        <BackButton localNavigation={localNavigation} />
                    </div>
                    {atMover ? <MoveResource /> : null}
                </div>
                <div className="flex flex-col min-h-[500px] max-h-[px] overflow-auto h-[70vh] bg-zinc-300 divide-y divide-black">
                    {resourcesStore.loading ? (
                        <div className="">
                            <MainLoader />
                        </div>
                    ) : resources.length === 0 ? (
                        <p>The folder is empty.</p>
                    ) : (
                        resources.map((item) => (
                            <ResourceListItem
                                key={item.resource_id}
                                item={item}
                                readonly={readonly}
                                localNavigation={localNavigation}
                            />
                        ))
                    )}
                </div>
            </div>
        )
    }
)

export default ResourceList
