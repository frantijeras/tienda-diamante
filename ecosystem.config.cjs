module.exports = {
  apps: [{
    name: 'tienda-diamante',
    script: 'server.js',
    cwd: '/root/proyectos/tienda-diamante',
    env: {
      NODE_ENV: 'production',
      PORT: '3002',
    },
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '500M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  }]
};
