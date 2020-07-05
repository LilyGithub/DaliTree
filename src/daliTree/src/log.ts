class Log {
    constructor(){
        
    }

    static info(msg) {
        if (console && console.info) {
            console.info(msg);
        }
    }

    static error(e) {
        if (e.msg && e.code) {
            console.error(e.code + ' : ' + e.msg);
        }
        if (console && console.error) {
            console.error(e);
        }
    }

    static log(msg) {
        if (console && console.log) {
            console.log(msg);
        }
    }
}