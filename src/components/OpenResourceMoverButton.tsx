import { useStores } from '@/rootStoreContext'
import SendIcon from '@mui/icons-material/Send'
import { useLocation } from 'react-router-dom'

interface MoveResourceProps {
    path: string
    fileName: string
}

const MoveResource: React.FC<MoveResourceProps> = ({ path, fileName }) => {
    const { resourceMover } = useStores()
    const location = useLocation()

    const clickHandler: React.MouseEventHandler = (e) => {
        e.stopPropagation()

        resourceMover.open(location.pathname)
        resourceMover.from = path.slice(5)
        resourceMover.resourceName = fileName
    }

    return (
        <div onClick={(e) => clickHandler(e)} className="hover:bg-black/10 p-2">
            <SendIcon />
        </div>
    )
}

export default MoveResource
