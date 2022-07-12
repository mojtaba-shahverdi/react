'use strict';

const path = require('path');
const spawn = require('child_process').spawn;

const extension = process.platform === 'win32' ? '.cmd' : '';

const token = '0a7d5c3cad9a6dbec2d9' + '9a5222cf49062a4c1ef7';
spawn(
  path.join('node_modules', '.bin', 'danger-ci' + extension),
  [
    '--id',
    process.env.RELEASE_CHANNEL === 'experimental' ? 'experimental' : 'stable',
  ],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      DANGER_GITHUB_API_TOKEN: token,
    },
  }
).on('close', function(code) {
  if (code !== 0) {
    console.error('Danger failed');
  } else {
    console.log('Danger passed');
  }

  process.exit(code);
});
