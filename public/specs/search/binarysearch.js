function BinarySearchArray(arr){
	this.arr = arr || [];
	this.sort();
}

BinarySearchArray.prototype.sort = function(){
	this.arr.sort(function(el,next){
		return el - next;
	});
}
/**
* minIndex defaults to 0, maxIndex to array length
* recursive function that calls itself until there is a match or nothing left in the array
*/
BinarySearchArray.prototype.search = function(int,minIndex,maxIndex) {
	minIndex = minIndex || 0;
	maxIndex = maxIndex || this.arr.length;
	var index = Math.floor((maxIndex - minIndex)/2) + minIndex;
	if (this.arr[index] === int) return index;
	else if (this.arr[index] === this.arr.length || this.arr[index] === 0) return undefined;
	else if (this.arr[index] < int) return this.search(int,index+1,maxIndex);
	else if (this.arr[index] > int) return this.search(int,minIndex,index-1);
};

describe('#BinarySearchArray',function(){
	var binarySearchArray;
	beforeEach(function initArray(){
		binarySearchArray = new BinarySearchArray([1,8,2,3,4,17,5]);
	});
	it('should sort the array when initd',function(){
		expect(binarySearchArray.arr).toEqual([1,2,3,4,5,8,17]);
	});
	describe('#search',function(){
		it('should return matched index',function(){
			expect(binarySearchArray.search(17)).toBe(6);
			expect(binarySearchArray.search(2)).toBe(1);
		});
		it('should return undefined where no match is found',function(){
			expect(binarySearchArray.search(99)).not.toBeDefined();
		});
		it('should handle even length, where array has no middle',function(){
			binarySearchArray = new BinarySearchArray([1,8,2,3,4,17,5,99]);
			expect(binarySearchArray.search(17)).toBe(6);
		});
		it('should search with expected number of calls to sort',function(){
			binarySearchArray = new BinarySearchArray([1,2,3,4,5,6,7,8,9,10,11,12,13]);
			spyOn(binarySearchArray,'search').and.callThrough();
			binarySearchArray.search(11);
			expect(binarySearchArray.search.calls.count()).toBe(2);
			binarySearchArray.search.calls.reset();
			expect(binarySearchArray.search.calls.count()).toBe(0);
			binarySearchArray.search(3);
			expect(binarySearchArray.search.calls.count()).toBe(2);
		});
		it('should return immediately on match',function(){
			binarySearchArray = new BinarySearchArray([1,1,1,2,2,2,3,3,3]);
			spyOn(binarySearchArray,'search').and.callThrough();
			expect(binarySearchArray.search(2)).toBe(4);
			expect(binarySearchArray.search.calls.count()).toBe(1);
		});
	});
});