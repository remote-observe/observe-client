const { expect, test } = require('@oclif/test')

describe('hello', () => {
  test
    .stdout()
    .command(['help'])
    .it('runs hello', ctx => {
      expect('hello world').to.contain('hello world')
    })
})
