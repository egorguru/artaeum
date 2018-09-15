import app from './app';
import config from './cloud/config-client';

config.then((c) => {
  app.listen(parseInt(c.get('server.port')), () => {
    console.log(`Server has been started on port ${c.get('server.port')}`)
  })
})
