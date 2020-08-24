const npminstall = require('npminstall');
process.on('message', async (message) => {
  const { randomPath, registry } = message;
  try {
    await npminstall({
      root: randomPath,
      registry,
    });
    process.send({
      type: 'DONE',
    });
    process.exit(0);
  } catch (error) {
    process.send({
      type: 'ERROR',
      message: error.message,
    });
    process.exit(1);
  }
});
