export interface Posts {
    title: string;
    body: string;
    id: number;
}

export interface ActionType {
    type: string;
    payload: any
}

export interface InitialTypeState {
    posts: Posts[];
}

export interface StateErrorType {
    errors: any[]
}

interface PostFromServer {
    title: string;
    body: string;
    id: number;
    userId: number;
}

export interface PostsFromServer {
    posts: PostFromServer[];
}

