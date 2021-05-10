import '@fortawesome/fontawesome-free/css/all.css';
import './scss/index.scss';
import './index.html';
import renderLoginPage from './pages/login-page';
import './event-listeners';
import { loginStatus } from './auth';
import renderInnerPage from './pages/inner-page';
import { addData, getData } from './database';


//addData({asd :'asd'});

async function main() {
  try {
    const user = await loginStatus();
    if (user) {
      console.log(user);
      renderInnerPage();
    } else {
      renderLoginPage();
    }
  } catch (error) {
    console.log('nincs user');
    renderLoginPage();
  }
}

main();