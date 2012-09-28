define(['pqueue'], function(PQueue) {

  describe("PQueue: a priority queue implementation", function() {
    
    it('should push nodes onto the priority queue', function() {
      pq = new PQueue();
      pq.push({});
      expect(pq.length()).toEqual(1);
      pq.push({});
      expect(pq.length()).toEqual(2);
      pq.push({});
      expect(pq.length()).toEqual(3);
      delete pq;
    });

    it('should pop nodes according to priority', function() {
      pq = new PQueue();
      pq.push({priority: 3});
      pq.push({priority: 10});
      pq.push({priority: 5});
      
      var node = pq.pop();
      expect(pq.length()).toEqual(2);
      expect(node.priority).toEqual(10);

      node = pq.pop();
      expect(pq.length()).toEqual(1);
      expect(node.priority).toEqual(5);

      node = pq.pop();
      expect(pq.length()).toEqual(0);
      expect(node.priority).toEqual(3);
      delete pq;
    });

    it('should accept a comparison function', function() {
      // a comp function in which lowest scores are returned first
      var compFn = function (a, b) {
        return a.priority - b.priority;
      }
      var pq = new PQueue(compFn);
      pq.push({priority: 3});
      pq.push({priority: 10});
      pq.push({priority: 5});
      
      var node = pq.pop();
      expect(pq.length()).toEqual(2);
      expect(node.priority).toEqual(3);

      node = pq.pop();
      expect(pq.length()).toEqual(1);
      expect(node.priority).toEqual(5);

      node = pq.pop();
      expect(pq.length()).toEqual(0);
      expect(node.priority).toEqual(10);

      delete pq;
    });

    it('should check for the existence of a node', function() {
      var pq = new PQueue();
      var a = {priority: 3};
      var b = {priority: 10};
      var c = {priority: 5};

      pq.push(a);
      pq.push(b);
      pq.push(c);

      expect(pq.contains(a)).toBe(true);
      expect(pq.contains(b)).toBe(true);
      expect(pq.contains(c)).toBe(true);
      expect(pq.contains({})).toBe(false);
      delete pq;
    });

    it('should accept an identity function', function() {
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
      
      expect(pq.contains('a')).toBe(true);
      expect(pq.contains('b')).toBe(true);
      expect(pq.contains('c')).toBe(true);
      expect(pq.contains('z')).toBe(false);

      pq.pop();
      expect(pq.contains('a')).toBe(false);
      delete pq;
    });
  });
});
