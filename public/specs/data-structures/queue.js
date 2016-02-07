
describe('#queue',function(){
    var queue;
    beforeEach(function setupQueue(){
        queue = new Queue();
    });
    it('should add an object to the queue when enqueue is called',function(){
        queue.enqueue({q:1});
        expect(queue.length).toBe(1);
        expect(queue[0]).toEqual({q:1});
    });
    it('should add second object to the end of the queue when enqueue is called',function(){
        queue.enqueue({q:1});
        queue.enqueue({q:2});
        expect(queue.length).toBe(2);
        expect(queue[1]).toEqual({q:2});
    });
    it('should remove oldest object from the queue when dequeue is called (first in first out)',function(){
        queue.enqueue({q:1});
        queue.enqueue({q:2});
        queue.dequeue();
        expect(queue.length).toBe(1);
        expect(queue[0]).toEqual({q:2});
    });
});

function Queue(){
    Array.call(this);
}
Queue.prototype = Object.create(Array.prototype);
Queue.prototype.enqueue = function(item){
    this.push(item)
};
Queue.prototype.dequeue = function(){
    this.shift();
};