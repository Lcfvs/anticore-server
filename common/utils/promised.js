export async function timeout (promise, delay, value) {
  return Promise.race([promise, wait(delay, value)])
}

export async function wait (delay, value) {
  return new Promise(resolve => setTimeout(resolve, delay, value))
}
