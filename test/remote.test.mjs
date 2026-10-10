import test from 'node:test';
import assert from 'node:assert/strict';
import { geoLocked } from '../scripts/sources/remote.mjs';

test('geoLocked descarta anuncios limitados a otros paises', () => {
  assert.ok(geoLocked('Full Stack Developer', 'Headquarters: Germany (Remote) ; Ireland (Remote). We can hire candidates based in the UK, Ireland or Germany'));
  assert.ok(geoLocked('Account Manager', 'Headquarters: United States - Remote'));
  assert.ok(geoLocked('Customer Success Associate (Denver, CO)', 'Headquarters: Remote'));
  assert.ok(geoLocked('Engineer', 'Headquarters: Canada - Remote (ON, AB, BC or NS Only)'));
  assert.ok(geoLocked('Analyst', 'You must be located in the United States to apply.'));
});

test('geoLocked deja pasar anuncios abiertos a Costa Rica o LATAM', () => {
  assert.ok(!geoLocked('Senior Engineer', 'Remote - Latin America. Join our team.'));
  assert.ok(!geoLocked('Designer', 'Headquarters: Remote. Work from anywhere in the world.'));
  assert.ok(!geoLocked('Developer', 'We are hiring in Costa Rica and the US.'));
});
