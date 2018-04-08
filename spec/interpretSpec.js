describe('interpret()', function() {
  let testFunctionSpy, functionNode, functionNode2, tree;
  beforeEach(() => {
    testFunctionSpy = jasmine.createSpy('testFunction').and.returnValue('success')
    functionNode = { name: 'testFunction' }
    tree = [functionNode]
  })

  it('instantiates a dictionary object', () => {
    spyOn(Dictionary, 'new').and.returnValue({
      testFunction: testFunctionSpy
    })
    interpret(tree)
    expect(Dictionary.new).toHaveBeenCalledWith()
  })

  it('understands a tree with one expression', () => {
    intNode1 = {
      type: 'integer',
      value: 1
    }
    intNode2 = {
      type: 'integer',
      value: 2
    }
    funcNode = {
      name: 'add',
      type: 'function',
      args: [intNode1, intNode2]
    }

    tree = [funcNode]
    expect(interpret(tree)).toEqual([3])
  })

  describe('when passed nested AST', () => {
    it('recursively resolves functions', () => {
      intNode1 = {
        type: 'integer',
        value: 1
      }
      intNode2 = {
        type: 'integer',
        value: 2
      }
      intNode3 = {
        type: 'integer',
        value: 3
      }
      innerFuncNode = {
        name: 'add',
        type: 'function',
        args: [intNode2, intNode3]
      }
      outerFuncNode = {
        name: 'add',
        type: 'function',
        args: [intNode1, innerFuncNode]
      }

      tree = [outerFuncNode]

      expect(interpret(tree)).toEqual([6])
    })
  })
})
