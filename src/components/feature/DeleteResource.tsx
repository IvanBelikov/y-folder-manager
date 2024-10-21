import { useStores } from '@/rootStoreContext'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'
import { useLocation } from 'react-router-dom'

interface DeleteResourceProps {
    path: string
}

const DeleteResource: React.FC<DeleteResourceProps> = ({ path }) => {
    const { resources } = useStores()
    const location = useLocation()

    const clickHandler: React.MouseEventHandler = (e) => {
        e.stopPropagation()

        const conf = confirm('Вы действительно хотите удалить файл?')

        if (conf) {
            resources.deleteResource(path.slice(6), location.pathname)
        }
    }

    return (
        <div className="hover:bg-black/10 p-2" onClick={(e) => clickHandler(e)}>
            <DeleteIcon />
        </div>
    )
}

export default DeleteResource
