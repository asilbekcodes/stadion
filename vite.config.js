import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import figlet from 'figlet';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/') {
          console.clear();
          console.log(
            figlet.textSync('Stadion', {
              font: 'Standard',
              horizontalLayout: 'default',
              verticalLayout: 'default',
            })
          );
          console.log('\nStadion Online Platform');
        }
        next();
      });
    },
  },
});
