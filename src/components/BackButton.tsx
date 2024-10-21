import { useStores } from '@/rootStoreContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { runInAction } from 'mobx'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getResourceFolder } from '@/utils'

interface BackButtonProps {
    localNavigation?: boolean
}

const BackButton: React.FC<BackButtonProps> = ({ localNavigation }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const { resourceMover } = useStores()

    const clickHandler = () => {
        if (localNavigation) {
            if (resourceMover.currentPath !== '/') {
                runInAction(() => {
                    resourceMover.currentPath =
                        resourceMover.currentPath
                            .split('/')
                            .slice(0, -1)
                            .join('/') || '/'
                })
            }
            return
        }

        navigate(getResourceFolder(location.pathname))
    }

    return (
        <>
            <button onClick={clickHandler}>
                <ArrowBackIcon />
            </button>
        </>
    )
}

export default BackButton
