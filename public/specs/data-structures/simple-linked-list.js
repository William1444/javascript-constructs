
describe('#simpleLinkedList',function(){
    var slList;
    beforeEach(function(){
        slList = new SimpleLinkedList();
    });
    it('should start with no head or tail and size 0',function(){
        expect(slList.size).toBe(0);
        expect(slList.head).not.toBeDefined();
        expect(slList.tail).not.toBeDefined();
    });
    it('should set size to be 1 and head and tail toBe the same node and the next node to be undefined',function(){
        var item = {};
        slList.add(item)
        expect(slList.size).toBe(1);
        expect(slList.head.val).toBe(item);
        expect(slList.tail.val).toBe(item);
        expect(slList.next).not.toBeDefined();
    });
    it('should set size to be 2, head is the first node, tail is the second added node and the first nodes next property is pointing at the second node',function(){
        var item1 = {o:1};
        var item2 = {o:2};
        slList.add(item1);
        slList.add(item2);
        expect(slList.size).toBe(2);
        expect(slList.head.val).toBe(item1);
        expect(slList.tail.val).toBe(item2);
        expect(slList.head.next.val).toBe(item2);
    });
    it('should set size to be 3, head is the first node, tail is the last node added',function(){
        var item1 = {o:1};
        var item2 = {o:2};
        var item3 = {o:3};
        slList.add(item1);
        slList.add(item2);
        slList.add(item3);
        expect(slList.size).toBe(3);
        expect(slList.head.val).toBe(item1);
        expect(slList.tail.val).toBe(item3);
    });

    it('should return second node when node at position 2 is called',function(){
        var item1 = {o:1};
        var item2 = {o:2};
        var item3 = {o:3};
        slList.add(item1);
        slList.add(item2);
        slList.add(item3);
        expect(slList.getNodeAtPosition(2).val).toBe(item2);
    });

    it('should return head node when node at position 1 is called',function(){
        var item1 = {o:1};
        var item2 = {o:2};
        slList.add(item1);
        slList.add(item2);
        expect(slList.getNodeAtPosition(1)).toBe(slList.head);
    });

    it('should return head when less than 1 and tail when more than size',function(){
        var item1 = {o:1};
        var item2 = {o:2};
        slList.add(item1);
        slList.add(item2);
        expect(slList.getNodeAtPosition(0)).toBe(slList.head);
        expect(slList.getNodeAtPosition(-1)).toBe(slList.head);
        expect(slList.getNodeAtPosition(3)).toBe(slList.tail);
    });
    describe('#insertValAtPosition',function(){
        var item1,item2,item3;
        beforeEach(function(){
            item1 = {o:1};
            item2 = {o:2};
            item3 = {o:3};
            item4 = {o:4};
            slList.add(item1);
            slList.add(item2);
        });
        it('should increase size',function(){
            slList.insertValAtPosition(item3,1);
            expect(slList.size).toBe(3)
        });
        it('should insert in correct place and change position of deeper items in list and not of shallower items',function(){
            slList.insertValAtPosition(2,item3);
            expect(slList.getNodeAtPosition(1).val).toBe(item1);
            expect(slList.getNodeAtPosition(2).val).toBe(item3);
            expect(slList.getNodeAtPosition(3).val).toBe(item2);
        });
        it('should insert nodes at end where they exceed the size of the list and update tail',function(){
            slList.insertValAtPosition(4,item3);
            expect(slList.getNodeAtPosition(3).val).toBe(item3);
            expect(slList.tail.val).toBe(item3);
        });
        it('should insert nodes at the beginning of the list where the node position is less than 1 and update head',function(){
            slList.insertValAtPosition(0,item3);
            slList.insertValAtPosition(-1,item4);
            expect(slList.getNodeAtPosition(1).val).toBe(item4);
            expect(slList.getNodeAtPosition(2).val).toBe(item3);
            expect(slList.head.val).toBe(item4);
        });
    });
});

function SimpleLinkedList(){
    this.size = 0;
}

function Node(val,next){
    this.val = val;
    this.next = next;
}

SimpleLinkedList.prototype.add = function(item){
    var node = new Node(item);
    this.head = this.head || node;
    if (this.tail) {
        this.tail.next = node;
    }
    this.tail = node;
    this.size ++;
};

SimpleLinkedList.prototype.getNodeAtPosition = function(position){
    if (position < 1) {
        return this.head;
    }
    var currentDepth = 1;
    var currentNode = this.head;
    while (currentDepth < position) {
        currentNode = currentNode.next;
        if (currentNode === undefined) {
            return this.tail;
        }
        currentDepth ++;
    }
    return currentNode;
}

SimpleLinkedList.prototype.insertValAtPosition = function(position, item){
    var currentNode = this.head;
    var depth = 1;
    var newNode = new Node(item);
    var	siblingNodeNeedlePosition = position-1;
    if (siblingNodeNeedlePosition < 1) {
        newNode.next = this.head;
        this.head = newNode;
    } else {
        var siblingNodeNeedle = this.getNodeAtPosition(siblingNodeNeedlePosition);
        if (siblingNodeNeedle === this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            newNode.next = siblingNodeNeedle.next;
            siblingNodeNeedle.next = newNode;
        }
        this.size ++;
    }
}




