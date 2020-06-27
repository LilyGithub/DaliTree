export const Util = {
    
    awaitPromise: (ss) => {
        return new Promise(s=>{
            setTimeout(()=>{
                s();
            },ss)
        })
    }
}