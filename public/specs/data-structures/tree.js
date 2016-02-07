//             oParent
//                O
//               / \
//              /   \
//       oD1S1 O     O oD1S2
//             / \
//            /   \
//     oD2S1 O     O oD2S2
//                / \
//               /   \
//        oD3S1 O     O oD3S2
//             /    / | \
//            /    /  |  \
//    oD4aS1 O    O   O   O
//           oD4bS1 oD4bS2 oD4bS3

describe('#Tree implementation', function() {
  'use strict';
  var tree, oParent, oD1S1, oD1S2, oD2S1, oD2S2, oD3S1, oD3S2, oD4aS1, oD4bS1, oD4bS2, oD4bS3;
  beforeEach(function setUpNodes() {
    oParent = {
      o: 'parent'
    };
    oD1S1 = {
      o: 'oD1S1'
    };
    oD1S2 = {
      o: 'oD1S2'
    };
    oD2S1 = {
      o: 'oD2S1'
    };
    oD2S2 = {
      o: 'oD2S2'
    };
    oD3S1 = {
      o: 'oD3S1'
    };
    oD3S2 = {
      o: 'oD3S2'
    };
    oD4aS1 = {
      o: 'oD4aS1'
    };
    oD4bS1 = {
      o: 'oD4bS1'
    };
    oD4bS2 = {
      o: 'oD4bS2'
    };
    oD4bS3 = {
      o: 'oD4bS3'
    };
  });
  describe('#TreeNode', function() {
    var rootNode, oD4bS1TreeNode, oD4bS2TreeNode, oD4bS3TreeNode, oD5S1TreeNode, oD5S2TreeNode;
    beforeEach(function() {
      oD4bS1TreeNode = new TreeNode(oD4bS1);
      oD4bS2TreeNode = new TreeNode(oD4bS2);
      oD4bS3TreeNode = new TreeNode(oD4bS3);
      oD5S1TreeNode = new TreeNode({})
      oD5S2TreeNode = new TreeNode({})
      rootNode = new TreeNode(oD3S2);
      rootNode.addChildNode(oD4bS1TreeNode);
      rootNode.addChildNode(oD4bS2TreeNode);
      rootNode.addChildNode(oD4bS3TreeNode);
      oD4bS2TreeNode.addChildNode(oD5S1TreeNode);
      oD4bS2TreeNode.addChildNode(oD5S2TreeNode);
    });
    it('should create treeNode whose root is itself if root not provided by parent', function() {
      expect(rootNode.parent).not.toBeDefined();
      expect(rootNode._root).toBe(rootNode);
    });
    it('should addChild whose roots are pointing to oD4bS1TreeNode', function() {
      expect(rootNode.children.length).toBe(3);
      expect(rootNode.children[0]).toBe(oD4bS1TreeNode);
      expect(rootNode.children[1]).toBe(oD4bS2TreeNode);
      expect(rootNode.children[2]).toBe(oD4bS3TreeNode);
      expect(rootNode.children[0]._root).toBe(rootNode);
    });
    it('should removeChild when called and return the removed node whose parent is undefined', function() {
      expect(rootNode.removeChildNode(oD4bS2TreeNode)).toBe(oD4bS2TreeNode);
      expect(oD4bS2TreeNode.parent).not.toBeDefined();
      expect(rootNode.children[0]).toBe(oD4bS1TreeNode);
      expect(rootNode.children[1]).toBe(oD4bS3TreeNode);
    });
    it('should not removeChild and return undefined when their is no associated child node to remove', function() {
      expect(rootNode.removeChildNode({})).not.toBeDefined();
      expect(rootNode.children.length).toBe(3);
    });
    it('should reallocate child nodes of the removeChild to the parent', function() {
      rootNode.removeChildNode(oD4bS2TreeNode);
      expect(rootNode.children.length).toBe(4);
      expect(rootNode.children[2]).toBe(oD5S1TreeNode);
      expect(rootNode.children[3]).toBe(oD5S2TreeNode);
    });
  });
  describe('#Tree creation', function() {
    var oD1S1TreeNode, oD1S2TreeNode, oD2S1TreeNode, oD2S2TreeNode, oD3S1TreeNode, oD3S2TreeNode, oD4aS1TreeNode, oD4bS1TreeNode, oD4bS2TreeNode, oD4bS3TreeNode;
    beforeEach(function setUpTree() {
      tree = new Tree(oParent);
      oD1S1TreeNode = tree.addChild(oD1S1, tree._root);
      oD1S2TreeNode = tree.addChild(oD1S2, tree._root);
      oD2S1TreeNode = oD1S1TreeNode.addChild(oD2S1, oD1S2TreeNode);
      oD2S2TreeNode = oD1S1TreeNode.addChild(oD2S2, oD1S2TreeNode);
      oD3S1TreeNode = oD2S2TreeNode.addChild(oD3S1, oD2S2TreeNode);
      oD3S2TreeNode = oD2S2TreeNode.addChild(oD3S2, oD2S2TreeNode);
      oD4aS1TreeNode = oD3S1TreeNode.addChild(oD4aS1, oD3S1TreeNode);
      oD4bS1TreeNode = oD3S2TreeNode.addChild(oD4bS1, oD3S2TreeNode);
      oD4bS2TreeNode = oD3S2TreeNode.addChild(oD4bS2, oD3S2TreeNode);
      oD4bS3TreeNode = oD3S2TreeNode.addChild(oD4bS3, oD3S2TreeNode);
    });

    it('should create a tree with the parent data in the root node', function() {
      expect(tree._root.data).toBe(oParent);
    });
    describe('#_root', function() {
      it('should have children nodes whose parent node is _root', function() {
        expect(tree._root.children[0].parent.data).toBe(oParent);
      });
      it('should have 2 child nodes with respective children who have correct parent', function() {
        expect(tree._root.children.length).toBe(2);
        expect(tree._root.children[0].data).toBe(oD1S1);
        expect(tree._root.children[0].children.length).toBe(2);
        expect(tree._root.children[1].data).toBe(oD1S2);
        expect(tree._root.children[1].children.length).toBe(0);
        expect(tree._root.children[0].children[0].parent).toBe(oD1S1TreeNode);
        expect(tree._root.children[0].children[1].parent).toBe(oD1S1TreeNode);
      });
      it('should have parent node that is undefined', function() {
        expect(tree._root.parent).not.toBeDefined();
        expect(tree._root.hasOwnProperty('parent')).toBe(true);
      });
    });
    describe('traverse', function() {
      var traverseOrder;
      beforeEach(function logTraverseOrder() {
		traverseOrder = [];
		var spyOnTreeNodeMatches = function(treeNode){
          // prevent infinite recursion from calling a spy in the callFake
          var spiedMethod = treeNode.matchesData.bind(treeNode);
		  spyOn(treeNode, 'matchesData').and.callFake(function(data) {
	        traverseOrder.push(treeNode.data.o);
            return spiedMethod(data)
          });
		}
        var nodes = [tree, oD1S1TreeNode, oD1S2TreeNode, oD2S1TreeNode, oD2S2TreeNode, oD3S1TreeNode, oD3S2TreeNode, oD4aS1TreeNode, oD4bS1TreeNode, oD4bS2TreeNode, oD4bS3TreeNode]
        nodes.forEach(spyOnTreeNodeMatches);
      });

      describe('#traverseDF', function() {

        it('should return single matched item in an array', function() {
          var res = tree.traverseDF(oD1S1);
          expect(res.length).toBe(1);
          expect(res[0]).toBe(oD1S1TreeNode);
        });
        it('should return multiple matching results', function() {
          var oD1S1DoopTreeNode = new TreeNode(oD1S1)
          oD4bS3TreeNode.addChildNode(oD1S1DoopTreeNode)
          var res = tree.traverseDF(oD1S1);
          expect(res.length).toBe(2);
          expect(res[0]).toBe(oD1S1TreeNode);
          expect(res[1]).toBe(oD1S1DoopTreeNode);
        });
        it('should traverse depth first', function() {
          tree.traverseDF();
          var expectedTraverseOrder = [
            'parent',
            'oD1S1',
            'oD2S1',
            'oD2S2',
            'oD3S1',
            'oD4aS1',
            'oD3S2',
            'oD4bS1',
            'oD4bS2',
            'oD4bS3',
            'oD1S2'
          ];
          expect(traverseOrder).toEqual(expectedTraverseOrder)
        });
      });
      describe('#traverseBF', function() {

        it('should return single matched item in an array', function() {
          var res = tree.traverseBF(oD1S1);
          expect(res.length).toBe(1);
          expect(res[0]).toBe(oD1S1TreeNode);
        });
        it('should return multiple matching results', function() {
          var oD1S1DoopTreeNode = new TreeNode(oD1S1)
          oD4bS3TreeNode.addChildNode(oD1S1DoopTreeNode)
          var res = tree.traverseBF(oD1S1);
          expect(res.length).toBe(2);
          expect(res[0]).toBe(oD1S1TreeNode);
          expect(res[1]).toBe(oD1S1DoopTreeNode);
        });
        it('should traverse bredth first', function() {
          tree.traverseBF();
          var expectedTraverseOrder = [
            'parent',
            'oD1S1',
            'oD1S2',
            'oD2S1',
            'oD2S2',
            'oD3S1',
            'oD3S2',
            'oD4aS1',
            'oD4bS1',
            'oD4bS2',
            'oD4bS3'
          ];
          expect(traverseOrder).toEqual(expectedTraverseOrder)
        });
      });
    });
  });

});

