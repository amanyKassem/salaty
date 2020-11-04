import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

<<<<<<< HEAD
const reactotron = Reactotron.configure({ name: 'salaty', host : '192.168.1.27', port: 9090 })
=======
const reactotron = Reactotron.configure({ name: 'salaty', host : '192.168.1.14', port: 9090 })
>>>>>>> 7905632ba685d567d7ebf2aac1f757a9db8f6dd3
    .use(reactotronRedux()).useReactNative()
    .connect();

export default reactotron
