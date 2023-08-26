export type userInterface = {
    id: number
    token: string
    username: string
}

export type subtask = {
    id: number;
    descrp: string;
    status: number;
}

export type taskContentType = {
    id:number,
    cat:string,
    title:string,
    date:string,
    subtask: subtask[],
    note:string,
}

export const plainText = (content:any) => {
    const doc = new DOMParser().parseFromString(content, "text/html")
    return `${doc.body.textContent}`
}