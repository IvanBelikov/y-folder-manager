import { createContext, useContext } from 'react'
import RootStore from './stores/rootStore'

export const RootStoreContext = createContext(new RootStore())

export const useStores = () => {
    const context = useContext(RootStoreContext)

    if (context === null) {
        throw new Error(
            'Seems you did not wrapped <App /> component into Provider'
        )
    }

    return context
}
