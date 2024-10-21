import { useStores } from '@/rootStoreContext'
import { ResourceEnum } from '@/types/types'
import SendIcon from '@mui/icons-material/Send'
import { useLocation } from 'react-router-dom'

interface MoveResourceProps {
    path: string
    fileName: string
    type: ResourceEnum
}

const MoveResource: React.FC<MoveResourceProps> = ({
    path,
    fileName,
    type,
}) => {
    const { resourceMover } = useStores()
    const location = useLocation()

    const clickHandler: React.MouseEventHandler = (e) => {
        e.stopPropagation()

        resourceMover.open(location.pathname)
        resourceMover.from = path.slice(5)
        resourceMover.resourceName = fileName
        resourceMover.resourceType = type
    }

    return (
        <div onClick={(e) => clickHandler(e)} className="hover:bg-black/10 p-2">
            <SendIcon />
        </div>
    )
}

export default MoveResource
