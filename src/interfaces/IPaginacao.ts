//<T> entendi que essa paginação é uma paginação de outra interface
//results: T[] => Serão um Array do TIPO especificado
export interface IPaginacao<T> {
    count: number
    next: string
    previous: string
    results: T[]
}