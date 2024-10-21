import useScrollBlock from '@/hooks/useScrollBlock'
import { useStores } from '@/rootStoreContext'

import CloseIcon from '@mui/icons-material/Close'
import { observer } from 'mobx-react-lite'
import MainLoader from './UI/MainLoader'

const ImageViewer = observer(() => {
    const { imageViewer } = useStores()

    const [blockScroll, allowScroll] = useScrollBlock()

    if (imageViewer.isOpened) {
        blockScroll()
    } else {
        allowScroll()
    }

    return (
        <div style={!imageViewer.isOpened ? { display: 'none' } : {}}>
            <div className="absolute h-[100%] bg-black/50 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <button
                    onClick={() => imageViewer.closeImageViewer()}
                    className="absolute top-0 right-0 p-5"
                >
                    <CloseIcon fontSize="large" sx={{ color: 'white' }} />
                </button>
                {imageViewer.isLoading ? <MainLoader /> : null}
                <img
                    style={!imageViewer.isOpened ? { display: 'none' } : {}}
                    src={imageViewer.contentPath}
                    onLoad={() => (imageViewer.isLoading = false)}
                    alt="testImg"
                    className="max-w-[80%] max-h-[80%] object-contain absolute"
                />
            </div>
        </div>
    )
})

export default ImageViewer
