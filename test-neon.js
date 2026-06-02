import ws from 'ws';
const test = new ws('wss://ep-plain-bar-al5anhfp.c-3.eu-central-1.aws.neon.tech/ws');
test.on('open', () => {
  console.log('✅ WebSocket to Neon works – driver should work');
  test.close();
});
test.on('error', (e) => {
  console.log('❌ WebSocket blocked:', e.message);
  test.close();
});