function Tree(rootData) {
  return new TreeNode(rootData);
}

function TreeNode(data) {
  this.data = data;
  this.children = [];
  this.parent = undefined;
  this._root = this;
}
TreeNode.prototype.addChild = function(childData) {
  return this.addChildNode(new TreeNode(childData));
}
TreeNode.prototype.addChildNode = function(childNode) {
  childNode.parent = this;
  childNode._root = this._root
  this.children.push(childNode);
  return childNode;
};
TreeNode.prototype.removeChildNode = function(childNode) {
  var index = this.children.indexOf(childNode);
  if (index >= 0) {
    childNode.parent = undefined;
    childNode._root = childNode;
    this.children.splice(index, 1);
    var that = this;
    childNode.children.forEach(function(childNode) {
      that.addChildNode(childNode);
    });
    return childNode;
  }
}

// helps to determine call order in testing
TreeNode.prototype.matchesData = function(data) {
  return this.data === data;
}

TreeNode.prototype.traverseDF = function(data) {
  var nodeSearchOrder = [];
  (function allNodes(node) {
    nodeSearchOrder.push(node);
    node.children.forEach(function(childNode) {
      return allNodes(childNode);
    });
  })(this);
  return nodeSearchOrder.filter(function(node){
    return node.matchesData(data);
  });
}
TreeNode.prototype.traverseBF = function(data) {
  var nodeSearchOrder = [this];
  (function allNodes(node) {
    var callbacks = [];
    var that = this;
    // first add all the child nodes
    node.children.forEach(function(childNode) {
	  nodeSearchOrder.push(childNode);
      callbacks.push(allNodes.bind(that,childNode));
    });
    // then search through those nodes
    callbacks.forEach(function(cb){
      cb();
    });
  })(this);
  return nodeSearchOrder.filter(function(node){
    return node.matchesData(data);
  });
}