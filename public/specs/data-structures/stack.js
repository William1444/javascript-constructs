describe('#stack',function(){
	var stack;
	beforeEach(function(){
		stack = new Stack();
	});
	it('should start empty',function(){
		expect(stack.length).toBe(0);
	});
	it('should add new item to stack when push is first called',function(){
		stack.push({s:1});
		expect(stack.length).toBe(1);
	});
	it('should push new item to top of stack',function(){
		stack.push({s:1});
		stack.push({s:2});
		expect(stack.length).toBe(2);
		expect(stack[1]).toEqual({s:2});
	});
	it('should remove most recently added item from stack when popped',function(){
		stack.push({s:1});
		stack.push({s:2});
		stack.pop();
		expect(stack.length).toBe(1);
		expect(stack[0]).toEqual({s:1});
	});
});
function Stack(){
	Array.call(this)
}
Stack.prototype = Object.create(Array.prototype);