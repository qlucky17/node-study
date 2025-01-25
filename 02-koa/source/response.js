module.exports = {
    get body(){
        return this.res.body;
    },
    set body(val){
        this.res.body = val;
    }
}