import { validationResultChecker } from '@src/index';
describe('test', () => {
  it('should import validate function', () => {

    const string = '123';
    const validationResult = validationResultChecker(string)
    console.log(validationResult);
    // expect(validate.name).toEqual('validate');
  });
});
