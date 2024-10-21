const getResourceFolder = (path: string) => {
    return path.substring(0, path.lastIndexOf('/')) || '/'
}

const resourceFullPath = (path: string, resourceName: string) => {
    let formedPath = '/'

    if (path != '/') {
        formedPath = [path, resourceName].join('/')
    } else {
        formedPath += resourceName
    }

    return formedPath
}

export { getResourceFolder, resourceFullPath }
