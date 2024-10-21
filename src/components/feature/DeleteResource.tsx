import { useStores } from '@/rootStoreContext'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'

interface DeleteResourceProps {
    folder: string
    fileName: string
}

const DeleteResource: React.FC<DeleteResourceProps> = ({
    folder,
    fileName,
}) => {
    const { resources } = useStores()

    const clickHandler: React.MouseEventHandler = (e) => {
        e.stopPropagation()

        const conf = confirm('Вы действительно хотите удалить файл?')

        if (conf) {
            resources.deleteResource(folder, fileName)
        }
    }

    return (
        <div className="hover:bg-black/10 p-2" onClick={(e) => clickHandler(e)}>
            <DeleteIcon />
        </div>
    )
}

export default DeleteResource
