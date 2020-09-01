function obj() {
    console.log("obj()")
}

obj.enqueue = () => {
    console.log("obj.enqueue()")
}

obj.enqueue()
obj()