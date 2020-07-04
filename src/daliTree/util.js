export const Util = {
    
    awaitPromise: (ss) => {
        return new Promise(s=>{
            setTimeout(()=>{
                s();
            },ss)
        })
    },
    getRandom(n){
        return Math.random()*Math.pow(10, n);
    }
}