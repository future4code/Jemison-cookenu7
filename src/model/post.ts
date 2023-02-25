export type post = {
    id: string
    user_id: string
    title: string
    description: string
    create_dat: Date
}

export interface PostInputDTO {
    userId: string,
    title: string,
    description: string
 }