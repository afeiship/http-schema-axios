import LC from '../src';

describe('api.basic', () => {
  const test_id = '60f77c8e85071346450995d3';

  test('lc get/set/val static api', async () => {
    await LC.set(test_id, 'test_value');
    const res = await LC.get(test_id);
    const resv = await LC.val(test_id);
    expect(res.value).toBe('test_value');
    expect(resv).toBe('test_value');
  });

  test('lc get/set/instance api:', async () => {
    const instance = new LC(test_id);

    await instance.set('test_value');
    const res = await instance.get();
    const resv = await instance.val();

    expect(res.value).toBe('test_value');
    expect(res.objectId).toBe(test_id);
    expect(resv).toBe('test_value');
  });
});
