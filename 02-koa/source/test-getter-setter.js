
let data = {
    info: {name: 'kkk'},
    get name(){
        return this.info.name
    },
    set name(val){
        this.info.name = val;
    }
}
console.log(data.name);
data.name = 'ddd';
console.log(data.name);