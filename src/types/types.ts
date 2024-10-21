export enum ResourceEnum {
    Dir = 'dir',
    File = 'file',
}

export enum ResourceMediaEnum {
    Image = 'image',
}

export interface IResources {
    _embedded: IResourceList
}

export interface IResource {
    name: string
    path: string
    type: ResourceEnum
    resource_id: string
    media_type?: ResourceMediaEnum
    file?: string
}

export interface IResourceList {
    items: IResource[]
}

export interface ICachedResource {
    path: string
    items: IResource[]
}
