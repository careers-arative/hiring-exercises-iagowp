module.exports = async () => {
  // This is needed since Jest waits for everything to be closed
  // before stoping the test run, so if this is not stopped then
  // Jest doesn't exit
  await global.__MONGOD__.stop()
}
