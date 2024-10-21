import router from '@/router'
import { RouterProvider } from 'react-router-dom'

import { RootStoreContext } from '@/rootStoreContext'
import RootStore from '@/stores/rootStore'

import '@/index.scss'

function App() {
    return (
        <RootStoreContext.Provider value={new RootStore()}>
            <div className="flex justify-center my-[100px] flex-col items-center h-[100%]">
                <RouterProvider router={router} />
            </div>
        </RootStoreContext.Provider>
    )
}

export default App
