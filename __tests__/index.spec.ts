import LC from '../src';

describe('api.basic', () => {
  beforeEach(() => {
    process.env.LC_ID = '8alqie7r';
  });

  test('lc get/set/val api', async () => {
    const test_id = '60f77c8e85071346450995d3';
    await LC.set(test_id, 'test_value');
    const res = await LC.get(test_id);
    const resv = await LC.val(test_id);
    expect(res.value).toBe('test_value');
    expect(resv).toBe('test_value');
  });
});
