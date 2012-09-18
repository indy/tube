describe('PQueue', function () {

  it('should push nodes onto the priority queue', function() {
    require(['pqueue'], function(PQueue) {
      var pq = new PQueue();
      pq.push({});
      expect(pq.length()).to.equal(1);
      pq.push({});
      expect(pq.length()).to.equal(2);
      pq.push({});
      expect(pq.length()).to.equal(3);
    });
  });

  it('should pop nodes according to priority', function() {
    require(['pqueue'], function(PQueue) {
      var pq = new PQueue();
      pq.push({priority: 3});
      pq.push({priority: 10});
      pq.push({priority: 5});
      
      var node = pq.pop();
      expect(pq.length()).to.equal(2);
      expect(node.priority).to.equal(10);

      node = pq.pop();
      expect(pq.length()).to.equal(1);
      expect(node.priority).to.equal(5);

      node = pq.pop();
      expect(pq.length()).to.equal(0);
      expect(node.priority).to.equal(3);
    });
  });

  it('should accept a comparison function', function() {
    // a comp function in which lowest scores are returned first

    require(['pqueue'], function(PQueue) {
      var compFn = function (a, b) {
        return a.priority - b.priority;
      }
      var pq = new PQueue(compFn);
      pq.push({priority: 3});
      pq.push({priority: 10});
      pq.push({priority: 5});
      
      var node = pq.pop();
      expect(pq.length()).to.equal(2);
      expect(node.priority).to.equal(3);

      node = pq.pop();
      expect(pq.length()).to.equal(1);
      expect(node.priority).to.equal(5);

      node = pq.pop();
      expect(pq.length()).to.equal(0);
      expect(node.priority).to.equal(10);
    });
  });

  it('should check for the existence of a node', function() {

    require(['pqueue'], function(PQueue) {
      var pq = new PQueue();
      var a = {priority: 3};
      var b = {priority: 10};
      var c = {priority: 5};

      pq.push(a);
      pq.push(b);
      pq.push(c);

      expect(pq.contains(a)).to.be.true;
      expect(pq.contains(b)).to.be.true;
      expect(pq.contains(c)).to.be.true;
      expect(pq.contains({})).to.be.false;
    });
  });

  it('should accept an identity function', function() {
    require(['pqueue'], function(PQueue) {
      // a comp function in which lowest scores are returned first
      var compFn = function (a, b) {
        return a.priority - b.priority;
      };

      var identFn = function (node, obj) {
        return node.val === obj;
      };

      var pq = new PQueue(compFn, identFn);

      pq.push({priority: 3, val: 'a'});
      pq.push({priority: 10, val: 'b'});
      pq.push({priority: 5, val: 'c'});
      
      expect(pq.contains('a')).to.be.true;
      expect(pq.contains('b')).to.be.true;
      expect(pq.contains('c')).to.be.true;
      expect(pq.contains('z')).to.be.false;

      pq.pop();
      expect(pq.contains('a')).to.be.false;
    });
  });
})
