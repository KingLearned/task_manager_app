
export const seperateSubtask = (getSubtask:string) => {
    let word = getSubtask.split('|')

    let creatSubtask= []

    const subId = Math.floor((new Date).getTime()/1000)

    for (let i = 0; i < word.length; i++) {
        creatSubtask.push({id:subId+i,descrp:word[i].trim(),status:0})
        // creatSubtask += `{"id":"${subId+i}","descrp":"${word[i].trim()}","status":"0"}`
    }

    return creatSubtask
}